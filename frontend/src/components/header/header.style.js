import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  height: 55px;
  width: 100%;
  background-color: #FFFFFF;
  position: fixed;
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 10%);
  z-index: 1000;
`
export const Logo = styled.div`
  height: 55px;
  width: 250px;
  background-color: #087BC5;
  color: #FFF;
  float: left;
  text-align: center;

  a {
    color: #FFF;
    text-decoration: none;
  }

  h3 {
    margin: 5px 0;
    padding: 12px 0 10px 0px;
    font-size: 19px;
    font-weight: 700;
  }
`

export const NavbarWrapper = styled.div`
  float: left;
  // display: flex;

  .navbar-btn{
    display: inline-block;
    height: 55px;
    width: 55px;
    text-align: center;
    cursor: pointer;
  }

  .navbar-btn:hover{
    background-color: rgba(0,0,0,0.1);
  }

  .navbar-btn i{
    margin-top: 14px;
    font-size: 20px;
  }

  .menu-header{
    list-style: none;
    margin: 0 0 0 0;
    float: left;
  }

  .menu-item{
    float: left;
    min-width: 70px;
    height: 55px;
    text-align: center;
    cursor: pointer;
  }

  .active{
    border-bottom: solid 3px #087BC5;
  }

  li:hover{
    border-bottom: solid 3px #087BC5;

    // a {
    //     text-color: #3b3c54;
    //   }
  } 

  li div {
    margin: 15px 10px;
  }

  li i {
    color: #3b3c54;
  }
  
  li a {
    margin: 0 0 0 5px;
    color: #3b3c54;
    text-decoration: none;
    font-size: 15px;
  }
`

export const UserWrapper = styled.div`
  float: right;
  min-width: 100px;
  height: 55px;
  // text-align: center;
  cursor: pointer;

  // &:hover{
  //   background-color: #1887bc;
  // } 

  // p {
  //   padding: 5px;
  //   margin: 10px;
  //   color: white;
  //   border: solid 1px #FFF;;
  //   border-radius: 10px;
  // }

  img{
    float: right;
    width: 40px;
    margin-top: 8px;
    margin-right: 5px;
  }

  .dropdown-user-menu{
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    border-radius: 5px;
    border: solid 1px #F7F7F7;
    right: 5px;
  }

  &:hover .dropdown-user-menu {
    display: block;
  }

  .dropdown-item{
    display: block;
  }

  .dropdown-item p {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    margin: 0px;
    font-size: 14px;
  }
`
