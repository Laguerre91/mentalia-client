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
            <h2 className='title'>Moods</h2>
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
                    pieSliceTextStyle: {
                        fontSize: 20
                    },
                    chartArea: {
                        width: '100 %',
                        height: '80%'
                    }
                }}
            />
        </div>
    );
};

export default MoodChart;
