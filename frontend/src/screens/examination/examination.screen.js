import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Card, Table, Button } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
// import Pagging from "../../components/table/pagging.component";
import { examinationAction } from '../../actions';

import Urls from '../../constants/urls.constant';
import { ExaminationWrapper } from './examination.style';

const ExaminationsScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [selectedDate, setSelectedDate] = useState(new Date());

    let { examinations } = useSelector(state => state.examination);
    const formatDateLocal = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        const date = new Date();
        dispatch({
            type: examinationAction.GET_EXAMINATIONS,
            value: {
                date: formatDateLocal(date) 
            }
        });
    }, [dispatch]);

    const onBtnSearchClick = () => {
        dispatch({
            type: examinationAction.GET_EXAMINATIONS,
            value: {
                date: formatDateLocal(selectedDate)
            }
        });
    }
     
    return <ExaminationWrapper >
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
                            {t('menu.examination')}
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
                                    <Card.Title>{t('examination.examination_list')}</Card.Title>
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
                                <Col xs={1}>{t('examination.exam_date')}</Col>
                                <Col xs={2}>
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={(date) => setSelectedDate(date)}
                                        dateFormat="yyyy-MM-dd"
                                        className="form-control"
                                    />
                                </Col>
                                <Col xs={2}>
                                    <Button variant="primary" 
                                        style= {{minWidth: 75}}
                                        onClick={() => onBtnSearchClick()}
                                        title={t('examination.search')}> {t('examination.search')}
                                    </Button>
                                </Col>

                                <Col sm={12}>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th className="center middle">#</th>
                                                <th className="center middle">{t('examination.patient_id')}</th>
                                                <th className="center middle">{t('examination.patient')}</th>
                                                <th className="center middle">{t('examination.doctor')}</th>
                                                <th className="center middle">{t('examination.department')}</th>
                                                <th className="center middle">{t('examination.exam_time')}</th>
                                                <th className="center middle">{t('examination.action')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {examinations.map((examination) => {
                                                return <tr key={examination.MaKB}>
                                                    <td className="center middle">{examination.MaKB}</td>
                                                    <td className="center middle">{examination.MaBN}</td>
                                                    <td className="center middle">{examination.TenBN}</td>
                                                    <td className="center middle">{examination.TenBS}</td>
                                                    <td className="center middle">{examination.TenKhoa}</td>
                                                    <td className="center middle">{examination.ThoiGian}</td>
                                                    <td className="center middle">
                                                        <Button variant="primary" 
                                                            // onClick={() => onUpdateDoctorBtnClicked(item)}
                                                            title={t('examination.update')}>
                                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                                        </Button>
                                                        <Button variant="danger" 
                                                            // onClick={() => onDeleteDoctorBtnClicked(item)}
                                                            title={t('examination.delete')}>
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
                                        {/* {t('app.showing')} 1 {t('app.to')} 10 {t('app.of')} 57 {t('examination.examination')} */}
                                        {t('app.showing')} {examinations.length} {t('examination.examination')}
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
    </ExaminationWrapper>;
}

export default ExaminationsScreen;