import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Card, Table, Button } from "react-bootstrap";
// import Pagging from "../../components/table/pagging.component";
import { doctorAction } from '../../actions';
import CreateDoctorModal from './createDoctor.modal';
import DeleteDoctorModal from "./deleteDoctor.modal";
import UpdateDoctorModal from "./updateDoctor.modal";

import Urls from '../../constants/urls.constant';
import { DoctorWrapper } from './doctor.style';

const DoctorsScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    let { 
        doctors, 
        isShowCreateDoctorModal,
        isShowUpdateDoctorModal,
        isShowDeleteDoctorModal,
    } = useSelector(state => state.doctor);

    useEffect(() => {
        dispatch({
            type: doctorAction.GET_DOCTORS,
        });
    }, [dispatch]);
    
    const onCreateDoctorBtnClicked = () => {
        dispatch({
            type: doctorAction.SHOW_CREATE_DOCTOR_MODAL,
        });
    }

    const onUpdateDoctorBtnClicked = (doctor) => {
        dispatch({
            type: doctorAction.SELECT_DOCTOR,
            value: doctor
        });

        dispatch({
            type: doctorAction.SHOW_UPDATE_DOCTOR_MODAL,
        });
    }

    const onDeleteDoctorBtnClicked = (doctor) => {
        dispatch({
            type: doctorAction.SELECT_DOCTOR,
            value: doctor
        });

        dispatch({
            type: doctorAction.SHOW_DELETE_DOCTOR_MODAL,
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
                            <Row>
                                <Col>
                                    <Card.Title>{t('doctor.doctor_list')}</Card.Title>
                                </Col>
                                <Col>
                                    <Button variant="primary" type="submit" style={{ float: "right", minWidth: 50 }}
                                        onClick={onCreateDoctorBtnClicked}
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
                                            {doctors.map((item) => {
                                                return <tr key={item.id}>
                                                    <td className="center middle">{item.id}</td>
                                                    <td className="center middle">{item.full_name}</td>
                                                    <td className="center middle">{item.gender}</td>
                                                    <td className="center middle">{item.room}</td>
                                                    <td className="center middle">{item.years_of_experience}</td>
                                                    <td className="center middle">{item.title}</td>
                                                    <td className="center middle">{item.salary_coefficient}</td>
                                                    <td className="center middle">{item.ten_khoa}</td>
                                                    <td className="center middle">
                                                        <Button variant="primary" 
                                                            onClick={() => onUpdateDoctorBtnClicked(item)}
                                                            title={t('doctor.update')}>
                                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                                        </Button>
                                                        <Button variant="danger" 
                                                            onClick={() => onDeleteDoctorBtnClicked(item)}
                                                            title={t('doctor.delete')}>
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
            <CreateDoctorModal
                isShow={isShowCreateDoctorModal}
            />

            <UpdateDoctorModal
                isShow={isShowUpdateDoctorModal}
            />

            <DeleteDoctorModal
                isShow={isShowDeleteDoctorModal}
            />
        </Container>
    </DoctorWrapper>;
}

export default DoctorsScreen;