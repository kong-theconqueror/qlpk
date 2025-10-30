import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Card, Table, Button } from "react-bootstrap";
// import Pagging from "../../components/table/pagging.component";
import { patientAction } from '../../actions';

import Urls from '../../constants/urls.constant';
import { PatientWrapper } from './patient.style';

const PatientsScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    let { patients } = useSelector(state => state.patient);

    useEffect(() => {
        dispatch({
            type: patientAction.GET_PATIENTS,
        });
    }, [dispatch]);
     
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
                            <Row>
                                <Col>
                                    <Card.Title>{t('patient.patient_list')}</Card.Title>
                                </Col>
                                <Col>
                                    <Button variant="primary" type="submit" style={{ float: "right", minWidth: 50 }}
                                    >
                                        {t('doctor.add')}
                                    </Button>
                                </Col>
                            </Row>
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
                                                <th className="center middle">{t('patient.birth')}</th>
                                                <th className="center middle">{t('patient.phone_num')}</th>
                                                <th className="center middle">{t('patient.address')}</th>
                                                <th className="center middle">{t('patient.action')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {patients.map((patient) => {
                                                return <tr key={patient.MaBN}>
                                                    <td className="center middle">{patient.MaBN}</td>
                                                    <td className="center middle">{patient.TenBN}</td>
                                                    <td className="center middle">{patient.GioiTinh}</td>
                                                    <td className="center middle">{patient.NgaySinh}</td>
                                                    <td className="center middle">{patient.SDT}</td>
                                                    <td className="center middle">{patient.DiaChi}</td>
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