import styled from 'styled-components';

export const DoctorWrapper = styled.div`
    .box{
        background-color: #087BC5;
        color: #fff;
        height: 80px;
        border-radius: 8px;
        cursor: pointer;
        padding: 12px 20px;
        margin-top: 10px;
    }

    .box i{
        font-size: 50px;
    }

    .box .item-title{
        font-size: 28px;
        padding: 10px;
    }

    .center{
        text-align: center;
    }

    .middle{
        vertical-align: middle;
    }

    .item-photo{
        height: 100px;
    }

    .status {
        margin-right: 5px;
    }

    button{
        margin-right: 5px;
        padding: 6px 0;
        width: 35px;
    }

    .paging-text{
        margin-top: 10px;
    }

    .pagination{
        float: right !important;
    }
`