import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Card, Table, Button, Form } from "react-bootstrap";
// import Pagging from "../../components/table/pagging.component";
import { medicalRecordAction } from '../../actions';

import Urls from '../../constants/urls.constant';
import { MedicalRecordWrapper } from './medicalRecord.style';

const MedicalRecordScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [patientID, setPatientID] = useState("");

    let { medicalRecords } = useSelector(state => state.medicalRecord);

    const str2date = (str) => {
        const date = new Date(str);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // tháng bắt đầu từ 0
        const year = date.getFullYear();

        const formatted = `${day}-${month}-${year}`;
        console.log(formatted); // đd-mm-yyyy
        return formatted;
    }

    useEffect(() => {
        if(patientID){
            dispatch({
                type: medicalRecordAction.GET_MEDICAL_RECORDS,
                value: {
                    MaBN: patientID
                }
            });
        }
    }, [dispatch]);

    const onBtnSearchClick = () => {
        dispatch({
            type: medicalRecordAction.GET_MEDICAL_RECORDS,
            value: {
                MaBN: patientID
            }
        });
    }
     
    return <MedicalRecordWrapper >
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
                            {t('menu.medical_record')}
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
                                    <Card.Title>{t('medical_record.medical_record_list')}</Card.Title>
                                </Col>
                                <Col>
                                    <Button variant="primary" type="submit" style={{ float: "right", minWidth: 50 }}
                                        // onClick={onCreateDoctorBtnClicked}
                                    >
                                        {t('doctor.add')}
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs={1}>{t('medical_record.patient_id')}</Col>
                                <Col xs={2}>
                                    <Form.Control
                                        type='text'
                                        value={patientID}
                                        onChange={(event) => { setPatientID(event.target.value) }} />
                                </Col>
                                <Col xs={2}>
                                    <Button variant="primary" 
                                        style= {{minWidth: 75}}
                                        onClick={() => onBtnSearchClick()}
                                        title={t('medical_record.search')}> {t('medical_record.search')}
                                    </Button>
                                </Col>

                                <Col sm={12}>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th className="center middle">#</th>
                                                <th className="center middle">{t('medical_record.record_id')}</th>
                                                <th className="center middle">{t('medical_record.patient_id')}</th>
                                                <th className="center middle">{t('medical_record.patient')}</th>
                                                <th className="center middle">{t('medical_record.doctor')}</th>
                                                <th className="center middle">{t('medical_record.department')}</th>
                                                <th className="center middle">{t('medical_record.disease')}</th>
                                                <th className="center middle">{t('medical_record.status')}</th>
                                                <th className="center middle">{t('medical_record.open_time')}</th>
                                                <th className="center middle">{t('medical_record.close_time')}</th>
                                                <th className="center middle">{t('medical_record.action')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {medicalRecords.map((medicalRecord, index) => {
                                                return <tr key={medicalRecord.MaBA}>
                                                    <td className="center middle">{index+1}</td>
                                                    <td className="center middle">{medicalRecord.MaBA}</td>
                                                    <td className="center middle">{medicalRecord.MaBN}</td>
                                                    <td className="center middle">{medicalRecord.TenBN}</td>
                                                    <td className="center middle">{medicalRecord.TenBS}</td>
                                                    <td className="center middle">{medicalRecord.TenKhoa}</td>
                                                    <td className="center middle">{medicalRecord.TenBenh}</td>
                                                    <td className="center middle">{medicalRecord.TrangThai}</td>
                                                    <td className="center middle">{str2date(medicalRecord.ThoiGianMo)}</td>
                                                    <td className="center middle">{str2date(medicalRecord.ThoiGianKetThuc)}</td>
                                                    <td className="center middle">
                                                        <Button variant="primary" 
                                                            // onClick={() => onUpdateDoctorBtnClicked(item)}
                                                            title={t('medical_record.update')}>
                                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                                        </Button>
                                                        <Button variant="danger" 
                                                            // onClick={() => onDeleteDoctorBtnClicked(item)}
                                                            title={t('medical_record.delete')}>
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
                                        {/* {t('app.showing')} 1 {t('app.to')} 10 {t('app.of')} 57 {t('medical_record.medical_record')} */}
                                        {t('app.showing')} {medicalRecords.length} {t('medical_record.medical_record')}
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
    </MedicalRecordWrapper>;
}

export default MedicalRecordScreen;