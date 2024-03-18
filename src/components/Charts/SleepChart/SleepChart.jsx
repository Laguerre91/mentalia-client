import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Chart } from 'react-google-charts'
import UserService from '../../../services/user.services'
import { formatDate } from '../../../utils/utils'

import './SleepChart.css'


const SleepChart = () => {
    const { userId } = useParams()
    const [chartData, setChartData] = useState({ records: [] })
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const lastSevenDays = () => {
            UserService
                .getUser(userId)
                .then(response => {
                    const allRecords = response.data.records

                    const sortedRecords = allRecords.sort((a, b) => new Date(b.date) - new Date(a.date))
                    const lastSevenDays = sortedRecords.slice(0, 7).reverse()

                    const data = [['Date', 'Hours of Sleep']]

                    lastSevenDays.forEach(record => {
                        const formattedDate = formatDate(new Date(record.date))
                        data.push([formattedDate, record.hoursOfSleep])
                    })

                    setChartData(data)
                    setLoading(false)
                })
                .catch(error => {
                    console.error('Error fetching data:', error)
                })
        }

        lastSevenDays()
    }, [])

    return (
        <>
            <h2 className='title'>Horas de sueño</h2>
            {loading ? (
                <div>Cargando datos...</div>
            ) : (
                <div className="chart-container">
                    {chartData.length > 1 ? (
                        <Chart
                            width={'100%'}
                            height={'300px'}
                            chartType="AreaChart"
                            loader={<div>Loading Chart</div>}
                            data={chartData}
                            options={{
                                vAxis: {
                                    minValue: 0,
                                    maxValue: 12,
                                    gridlines: { color: 'transparent' },
                                },
                                legend: 'none',
                                areaOpacity: 0.5,
                                curveType: 'smooth',
                                chartArea: { width: '80%', height: '70%' },
                                lineWidth: 3,
                                colors: ['#7AB7D0'],
                                animation: {
                                    startup: true,
                                    easing: 'linear',
                                    duration: 1000,
                                },
                            }}
                        />
                    ) : (
                        <div className='no-data'>No hay datos disponibles... <br /> ¡Registra tu primer mood!</div>
                    )}
                </div>
            )}
        </>
    )
}

export default SleepChart
