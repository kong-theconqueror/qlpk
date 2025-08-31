import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
// import { useTranslation } from 'react-i18next';
import {
    // sidebarAction, 
    appAction
} from "../../actions";

import HomeRouter from '../../routers/home.router';
import Header from '../../components/header/header.component';
import SideBar from '../../components/sidebar/sidebar.component';
// import Footer from '../footer';

import { HomeWrapper } from './home.style';

const HomeScreen = ({ history }) => {
    // const { t } = useTranslation();
    const dispatch = useDispatch();
    let { contentWidth, isSidebarExpanded, sidebarWidth, shrinkedSidebarWidth } = useSelector(state => state.app);

    useEffect(() => {
        const handleResize = () => {
            if (isSidebarExpanded) {
                dispatch({
                    type: appAction.UPDATE_CONTENT_WIDTH,
                    value: document.body.clientWidth - shrinkedSidebarWidth,
                });
            } else {
                dispatch({
                    type: appAction.UPDATE_CONTENT_WIDTH,
                    value: document.body.clientWidth - sidebarWidth,
                });
            }
            dispatch({
                type: appAction.UPDATE_CONTENT_HEIGHT,
                // value: document.body.clientHeight,
                value: window.innerHeight,
            });
        }

        window.addEventListener('resize', handleResize)

        return _ => {
            window.removeEventListener('resize', handleResize)
        }
    })

    // useEffect(() => {
    //     if (isLoggedIn) {
    //         dispatch({
    //             type: sidebarAction.LOAD_MENU,
    //         });
    //     }
    // }, [isLoggedIn, dispatch]);

    return <HomeWrapper
        contentWidth={contentWidth}>
        <Header history={history} />
        <div className="body">
            <SideBar />
            <div className="content">
                <HomeRouter />
            </div>
        </div>
        {/* <Footer/> */}
    </HomeWrapper>;

}

export default HomeScreen;