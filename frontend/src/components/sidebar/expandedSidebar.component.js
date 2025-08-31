import React, { memo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { history } from '../../helpers/history';
import { sidebarAction } from '../../actions';

import { SideBarWrapper } from './sidebar.style';

const ExpandedSideBar = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    let { sidebarWidth, contentHeight } = useSelector(state => state.app);
    let { isSidebarExpanded, menuItems, selectedMenuItem } = useSelector(state => state.sidebar);

    const onSidebarGroupClick = (group) => {
        if (group.isCollapsed) {
            dispatch({
                type: sidebarAction.GROUP_UNCOLLAPSE,
                value: group
            });
        } else {
            dispatch({
                type: sidebarAction.GROUP_COLLAPSE,
                value: group
            });
        }

    }

    const onSidebarItemClick = (item) => {
        if (item.link) {
            dispatch({
                type: sidebarAction.SELECT_ITEM,
                value: item
            });
            history.push(item.link);
        }
    }

    return <SideBarWrapper
        isExpanded={isSidebarExpanded}
        width={sidebarWidth}
        height={contentHeight}
    >
        {menuItems.map((item) => {
            if (item.isGroup) {
                return <React.Fragment key={item.name}>
                    <div className="sidebar-item"
                        onClick={() => onSidebarGroupClick(item)}>
                        <div className={item.name === selectedMenuItem.name ? "item selected" : "item"}>
                            <div className="icon">
                                <i className={item.icon} aria-hidden="true"></i>
                            </div>
                            <span>{t(item.title)}</span>

                            {item.isGroup ? <div className="group-icon">
                                {item.isCollapsed
                                    ? <i className="fa fa-chevron-down" aria-hidden="true"></i>
                                    : <i className="fa fa-chevron-left" aria-hidden="true"></i>}
                            </div> : null}
                        </div>

                    </div>
                    {
                        item.isGroup && item.isCollapsed ? <div className="sidebar-group">
                            {item.groupItems.map((groupItem) => {
                                return <div className="sidebar-item" key={groupItem.name}
                                    onClick={() => onSidebarItemClick(groupItem)}>
                                    <div className={groupItem.name === selectedMenuItem.name ? "item selected" : "item"}>

                                        <div className="icon">
                                            <i className={groupItem.icon} aria-hidden="true"></i>
                                        </div>
                                        <span>{t(groupItem.title)}</span>
                                    </div>
                                </div>
                            })}
                        </div> : null
                    }
                </React.Fragment>

            } else { //no group
                return <div className="sidebar-item" key={item.name}
                    onClick={() => onSidebarItemClick(item)}
                >
                    <div className={item.name === selectedMenuItem.name ? "item selected" : "item"}>
                        <div className="icon">
                            <i className={item.icon} aria-hidden="true"></i>
                        </div>
                        <span>{t(item.title)}</span>
                    </div>
                </div>
            }

        })}
    </SideBarWrapper>

}

export default memo(ExpandedSideBar);