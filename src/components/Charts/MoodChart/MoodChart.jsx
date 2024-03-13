import './MoodChart.css'

import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import recordServices from '../../../services/record.services';

const MoodChart = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const getUserRecords = () => {
            recordServices.getAllRecords()
                .then(response => {
                    const allRecords = response.data;
                    const moodCounts = {
                        'Muy mal': 2,
                        'Mal': 5,
                        'Normal': 3,
                        'Bien': 7,
                        'Muy bien': 7
                    };

                    allRecords.forEach(record => {
                        moodCounts[record.moods] += 1;
                    });

                    const data = Object.entries(moodCounts).map(([mood, count]) => [mood, count]);

                    setChartData([['Mood', 'Count'], ...data]);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        };

        getUserRecords();
    }, []);

    return (
        <div>
            <h2>Moods</h2>
            <Chart
                width={'100%'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={chartData}
                options={{
                    title: 'Moods',
                    pieHole: 0.5,
                    slices: {
                        0: { color: '#FF0000' }, // Muy mal
                        1: { color: '#FF5733' }, // Mal
                        2: { color: '#FFFF00' }, // Normal
                        3: { color: '#33FF00' }, // Bien
                        4: { color: '#00FF00' }  // Muy bien
                    },
                    backgroundColor: 'transparent',
                }}
            />
        </div>
    );
};

export default MoodChart;
