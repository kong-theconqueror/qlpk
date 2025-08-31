import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col,
    // Form, 
    Button } from 'react-bootstrap';

import { ProfileWrapper } from './profile.style';
import userLogo from '../../../asserts/img/user-default.svg';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {
    };

    render() {
        const { userProfile } = this.props;

        return (
            <ProfileWrapper>
                <h3 className="title">
                    Thông tin cá nhân
                    <Button size="sm" style={{marginLeft: 10}}>
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                    </Button>
                </h3> 
                
                <Row>
                    {/* avatar */}
                    <Col lg={2} sm={12}>
                        <img className="avatar" alt="avatar" src={userLogo} />
                    </Col>

                    {/* user information */}
                    <Col lg={10} sm={12}>
                        <Row>
                            <Col lg={3}>
                                <p className="info-title">Họ và tên:</p>
                            </Col>
                            <Col lg={8}>
                                <p className="info">{userProfile.userName}</p>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={3}>
                                <p className="info-title">Vai trò:</p>
                            </Col>
                            <Col lg={8}>
                                <p className="info">Học sinh</p>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={3}>
                                <p className="info-title">Ngày sinh:</p>
                            </Col>
                            <Col lg={8}>
                                <p className="info">12 - 01 - 2002</p>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={3}>
                                <p className="info-title">Giới tính:</p>
                            </Col>
                            <Col lg={8}>
                                <p className="info">{userProfile.gender ? "Nam" : "Nữ"}</p>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={3}>
                                <p className="info-title">Quốc tịch:</p>
                            </Col>
                            <Col lg={8}>
                                <p className="info">{userProfile.country}</p>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={3}>
                                <p className="info-title">Địa chỉ:</p>
                            </Col>
                            <Col lg={8}>
                                <p className="info">{userProfile.address}</p>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={3}>
                                <p className="info-title">Số điện thoại:</p>
                            </Col>
                            <Col lg={8}>
                                <p className="info">{userProfile.phone}</p>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={3}>
                                <p className="info-title">Email:</p>
                            </Col>
                            <Col lg={8}>
                                <p className="info">{userProfile.email}</p>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={3}>
                                <p className="info-title">Facebook:</p>
                            </Col>
                            <Col lg={8}>
                                <p className="info">{userProfile.fbID}</p>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={3}>
                                <p className="info-title">Mô tả bản thân:</p>
                            </Col>
                            <Col lg={8}>
                                <p className="info">{userProfile.description}</p>
                            </Col>
                        </Row>

                    </Col>

                </Row>

            </ProfileWrapper>
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
)(Profile);