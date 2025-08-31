import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { history } from '../../helpers/history';
import Urls from '../../constants/urls.constant';
import { userAction } from '../../actions';
import { UserWrapper } from './header.style';
import userLogo from '../../asserts/img/user-default.svg';

const HeaderUser = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    let { isLoggedIn } = useSelector(state => state.user);

    const onLogOutBtnClick = () => {
        dispatch({
            type: userAction.LOG_OUT,
        });
    }

    const onUserProfileBtnClick = () => {
        history.push(Urls.PROFILE);
    }

    return <>
        {!isLoggedIn
            ? <UserWrapper>
                <p>{t('app.login')}</p>
            </UserWrapper>
            : <UserWrapper>
                <div style={{ height: 55 }} onClick={onUserProfileBtnClick}>
                    <img src={userLogo} alt="avatar" />
                </div>
                <div className="dropdown-user-menu">
                    <div className="dropdown-item">
                        <p onClick={onLogOutBtnClick}>
                            <i className="fa fa-sign-out" aria-hidden="true"></i> {t('app.logout')}
                        </p>
                    </div>
                </div>
            </UserWrapper>
        }
    </>
}

export default HeaderUser;