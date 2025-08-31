import React, { useState, memo } from "react";
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// import { Link } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import userActions from '../../actions/user.action';
import notificationActions from '../../actions/notification.action';

// import { history } from '../../helpers/history';
// import Urls from '../../constants/urls.constant';
import { LoginWrapper } from './login.style';

const Login = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const onLoginBtnClicked = () => {
        if (username === '') {
            dispatch({
                type: notificationActions.ERROR,
                value: 'login.empty_username'
            });
        }
        else if (password === '') {
            dispatch({
                type: notificationActions.ERROR,
                value: 'login.empty_password'
            });
        }
        else {
            dispatch({
                type: userActions.LOG_IN,
                value: {
                    username: username,
                    password: password,
                }
            });
        }
    }

    const onKeyPressed = (event) => {
        if (event.charCode === 13) {
            onLoginBtnClicked();
        }
    }

    return <LoginWrapper >
        <div className="box">
            <div className="box-header">
                <h4 className="title">
                    {t('app.app_name')}
                    <br />
                    <strong>{t('app.app_title')}</strong>
                </h4>
            </div>
            <div className="box-content">
                <Form>
                    <Form.Group controlId="frmUsername">
                        <Form.Control type="text" placeholder={t('login.username')}
                            value={username}
                            onChange={onUsernameChange}
                            onKeyPress={onKeyPressed}
                        />
                    </Form.Group>

                    <Form.Group controlId="frmPassword">
                        <Form.Control type="password" placeholder={t('login.password')}
                            value={password}
                            onChange={onPasswordChange}
                            onKeyPress={onKeyPressed}
                        />
                    </Form.Group>

                    <Button block
                        className="center"
                        variant="primary"
                        onClick={onLoginBtnClicked}
                    >
                        {t('login.login')}
                    </Button>
                    {/* <div className="register">
                        <Link to={Urls.REGISTER}>{t('login.create_new_account')}</Link>
                    </div> */}
                </Form>
            </div>
            <div className="box-footer"></div>
        </div>
        {/* </div> */}
    </LoginWrapper>;
}

export default memo(Login);