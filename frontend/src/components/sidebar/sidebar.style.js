import styled from 'styled-components';

export const SideBarWrapper = styled.div`
    width: ${props => props.isExpanded ? props => props.width: 55}px;
    // min-height: 800px;
    min-height:  ${props => props.height}px;
    position: relative;
    margin-top: 55px;
    padding: 0px;
    padding-top: 5px;
    color: #c2c7d0;
    background-color: #343a40;
    box-shadow: 0 14px 28px rgba(0,0,0,.25);

    .sidebar-item{
        height: 40px;
        cursor: pointer;
    }

    .sidebar-item .item{
        margin: 5px;
        border-radius: 7px;
        padding: 5px 10px;
        font-size: 16px;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .sidebar-item .item:hover{
        background-color: rgb(256, 256, 256, 0.1);
        color: #fff;
    }

    .sidebar-item .selected{
        background-color: #fefefe;
        color: #343a40;
    }

    .sidebar-item .selected:hover{
        background-color: #fefefe;
        color: #343a40;
    }

    .sidebar-item .icon{
        width: 20px;
        display: inline-block;
        text-align: center;
        margin: 5px 10px;
    }

    .sidebar-item .icon i{
        font-size: 20px;
    }
    
    .sidebar-item .group-icon{
        display: inline-block;
        float: right;
        margin: 5px ;
    }

    .truncate{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`

export const ShrinkedSideBarWrapper = styled.div`
    width: 55px;
    // min-height: 800px;
    min-height:  ${props => props.height}px;
    position: relative;
    margin-top: 55px;
    padding-top: 5px;
    color: #c2c7d0;
    background-color: #343a40;
    box-shadow: 0 14px 28px rgba(0,0,0,.25);


    .sidebar-item{
        height: 45px;
        cursor: pointer;
        text-align: center;
        padding: 5px 0px;
    }

    .sidebar-item .item{
        margin: 0px 5px;
        border-radius: 7px;
        padding: 10px 10px;
        font-size: 16px;
        position: fixed;
    }

    .sidebar-item .item:hover{
        background-color: rgb(0, 0, 0, 0.7);
        color: #fff;
        width: ${props => props.width}px;
        z-index: 400;
    }

    .sidebar-item .selected{
        background-color: #fefefe;
        color: #343a40;
    }

    .item-title{
        display: none;
    }

    .sidebar-item .selected:hover{
        background-color: #fefefe;
        color: #343a40;
        // width: 55px;
    }

    .sidebar-item .item:hover .item-title{
        display: inline-block;
        margin-left: 10px;
    }

    .sidebar-item i{
        font-size: 20px;
    }
    
    .sidebar-item .group-icon{
        display: inline-block;
        float: right;
        margin: 10px 5px;
    }
`