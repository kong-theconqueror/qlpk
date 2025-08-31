import styled from 'styled-components';

export const RegisterWrapper = styled.div`
    display: flex;

    .wall{
        background-image: url('/images/left_banner.png');
        background-size: auto 100%;
        background-repeat: no-repeat;
        background-position: center;
        height: ${props => props.height + 'px'};
        width: 60%;
    }

    .right-side{
        background-color: #FFFFFF;
        height: auto;
        width: 40%;
        padding: 20px;
    }

    .box{
        width: 100%;
        border-radius: 5px;
        border: 1px solid #a4a4a4;
        margin-top: 100px;
    }

    .box-header{
        height: 70px;
        padding-top: 30px;
        text-align: center;
    }

    .box-content{
        padding: 20px;
    }

    .box-footer{
        min-height: 10px;
    }

    .box ::placeholder{
        font-style: italic;
    } 

    .login{
        text-align: center;
    }
    .login p{
        margin-top: 5px;
        margin-bottom: 0px;
    }
`