import React, { memo } from "react";
import { useSelector } from 'react-redux';
// import { useTranslation } from 'react-i18next';
import ExpandedSidebarComponent from "./expandedSidebar.component";
import ShrinkedSideBar from "./shrinkedSidebar.component";

const SideBar = () => {
    // const { t } = useTranslation();
    let { isSidebarExpanded } = useSelector(state => state.sidebar);

    if(isSidebarExpanded){
        return <ExpandedSidebarComponent />
    }else{
        return <ShrinkedSideBar />
    }
}

export default memo(SideBar);