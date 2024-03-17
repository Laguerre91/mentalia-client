import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Chart } from 'react-google-charts'
import UserService from "../../../services/user.services"
import { formatDate } from '../../../utils/utils'

import './RateDayChart.css'

const RateDayChart = () => {
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

                    const data = [['Day', 'RateDay']]

                    lastSevenDays.forEach(record => {
                        const formattedDate = formatDate(new Date(record.date))
                        data.push([formattedDate, record.rateDay])
                    })

                    setChartData(data)
                    setLoading(false)
                })
                .catch(error => {
                    console.error('Error fetching data:', error)
                })
        }

        lastSevenDays()
    }, [userId])


    return (
        <>
            <h2 className='title'>Últimos 7 Días</h2>
            {loading ? (
                <div>Cargando datos...</div>
            ) : (
                <div className="chart-container">
                    {chartData.length > 1 ? (
                        <Chart
                            width={'100%'}
                            height={'300px'}
                            chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data={chartData}
                            options={{
                                hAxis: { textPosition: 'none' },
                                vAxis: {
                                    minValue: 0,
                                    maxValue: 10,
                                    gridlines: { color: 'transparent' },
                                },
                                legend: 'none',
                                series: {
                                    0: { type: 'bars' },
                                },
                                bar: { borderRadius: 20 },
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
                </div >
            )}
        </>
    )
}

export default RateDayChart
