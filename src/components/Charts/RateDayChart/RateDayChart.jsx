import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import recordServices from '../../../services/record.services';

const RateDayChart = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchLast7DaysData = async () => {
            try {
                const response = await recordServices.getAllRecords();
                const allRecords = response.data;

                // Ordena los registros por fecha de forma descendente
                const sortedRecords = allRecords.sort((a, b) => new Date(b.date) - new Date(a.date));

                // Toma solo los primeros 7 registros (los más recientes)
                const last7DaysRecords = sortedRecords.slice(0, 7);

                const data = [['Day', 'RateDay']];

                last7DaysRecords.forEach((record) => {
                    data.push([record.date, record.rateDay]);
                });

                setChartData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchLast7DaysData();
    }, [])


    return (
        <div>
            <h2>RateDay Chart - Últimos 7 Días</h2>
            <Chart
                width={'100%'}
                height={'300px'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={chartData}
                options={{
                    title: 'RateDay Chart - Últimos 7 Días',
                    hAxis: { title: 'Día', minValue: 0, maxValue: 10 },
                    vAxis: { title: 'RateDay', minValue: 0, maxValue: 10 },
                    legend: 'none',
                }}
            />
        </div>
    )
}

export default RateDayChart;
