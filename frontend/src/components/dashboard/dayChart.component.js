import React from "react";
import { useTranslation } from 'react-i18next';

import { Card } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const DayChart = ({ title, data, option }) => {
    const { t } = useTranslation();

    return <Card>
        <Card.Header as="h5">{t(title)}</Card.Header>
        <Card.Body>
            <Pie
                height={355}
                options={option}
                data={data} />
        </Card.Body>
    </Card>
}

export default DayChart;