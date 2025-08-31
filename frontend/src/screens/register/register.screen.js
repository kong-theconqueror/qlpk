import React, { useState } from "react";
import { useSelector, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { Form, Button, Col } from 'react-bootstrap';
import userActions from '../../redux/user/actions';
import alertActions from '../../redux/alert/actions';
// import { history } from '../../helpers/history';
import Urls from '../../constants/urls.constant';

import { RegisterWrapper } from './register.style';

const RegisterScreen = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         name: '',
    //         email: '',
    //         phone: '',
    //         password: '',
    //         repassword: '',
    //         height: window.innerHeight
    //     };
    // }

    // componentDidMount() {
    //     window.addEventListener('resize', () => {
    //         this.setState({
    //             ...this.state,
    //             height: window.innerHeight
    //         })
    //     });
    //     // const {isLoggedIn} = this.props;
    //     // if(isLoggedIn){
    //     //     history.push(Urls.HOME)
    //     // }
    // };

    // onTextChanged(id, event){
    //     this.setState({
    //         ...this.state,
    //         [id]: event.target.value
    //     })
    // }

    const onRegisterBtnClick = () => {
        const { name, email, phone, password, repassword } = this.state;
        if (name === '') {
            this.props.error('Chưa điền họ và tên!');
            return;
        }
        if (email === '') {
            this.props.error('Chưa điền email!');
            return;
        }
        if (phone === '') {
            this.props.error('Chưa điền số điện thoại!');
            return;
        }
        if (password === '') {
            this.props.error('Chưa điền mật khẩu!');
            return;
        }
        if (password !== repassword) {
            this.props.error('Mật khẩu xác nhận không trùng khớp!');
            return;
        }
        this.props.register({
            display_name: name,
            email: email,
            phone: phone,
            password: password,
        })
    }


    return <RegisterWrapper height={height}>
        <div className="wall"></div>
        <div className="right-side">
            <div className="box">
                <div className="box-header">
                    <h4 className="title">
                        {appDict.REGISTRY_TITLE}
                    </h4>
                </div>
                <div className="box-content">
                    <Form>
                        <Form.Group controlId="frmUsername">
                            {/* <Form.Label>Họ và tên</Form.Label> */}
                            <Form.Control type="text" placeholder={appDict.FULL_NAME}
                                value={name}
                                onChange={this.onTextChanged.bind(this, 'name')}
                            />

                        </Form.Group>

                        <Form.Group controlId="frmEmail">
                            <Form.Control type="text" placeholder={appDict.EMAIL}
                                value={email}
                                onChange={this.onTextChanged.bind(this, 'email')}
                            />

                        </Form.Group>

                        <Form.Group controlId="frmPhone">
                            <Form.Control type="text" placeholder={appDict.PHONE_NUMBER}
                                value={phone}
                                onChange={this.onTextChanged.bind(this, 'phone')}
                            />

                        </Form.Group>


                        <Form.Group controlId="frmPassword">
                            <Form.Row>
                                <Col lg={6}>
                                    <Form.Control type="password" placeholder={appDict.PASSWORD}
                                        value={password}
                                        onChange={this.onTextChanged.bind(this, 'password')}

                                    />
                                </Col>
                                <Col lg={6}>
                                    <Form.Control type="password" placeholder={appDict.RE_PASSWORD}
                                        value={repassword}
                                        onChange={this.onTextChanged.bind(this, 'repassword')}

                                    />
                                </Col>
                            </Form.Row>
                        </Form.Group>

                        <Button block
                            className="center"
                            variant="primary"
                            onClick={onRegisterBtnClick}
                        >
                            {appDict.REGISTRY_BTN}
                        </Button>
                        <div className="login">
                            <Link to={Urls.LOGIN}>{t('login.login')}</Link>
                        </div>
                    </Form>
                </div>
                <div className="box-footer"></div>
            </div>
        </div>
    </RegisterWrapper>
}

export default RegisterScreen;