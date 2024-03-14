import React, { useEffect, useState } from 'react'
import { Chart } from 'react-google-charts'
import { useParams } from 'react-router-dom'
import UserService from '../../../services/user.services'

const MoodChart = () => {
    const { userId } = useParams()
    const [chartData, setChartData] = useState([['Day', 'RateDay'], ['No data', 0]])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMoodData = () => {

            UserService
                .getUser(userId)
                .then(response => {
                    const allRecords = response.data.records

                    const moodCount = {
                        'Muy mal': 0,
                        Mal: 0,
                        Normal: 0,
                        Bien: 0,
                        'Muy bien': 0,
                    }

                    allRecords.forEach(record => {
                        moodCount[record.mood]++
                    })

                    const data = [['Mood', 'Count']]
                    for (const mood in moodCount) {
                        data.push([mood, moodCount[mood]])
                    }

                    setChartData(data)
                    setLoading(false)
                })
                .catch(error => {
                    console.error('Error fetching mood data:', error)
                    setLoading(false)
                })
        }

        fetchMoodData()
    }, [userId])

    return (
        <div>
            <h2 className='title'>Moods</h2>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Chart
                    width={'100%'}
                    height={'200px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={chartData}
                    options={{
                        pieHole: 0.5,
                        slices: {
                            0: { color: '#F7A4A6' }, // Muy mal
                            1: { color: '#AFE0E9' }, // Mal
                            2: { color: '#FCE573' }, // Normal
                            3: { color: '#F7B1CB' }, // Bien
                            4: { color: '#98D2AD' }  // Muy bien
                        },
                        backgroundColor: 'transparent',
                        pieSliceTextStyle: {},
                        chartArea: {
                            width: '100 %',
                            height: '80%'
                        }
                    }}
                />
            )}
        </div>
    )
}

export default MoodChart
