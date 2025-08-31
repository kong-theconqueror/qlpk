import styled from 'styled-components';

export const HomeWrapper = styled.div`
    min-height: 800px;

    .body{
        display: flex;
    }
    
    .content{
        padding-top: 55px;
        width: ${props => props.contentWidth}px;
    }
`