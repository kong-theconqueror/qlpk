import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Card, Table, Image, Badge, Button } from "react-bootstrap";
// import Pagging from "../../components/table/pagging.component";
import { serviceAction } from '../../actions';

import Urls from '../../constants/urls.constant';
import { ServiceWrapper } from './service.style';

const ServicesScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    let { services, page, totalPage } = useSelector(state => state.service);

    useEffect(() => {
        dispatch({
            type: serviceAction.GET_SERVICES,
        });
    }, [dispatch]);

    const onBtnPageClick = (page) => {
        dispatch({
            type: serviceAction.PAGE_CHANGE,
            value: page
        });
    }
     
    return <ServiceWrapper >
        <Container fluid>
            {/* nav */}
            <Row>
                <Col lg={12}>
                    <Breadcrumb>
                        <Breadcrumb.Item href={Urls.HOME}>
                            {t('menu.dashboard')}
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="#">
                            {t('menu.category')}
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            {t('menu.service')}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            {/* content */}
            <Row>
                <Col lg={12}>
                    <Card >
                        <Card.Header>
                            <Card.Title>{t('service.service_list')}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col sm={12}>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th className="center middle">#</th>
                                                <th className="center middle">{t('service.name')}</th>
                                                <th className="center middle">{t('service.description')}</th>
                                                <th className="center middle">{t('service.unit')}</th>
                                                <th className="center middle">{t('service.action')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {services.map((service) => {
                                                return <tr key={service.id}>
                                                    <td className="center middle">{service.id_dich_vu}</td>
                                                    <td className="center middle">{service.ten_dich_vu}</td>
                                                    <td className="center middle">{service.mo_ta}</td>
                                                    <td className="center middle">{service.don_gia}</td>
                                                    <td className="center middle">
                                                        <Button variant="success" title={t('service.info')}>
                                                            <i className="fa fa-info" aria-hidden="true"></i>
                                                        </Button>
                                                        <Button variant="primary" title={t('service.update')}>
                                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                                        </Button>
                                                        <Button variant="danger" title={t('service.delete')}>
                                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                                        </Button>
                                                    </td>

                                                </tr>
                                            })}

                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>

                            {/* paging */}
                            <Row>
                                <Col md={6}>
                                    <div className="paging-text">
                                        {/* {t('app.showing')} 1 {t('app.to')} 10 {t('app.of')} 57 {t('service.service')} */}
                                        {t('app.showing')} {services.length} {t('service.service')}
                                    </div>
                                </Col>
                                <Col md={6}>
                                    {/* paging */}
                                    {/* <Pagging 
                                        page={page}
                                        totalPage={totalPage}
                                        onBtnPageClick={onBtnPageClick}
                                    /> */}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </ServiceWrapper>;
}

export default ServicesScreen;