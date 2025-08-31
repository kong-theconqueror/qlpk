import styled from 'styled-components';

export const StatisticCardWrapper = styled.div`
    border-radius: 5px;
    padding: 20px 10px;
    padding-left: 0px;
    min-height: 120px;

    .loading-wrapper{
        -webkit-box-align: center;
        align-items: center;
        flex-direction: column;
        display: flex;
    }

    .icon{
        width: 100px;      
        text-align: center; 
    }

    .icon i{
        margin: 10px;
        font-size: 60px; 
    }

    h3{
        font-size: 30px;
        font-weight: 900;
    }

    p{
        font-size: 24px;
        margin: 0px;
    }

`