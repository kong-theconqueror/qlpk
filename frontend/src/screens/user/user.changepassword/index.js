import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Button } from 'react-bootstrap';

import { ChangePasswordWrapper } from './changepassword.style';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: ''
        };
    }

    componentDidMount() {
    };

    onOldPasswordChange(event) {
        this.setState({
            ...this.state,
            oldPassword: event.target.value,
        });
    }

    onNewPasswordChange(event) {
        this.setState({
            ...this.state,
            newPassword: event.target.value,
        });
    }

    render() {
        const { oldPassword, newPassword } = this.state;

        return (
            <ChangePasswordWrapper>
                <h3 className="title">Thay đổi mật khẩu</h3>
                <Row>
                    <Col lg={12} sm={12}>
                        <Form as="div">
                            <Form.Group className="mb-3">
                                <Form.Label>Mật khẩu cũ</Form.Label>
                                <Form.Control type="password" placeholder="Nhập mật khẩu cũ" size="sm"
                                    value={oldPassword}
                                    onChange={this.onOldPasswordChange.bind(this)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Mật khẩu mới</Form.Label>
                                <Form.Control type="password" placeholder="Nhập mật khẩu mới" size="sm"
                                    value={newPassword}
                                    onChange={this.onNewPasswordChange.bind(this)}
                                />
                            </Form.Group>
                        </Form>

                    </Col>
                </Row>

                <Row>
                    <Col lg={12}>
                        <Button variant="danger" size="sm">Hủy</Button>
                        <Button variant="primary" size="sm">Lưu</Button>
                    </Col>
                </Row>

            </ChangePasswordWrapper>
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