import React, { memo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { history } from '../../helpers/history';
import { sidebarAction } from '../../actions';

import { ShrinkedSideBarWrapper } from './sidebar.style';

const ShrinkedSideBar = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    let { sidebarWidth, contentHeight } = useSelector(state => state.app);
    let { menuItems, selectedMenuItem } = useSelector(state => state.sidebar);

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

    return <ShrinkedSideBarWrapper
        width={sidebarWidth}
        height={contentHeight}
    >
        {menuItems.map((item) => {
            if (item.isGroup) {
                return <React.Fragment key={item.name}>
                    <div className="sidebar-item"
                        onClick={() => onSidebarGroupClick(item)}>
                        <div className={item.name === selectedMenuItem.name ? "item selected" : "item"}>
                            <i className={item.icon} aria-hidden="true"></i>
                            <span className="item-title">{t(item.title)}</span>
                        </div>

                    </div>
                    {
                        item.isGroup && item.isCollapsed ? <div className="sidebar-group">
                            {item.groupItems.map((groupItem) => {
                                return <div className="sidebar-item" key={groupItem.name}
                                    onClick={() => onSidebarItemClick(groupItem)}>
                                    <div className={groupItem.name === selectedMenuItem.name ? "item selected" : "item"}>
                                        <i className={groupItem.icon} aria-hidden="true"></i>
                                        <span className="item-title">{t(groupItem.title)}</span>
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
                        <i className={item.icon} aria-hidden="true"></i>
                        <span className="item-title">{t(item.title)}</span>
                    </div>
                </div>
            }

        })}
    </ShrinkedSideBarWrapper>

}

export default memo(ShrinkedSideBar);