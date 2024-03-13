import React, { useEffect, useState } from 'react'
import { Chart } from 'react-google-charts'
import recordServices from '../../../services/record.services'
import './RateDayChart.css'

const RateDayChart = () => {
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const lastSevenDays = async () => {
            try {
                const response = await recordServices.getAllRecords()
                const allRecords = response.data

                const sortedRecords = allRecords.sort((a, b) => new Date(b.date) - new Date(a.date))
                const lastSevenDays = sortedRecords.slice(0, 7)

                const data = [['Day', 'RateDay']]

                lastSevenDays.forEach((record) => {
                    data.push([record.date, record.rateDay])
                })

                setChartData(data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        lastSevenDays()
    }, [])

    return (
        <>
            <h2 className='title'>Últimos 7 Días</h2>
            <div className="chart-container">
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
                    }}
                />
            </div>
        </>
    )
}

export default RateDayChart
