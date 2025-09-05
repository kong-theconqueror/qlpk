import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Card, Table, Image, Badge, Button } from "react-bootstrap";
// import Pagging from "../../components/table/pagging.component";
import { patientAction } from '../../actions';

import Urls from '../../constants/urls.constant';
import { PatientWrapper } from './patient.style';

const PatientsScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    let { patients, page, totalPage } = useSelector(state => state.patient);

    useEffect(() => {
        dispatch({
            type: patientAction.GET_PATIENTS,
        });
    }, [dispatch]);

    const onBtnPageClick = (page) => {
        dispatch({
            type: patientAction.PAGE_CHANGE,
            value: page
        });
    }
     
    return <PatientWrapper >
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
                            {t('menu.patient')}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            {/* content */}
            <Row>
                <Col lg={12}>
                    <Card >
                        <Card.Header>
                            <Card.Title>{t('patient.patient_list')}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col sm={12}>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th className="center middle">#</th>
                                                <th className="center middle">{t('patient.full_name')}</th>
                                                <th className="center middle">{t('patient.gender')}</th>
                                                <th className="center middle">{t('patient.room')}</th>
                                                <th className="center middle">{t('patient.years_of_experience')}</th>
                                                <th className="center middle">{t('patient.title')}</th>
                                                <th className="center middle">{t('patient.salary_coefficient')}</th>
                                                <th className="center middle">{t('patient.specialty')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {patients.map((patient) => {
                                                return <tr key={patient.id}>
                                                    <td className="center middle">{patient.id}</td>
                                                    <td className="center middle">{patient.full_name}</td>
                                                    <td className="center middle">{patient.gender}</td>
                                                    <td className="center middle">{patient.room}</td>
                                                    <td className="center middle">{patient.years_of_experience}</td>
                                                    <td className="center middle">{patient.title}</td>
                                                    <td className="center middle">{patient.salary_coefficient}</td>
                                                    <td className="center middle">{patient.specialty}</td>
                                                    <td className="center middle">
                                                        <Button variant="success" title={t('patient.info')}>
                                                            <i className="fa fa-info" aria-hidden="true"></i>
                                                        </Button>
                                                        <Button variant="primary" title={t('patient.update')}>
                                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                                        </Button>
                                                        <Button variant="danger" title={t('patient.delete')}>
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
                                        {/* {t('app.showing')} 1 {t('app.to')} 10 {t('app.of')} 57 {t('patient.patient')} */}
                                        {t('app.showing')} {patients.length} {t('patient.patient')}
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
    </PatientWrapper>;
}

export default PatientsScreen;