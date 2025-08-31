import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Card, Table, Image, Badge, Button } from "react-bootstrap";
import Pagging from "../../components/table/pagging.component";
import { doctorAction } from '../../actions';

import Urls from '../../constants/urls.constant';
import { DoctorWrapper } from './doctor.style';

const DoctorsScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    let { doctors, page, totalPage } = useSelector(state => state.doctor);

    useEffect(() => {
        dispatch({
            type: doctorAction.GET_DOCTORS_BY_PAGING,
        });
    }, [dispatch]);

    const onBtnPageClick = (page) => {
        dispatch({
            type: doctorAction.PAGE_CHANGE,
            value: page
        });
    }
     
    return <DoctorWrapper >
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
                            {t('menu.doctor')}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            {/* content */}
            <Row>
                <Col lg={12}>
                    <Card >
                        <Card.Header>
                            <Card.Title>{t('doctor.doctor_list')}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col sm={12}>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th className="center middle">#</th>
                                                <th className="center middle">{t('doctor.name')}</th>
                                                <th className="center middle">{t('doctor.image')}</th>
                                                <th className="center middle">{t('doctor.price')}</th>
                                                <th className="center middle">{t('doctor.discount')}</th>
                                                <th className="center middle">{t('doctor.status')}</th>
                                                <th className="center middle">{t('doctor.action')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {doctors.map((doctor) => {
                                                return <tr key={doctor.id}>
                                                    <td className="center middle">{doctor.id}</td>
                                                    <td className="center middle">{doctor.name}</td>
                                                    <td className="center middle">
                                                        <Image className="doctor-photo"
                                                            src={doctor.photo ? doctor.photo : '/images/no_photo.jpg'} />
                                                    </td>
                                                    <td className="center middle">{doctor.price} {doctor.currency_unit}</td>
                                                    <td className="center middle">{doctor.discount} %</td>
                                                    <td className="center middle">
                                                        {doctor.is_hot ? <Badge variant="danger" className="status">Hot</Badge> : null}
                                                        {doctor.is_new ? <Badge variant="primary" className="status">New</Badge> : null}

                                                    </td>
                                                    <td className="center middle">
                                                        <Button variant="success" title={t('doctor.info')}>
                                                            <i className="fa fa-info" aria-hidden="true"></i>
                                                        </Button>
                                                        <Button variant="primary" title={t('doctor.statistic')}>
                                                            <i className="fa fa-area-chart" aria-hidden="true"></i>
                                                        </Button>
                                                        <Button variant="primary" title={t('doctor.update')}>
                                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                                        </Button>
                                                        <Button variant="danger" title={t('doctor.delete')}>
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
                                        {t('app.showing')} 1 {t('app.to')} 10 {t('app.of')} 57 {t('doctor.doctor')}
                                    </div>
                                </Col>
                                <Col md={6}>
                                    {/* paging */}
                                    <Pagging 
                                        page={page}
                                        totalPage={totalPage}
                                        onBtnPageClick={onBtnPageClick}
                                    />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </DoctorWrapper>;
}

export default DoctorsScreen;