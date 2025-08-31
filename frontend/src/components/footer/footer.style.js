import styled from 'styled-components';

export const FooterWrapper = styled.div`
    // height: 150px;
    width: 100%;
    background-color: #fff;
    border-top: 1px solid #d8d8d8;
    // z-index: 9000;
    float: left;
    color: #3b3c54;
    font-size: 14px;
    padding-top: 35px;

    ul{
        list-style: none;
        padding-left: 10px;
    }

    li{
        float: left;
        min-width: 120px;
        height: 30px;
    }

    a{ 
        color: #3b3c54;
    }

    p{
        margin-top: 5px;
        margin-bottom: 5px;    
    }

    hr{
        width: 50%;
        border-top: 1px solid #fff;
    }

    .bottom{
        padding: 10px 0px;
        margin: 30px 0px 0px 0px;
        background-color: #1c1d31;
        text-align: center;
        font-size: 14px;
        line-height: 18px;
        color: #fff;
    }

    h4{
        color: #087BC5;
        font-size: 16px;
        font-weight: bold;
    }
      
`
