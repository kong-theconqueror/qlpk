import styled from 'styled-components';

export const UserWrapper = styled.div`
    min-height: 800px;
    position: relative;
    background-color: #F7F7F7;
    color: #000;
    padding-top: 65px;

    .link{
        color: #087BC5;
    }

    .link a{
        color: #087BC5;
    }

    .user-function-box{
        min-height: 450px;
        background-color: #FFF;
        color: #333;
        font-size: 16px;
        line-height: 16px;
        padding: 30px;
    }

    .user-list-function{
        list-style: none;
        padding-left: 0px;
    }

    .user-list-function li{
        margin-bottom: 16px;
    }

    .user-list-function a{
        text-decoration: none;
        color: #087BC5;
    }

    .user-list-function a:hover{
        font-weight: bold;
    }

    .user-list-function .active {
        font-weight: bold;
    }

    .information-box{
        background-color: #FFF;
        min-height: 450px;
        padding: 30px;
        font-size: 14px;
    }

    .information-box .title{
        font-size: 24px;
        color: #087BC5;
        padding: 0px 0px 20px 0px;
    }

    .information-box .avatar{
        // padding-top: 10px;
    }

    .information-box .info-title{
        color: #898989;
        font-size: 16px;
        line-height: 16px;
        font-weight: normal;
    }

    .information-box .info{
        height: 16px;
        color: #333;
        font-size: 16px;
        line-height: 16px;
    }
`