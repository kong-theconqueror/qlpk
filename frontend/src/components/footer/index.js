import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

import { FooterWrapper } from './footer.style';
import Urls from '../../constants/urls.constant';

const Footer = () => {
    return <FooterWrapper>
        <Container>
            <Row>
                <Col lg={6}>
                </Col>

                <Col lg={2}>
                </Col>

                <Col lg={2}>
                </Col>

                <Col lg={2}>
                </Col>
            </Row>

        </Container>

        {/* <hr/> */}
        <Row className="bottom">
            <Col lg={12}>
                <p>Copyright KONG © 2023</p>
            </Col>
        </Row>
    </FooterWrapper >
}

export default useMemo(Footer);