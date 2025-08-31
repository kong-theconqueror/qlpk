import React from "react";
import { useSelector, useDispatch } from 'react-redux';
// import { useTranslation } from 'react-i18next';
import { appAction, sidebarAction } from '../../actions';
// import { history } from '../../helpers/history';

import { NavbarWrapper } from './header.style';


const HeaderNavbar = () => {
    // const { t } = useTranslation();
    const dispatch = useDispatch();
    let { isSidebarExpanded } = useSelector(state => state.sidebar);
    let { sidebarWidth, shrinkedSidebarWidth } = useSelector(state => state.app);

    // const onMenuItemClicked = (item) => {
    //     history.push(item.path);
    // }

    const onExpandBtnClick = () => {
        if (isSidebarExpanded) {
            dispatch({
                type: sidebarAction.SIDEBAR_SHRINK,
            });

            dispatch({
                type: appAction.UPDATE_CONTENT_WIDTH,
                value: document.body.clientWidth - shrinkedSidebarWidth,
            });
        } else {
            dispatch({
                type: sidebarAction.SIDEBAR_EXPAND,
            });

            dispatch({
                type: appAction.UPDATE_CONTENT_WIDTH,
                value: document.body.clientWidth - sidebarWidth,
            });
        }
    }

    return <NavbarWrapper>
        <div className="navbar-btn" onClick={onExpandBtnClick}>
            <i className="fa fa-bars"></i>
        </div>
        {/* <ul className="menu-header">
            {menu.map((item, index) => {
                return (
                    <li key={index}
                        className={item.name === selectedMenuItem.name ? 'menu-item active' : 'menu-item'}
                        onClick={this.onMenuItemClicked.bind(this, item)}
                    >
                        <div>
                            <i className={'fa ' + item.icon}></i>
                            <Link to={item.path}>{appDict[item.name]}</Link>
                        </div>
                    </li>
                )
            })}
        </ul> */}
    </NavbarWrapper>
}

export default HeaderNavbar;