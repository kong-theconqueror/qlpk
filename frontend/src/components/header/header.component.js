import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
// import { useTranslation } from 'react-i18next';
import HeaderNavbar from "./header.navbar";
import HeaderUser from './header.user';
import { HeaderWrapper, Logo } from './header.style';
import { history } from "../../helpers/history";
import Urls from '../../constants/urls.constant';

const Header = () => {
    // const { t } = useTranslation();
    let { appName } = useSelector(state => state.app);

    const onLogoClick = () => {
        history.push(Urls.HOME);
    }

    return (
        <HeaderWrapper>
            <Logo onClick={onLogoClick}>
                <Link to="/">
                    <h3>{appName}</h3>
                </Link>
            </Logo>
            <HeaderNavbar />
            <HeaderUser />
        </HeaderWrapper>
    )
}

export default Header;