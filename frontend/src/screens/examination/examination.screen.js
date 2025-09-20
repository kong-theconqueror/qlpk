import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Card, Table, Button, Form } from "react-bootstrap";
// import Pagging from "../../components/table/pagging.component";
import { examinationAction } from '../../actions';

import Urls from '../../constants/urls.constant';
import { ExaminationWrapper } from './examination.style';

const ExaminationsScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const months = [1,2,3,4,5,6,7,8,9,10,11,12];
    const years = [2020, 2021, 2022, 2023, 2024, 2025];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);

    let { salaries } = useSelector(state => state.examination);

    useEffect(() => {
        const date = new Date();
        const currentMonth = date.getMonth() + 1;
        const currentYear = date.getFullYear();
        dispatch({
            type: examinationAction.GET_EXAMINATIONS,
            value: {
                month: currentMonth, 
                year: currentYear
            }
        });
    }, [dispatch]);

    const onBtnSearchClick = () => {
        dispatch({
            type: examinationAction.GET_EXAMINATIONS,
            value: {
                month: month, 
                year: year
            }
        });
    }

    const formatMoney = (value) => {
       return value.toLocaleString("vi-VN"); // "11.360.000"
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
                            {t('menu.doctor_examination')}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            {/* content */}
            <Row>
                <Col lg={12}>
                    <Card >
                        <Card.Header>
                            <Card.Title>{t('examination.examination_list')}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs={1}>{t('examination.month')}</Col>
                                <Col xs={1}>
                                    <Form.Control as="select"
                                        value={month}
                                        onChange={(event) => { setMonth(event.target.value) }}>
                                        {months.map((_month) => {
                                            return <option
                                                key={_month}
                                                value={_month}>
                                                {_month}
                                            </option>
                                        })}
                                    </Form.Control>
                                </Col>
                                <Col xs={1}>{t('examination.year')}</Col>
                                <Col xs={1}>
                                    <Form.Control as="select"
                                        value={year}
                                        onChange={(event) => { setYear(event.target.value) }}>
                                        {years.map((_year) => {
                                            return <option
                                                key={_year}
                                                value={_year}>
                                                {_year}
                                            </option>
                                        })}
                                    </Form.Control>
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
                                                <th className="center middle">{t('examination.full_name')}</th>
                                                <th className="center middle">{t('examination.examination_coefficient')}</th>
                                                <th className="center middle">{t('examination.examination_base')}</th>
                                                <th className="center middle">{t('examination.cured_patient')}</th>
                                                <th className="center middle">{t('examination.total')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {salaries.map((examination) => {
                                                return <tr key={examination.MaBS}>
                                                    <td className="center middle">{examination.MaBS}</td>
                                                    <td className="center middle">{examination.TenBS}</td>
                                                    <td className="center middle">{examination.HeSoLuong}</td>
                                                    <td className="center middle">{formatMoney(examination.LuongCoBan)}</td>
                                                    <td className="center middle">{examination.ChuaKhoi}</td>
                                                    <td className="center middle">{formatMoney(examination.TongLuong)}</td>
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
                                        {t('app.showing')} {salaries.length} {t('examination.examination')}
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