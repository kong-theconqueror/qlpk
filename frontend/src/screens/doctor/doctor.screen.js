import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Card, Table, Image, Badge, Button } from "react-bootstrap";
// import Pagging from "../../components/table/pagging.component";
import { doctorAction } from '../../actions';

import Urls from '../../constants/urls.constant';
import { DoctorWrapper } from './doctor.style';

const DoctorsScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    let { doctors, page, totalPage } = useSelector(state => state.doctor);

    useEffect(() => {
        dispatch({
            type: doctorAction.GET_DOCTORS,
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
                                                <th className="center middle">{t('doctor.full_name')}</th>
                                                <th className="center middle">{t('doctor.gender')}</th>
                                                <th className="center middle">{t('doctor.room')}</th>
                                                <th className="center middle">{t('doctor.years_of_experience')}</th>
                                                <th className="center middle">{t('doctor.title')}</th>
                                                <th className="center middle">{t('doctor.salary_coefficient')}</th>
                                                <th className="center middle">{t('doctor.specialty')}</th>
                                                <th className="center middle">{t('doctor.action')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {doctors.map((doctor) => {
                                                return <tr key={doctor.id}>
                                                    <td className="center middle">{doctor.id}</td>
                                                    <td className="center middle">{doctor.full_name}</td>
                                                    <td className="center middle">{doctor.gender}</td>
                                                    <td className="center middle">{doctor.room}</td>
                                                    <td className="center middle">{doctor.years_of_experience}</td>
                                                    <td className="center middle">{doctor.title}</td>
                                                    <td className="center middle">{doctor.salary_coefficient}</td>
                                                    <td className="center middle">{doctor.specialty}</td>
                                                    <td className="center middle">
                                                        <Button variant="success" title={t('doctor.info')}>
                                                            <i className="fa fa-info" aria-hidden="true"></i>
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
                                        {/* {t('app.showing')} 1 {t('app.to')} 10 {t('app.of')} 57 {t('doctor.doctor')} */}
                                        {t('app.showing')} {doctors.length} {t('doctor.doctor')}
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
    </DoctorWrapper>;
}

export default DoctorsScreen;