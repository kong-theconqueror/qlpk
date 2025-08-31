import React from "react";
import { useTranslation } from 'react-i18next';

import { Card } from "react-bootstrap";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const WeekChart = ({ title, data, option }) => {
    const { t } = useTranslation();

    return <Card>
        <Card.Header as="h5">{t(title)}</Card.Header>
        <Card.Body>
            <Line 
                height={355}
                options={option}
                data={data} />
        </Card.Body>
    </Card>
}

export default WeekChart;