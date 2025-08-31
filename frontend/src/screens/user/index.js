import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {history} from '../../helpers/history';
import { Container, Row, Col } from 'react-bootstrap';
import { UserWrapper } from './user.style';
import UserRouter from './user.router';
import Urls from "../../constants/urls.constant";


class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        console.log(history.location.pathname);
    };

    render() {
        return (
            <UserWrapper>
                <Container>
                    {/* link */}
                    <Row>
                        <Col lg={12} sm={0}>
                            <p className="link"><Link to={Urls.HOME}> Trang chủ</Link> &gt; <b>Thông tin cá nhân</b></p>
                        </Col>
                    </Row>

                    {/* content */}
                    <Row>
                        {/* function box */}
                        <Col lg={3} sm={0}>
                            <div className="user-function-box">
                                <ul className="user-list-function">
                                    <li className={history.location.pathname === Urls.PROFILE ? "active" : ""}>
                                        <Link to={Urls.PROFILE}>Thông tin cá nhân</Link>
                                    </li>

                                    {/* <li className={history.location.pathname === Urls.userSchool ? "active" : ""}>
                                        <Link to={Urls.userSchool}>Thông tin trường học</Link>
                                    </li> */}

                                    <li className={history.location.pathname === Urls.CHANGE_PASSWORD ? "active" : ""}>
                                        <Link to={Urls.CHANGE_PASSWORD}>Đổi mật khẩu</Link>
                                    </li>

                                </ul>
                            </div>
                        </Col>

                        {/* information */}
                        <Col lg={9} sm={12}>
                            <UserRouter />
                        </Col>
                    </Row>
                </Container>
            </UserWrapper>
        )
    }
}

export default connect(
    state => ({
        ...state.User
    }),
    {
        // ...testActions
    }
)(User);