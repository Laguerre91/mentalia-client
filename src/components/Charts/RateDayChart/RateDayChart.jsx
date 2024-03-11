import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import recordServices from '../../../services/record.services';

const RateDayChart = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        // Función para obtener los últimos 7 registros y extraer los valores de rateDay
        const fetchLast7DaysData = async () => {
            try {
                const response = await recordServices.getLast7DaysData(); // Ajusta esta llamada según tu servicio para obtener los últimos 7 registros
                const data = [['Day', 'RateDay']];

                response.data.forEach((record) => {
                    data.push([record.date, record.rateDay]);
                });

                setChartData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchLast7DaysData();
    }, []); // Ajusta las dependencias según tus necesidades

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
    );
};

export default RateDayChart;
