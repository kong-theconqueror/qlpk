import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Card, Table, Button, Form } from "react-bootstrap";
// import Pagging from "../../components/table/pagging.component";
import { diseaseStatisticAction } from '../../actions';

import Urls from '../../constants/urls.constant';
import { DiseaseStatisticWrapper } from './diseaseStatistic.style';

const DiseaseStatisticScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const months = [1,2,3,4,5,6,7,8,9,10,11,12];
    const years = [2020, 2021, 2022, 2023, 2024, 2025];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);

    let { diseases } = useSelector(state => state.diseaseStatistic);

    useEffect(() => {
        const date = new Date();
        const currentMonth = date.getMonth() + 1;
        const currentYear = date.getFullYear();
        dispatch({
            type: diseaseStatisticAction.GET_DISEASES,
            value: {
                month: currentMonth, 
                year: currentYear
            }
        });
    }, [dispatch]);

    const onBtnSearchClick = () => {
        dispatch({
            type: diseaseStatisticAction.GET_DISEASES,
            value: {
                month: month, 
                year: year
            }
        });
    }

    return <DiseaseStatisticWrapper >
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
                            {t('menu.disease_statistic')}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            {/* content */}
            <Row>
                <Col lg={12}>
                    <Card >
                        <Card.Header>
                            <Card.Title>{t('statistic.disease_list')}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs={1}>{t('statistic.month')}</Col>
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
                                <Col xs={1}>{t('statistic.year')}</Col>
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
                                        title={t('statistic.search')}> {t('statistic.search')}
                                    </Button>
                                </Col>

                                <Col sm={12}>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th className="center middle">#</th>
                                                <th className="center middle">{t('statistic.disease_name')}</th>
                                                <th className="center middle">{t('statistic.total_patient')}</th>
                                                {/* <th className="center middle">{t('statistic.action')}</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {diseases.map((disease) => {
                                                return <tr key={disease.MaBenh}>
                                                    <td className="center middle">{disease.MaBenh}</td>
                                                    <td className="center middle">{disease.TenBenh}</td>
                                                    <td className="center middle">{disease.SoBenhNhan}</td>
                                                    {/* <td className="center middle">
                                                        <Button variant="success" 
                                                            title={t('statistic.detail')}>
                                                            <i className="fa fa-search" aria-hidden="true"></i>
                                                        </Button>
                                                    </td> */}
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
                                        {t('app.showing')} {diseases.length} {t('statistic.salary')}
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
    </DiseaseStatisticWrapper>;
}

export default DiseaseStatisticScreen;