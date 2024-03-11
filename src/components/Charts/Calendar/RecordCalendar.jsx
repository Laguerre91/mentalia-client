import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import recordServices from "../../../services/record.services";

const RecordCalendar = () => {
    const [calendarData, setCalendarData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecordData();
    }, []);

    const fetchRecordData = () => {
        recordServices
            .getAllRecords() // Debes implementar esta función en tu servicio para obtener los registros
            .then((response) => {
                const records = response.data;
                const formattedData = formatDataForCalendar(records);
                setCalendarData(formattedData);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching record data:", error);
                setLoading(false);
            });
    };

    const formatDataForCalendar = (records) => {
        // Formatea tus registros para que coincidan con la estructura esperada por el gráfico de calendario
        // En este ejemplo, se asume que los registros tienen una propiedad 'date' y 'mood'
        const formattedData = [
            ["date", "mood"],
            ...records.map((record) => [
                new Date(record.date), // Asegúrate de que la propiedad 'date' sea una fecha válida
                parseInt(record.mood), // Debes mapear esto según tus estados de ánimo
            ]),
        ];
        return formattedData;
    };

    const options = {
        title: "Tu mood en el tiempo",
        calendar: {
            cellSize: 20,
            focusedCellColor: {
                stroke: '#d33682',
                strokeOpacity: 1,
                strokeWidth: 2,
            },
        },
        // Puedes ajustar más opciones según tus necesidades
    };

    return (
        <div>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <Chart
                    chartType="Calendar"
                    width="100%"
                    height="400px"
                    data={calendarData}
                    options={options}
                />
            )}
        </div>
    );
};

export default RecordCalendar;
