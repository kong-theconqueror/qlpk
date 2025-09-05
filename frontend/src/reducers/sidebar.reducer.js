import { sidebarAction } from '../actions';
// import Urls from '../constants/urls.constant';

const initState = {
    isSidebarExpanded: true,

    menuItems: [
        // {
        //     "name": "dashboard",
        //     "link": "/",
        //     "title": "menu.dashboard",
        //     "icon": "fa fa-tachometer",
        //     "isGroup": false,
        //     "isCollapsed": false
        // },
        {
            "name": "news",
            "link": "/kham-chua-benh",
            "title": "menu.examination_treatment",
            "icon": "fa fa-hospital-o",
            "isGroup": true,
            "groupItems": [
                {
                    "name": "kham-benh",
                    "link": "/kham-chua-benh/kham-benh",
                    "title": "menu.examination",
                    "icon": "fa fa-stethoscope"
                },
                {
                    "name": "chua-benh",
                    "link": "/kham-chua-benh/chua-benh",
                    "title": "menu.treatment",
                    "icon": "fa fa-heartbeat"
                },
                {
                    "name": "ho-so-benh-an",
                    "link": "/kham-chua-benh/ho-so-benh-an",
                    "title": "menu.medical_record",
                    "icon": "fa fa-address-book-o"
                },
            ],
            "isCollapsed": false
        },
        {
            "name": "phong-kham",
            "link": "/phong-kham",
            "title": "menu.clinic",
            "icon": "fa fa-h-square ",
            "isGroup": true,
            "groupItems": [
                {
                    "name": "luong",
                    "link": "/phong-kham/luong",
                    "title": "menu.salary",
                    "icon": "fa fa-table"
                },
                {
                    "name": "doanh-thu",
                    "link": "/phong-kham/doanh-thu",
                    "title": "menu.revenue",
                    "icon": "fa fa-line-chart "
                },
            ],
            "isCollapsed": false
        },
        {
            "name": "danh-muc",
            "link": "/danh-muc",
            "title": "menu.category",
            "icon": "fa fa-list-alt",
            "isGroup": true,
            "isCollapsed": false,
            "groupItems": [
                {
                    "name": "bacsy",
                    "link": "/danh-muc/bac-sy",
                    "title": "menu.doctor",
                    "icon": "fa fa-user-md"
                },
                {
                    "name": "yta",
                    "link": "/danh-muc/y-ta",
                    "title": "menu.nurse",
                    "icon": "fa fa-user"
                },
                {
                    "name": "benhnhan",
                    "link": "/danh-muc/benh-nhan",
                    "title": "menu.patient",
                    "icon": "fa fa-wheelchair"
                },
                {
                    "name": "thuoc",
                    "link": "/danh-muc/thuoc",
                    "title": "menu.medicine",
                    "icon": "fa fa-medkit"
                },
                {
                    "name": "benh",
                    "link": "/danh-muc/benh",
                    "title": "menu.disease",
                    "icon": "fa fa-book"
                },
                {
                    "name": "dichvu",
                    "link": "/danh-muc/dich-vu",
                    "title": "menu.service",
                    "icon": "fa fa-ambulance"
                },
                {
                    "name": "khoa",
                    "link": "/danh-muc/khoa",
                    "title": "menu.department",
                    "icon": "fa fa-h-square"
                },
                {
                    "name": "thietbi",
                    "link": "/danh-muc/thiet-bi",
                    "title": "menu.equiqment",
                    "icon": "fa fa-heartbeat"
                }
            ]
        },
    ],
    selectedMenuItem: {
        name: ''
    }
}

const sidebarReducer = (state = initState, action) => {
    switch (action.type) {
        case sidebarAction.LOAD_MENU_SUCCESS:
            return {
                ...state,
                menuItems: action.value,
            }

        case sidebarAction.LOAD_MENU_FAIL:
            return {
                ...state,
                menuItems: [],
            }

        case sidebarAction.SIDEBAR_EXPAND:
            return {
                ...state,
                isSidebarExpanded: true,
            }

        case sidebarAction.SIDEBAR_SHRINK:
            return {
                ...state,
                isSidebarExpanded: false,
            }

        case sidebarAction.SELECT_ITEM:
            return {
                ...state,
                selectedMenuItem: action.value,
            }

        case sidebarAction.GROUP_COLLAPSE:
            return {
                ...state,
                menuItems: state.menuItems.map((item) => {
                    if (item.name === action.value.name) {
                        return {
                            ...item,
                            isCollapsed: true
                        };
                    } else {
                        return item;
                    }
                })
            }
        case sidebarAction.GROUP_UNCOLLAPSE:
            return {
                ...state,
                menuItems: state.menuItems.map((item) => {
                    if (item.name === action.value.name) {
                        return {
                            ...item,
                            isCollapsed: false
                        };
                    } else {
                        return item;
                    }
                })
            }
        default:
            return state;
    }
}

export default sidebarReducer;