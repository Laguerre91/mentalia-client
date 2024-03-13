import React, { useEffect, useState } from 'react'
import { Chart } from 'react-google-charts'
import recordServices from '../../../services/record.services'
import './SleepChart.css'


const SleepChart = () => {
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const getLastSevenDaysSleep = () => {
            recordServices.getAllRecords()
                .then(response => {
                    const allRecords = response.data

                    const sortedRecords = allRecords.sort((a, b) => new Date(b.date) - new Date(a.date))
                    const lastSevenDays = sortedRecords.slice(0, 7)

                    const data = [['Date', 'Hours of Sleep']]

                    lastSevenDays.forEach((record) => {
                        data.push([record.date, record.hoursOfSleep])
                    })

                    setChartData(data)
                })
                .catch(error => {
                    console.error('Error fetching data:', error)
                })
        }

        getLastSevenDaysSleep()
    }, [])

    return (
        <>
            <h2 className='title'>Horas de sueño</h2>
            <div className="chart-container">
                <Chart
                    width={'100%'}
                    height={'300px'}
                    chartType="AreaChart"
                    loader={<div>Loading Chart</div>}
                    data={chartData}
                    options={{
                        vAxis: {
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
            </div>
        </>
    )
}

export default SleepChart
