import React from "react";
import { useTranslation } from 'react-i18next';
import ReactLoading from 'react-loading';
import { StatisticCardWrapper } from './statisticCard.style';

const StatisticCard = ({ title, icon, value, backgroundColor, color, isLoading }) => {
    const { t } = useTranslation();

    return <StatisticCardWrapper
        style={{
            backgroundColor: backgroundColor ? backgroundColor : "#17a2b8",
            color: color ? color : "white",
        }}>
        {isLoading
            ? <div className="loading-wrapper">
                <ReactLoading
                    type="spin"
                    color="#fff"
                    height={'15%'}
                    width={'15%'} />
            </div>
            : <div style={{ display: "flex" }}>
                <div className="icon">
                    <i className={icon} aria-hidden="true"></i>
                </div>
                <div>
                    <h3>{value}</h3>
                    <p>{t(title)}</p>
                </div>
            </div>}
    </StatisticCardWrapper >
}

export default StatisticCard;