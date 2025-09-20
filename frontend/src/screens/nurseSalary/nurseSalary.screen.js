import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Card, Table, Button, Form } from "react-bootstrap";
// import Pagging from "../../components/table/pagging.component";
import { nurseSalaryAction } from '../../actions';

import Urls from '../../constants/urls.constant';
import { SalaryWrapper } from './nurseSalary.style';

const SalarysScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const months = [1,2,3,4,5,6,7,8,9,10,11,12];
    const years = [2020, 2021, 2022, 2023, 2024, 2025];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);

    let { salaries } = useSelector(state => state.nurseSalary);

    useEffect(() => {
        const date = new Date();
        const currentMonth = date.getMonth() + 1;
        const currentYear = date.getFullYear();
        dispatch({
            type: nurseSalaryAction.GET_SALARIES,
            value: {
                month: currentMonth, 
                year: currentYear
            }
        });
    }, [dispatch]);

    const onBtnSearchClick = () => {
        dispatch({
            type: nurseSalaryAction.GET_SALARIES,
            value: {
                month: month, 
                year: year
            }
        });
    }

    const formatMoney = (value) => {
       return value.toLocaleString("vi-VN"); // "11.360.000"
    }
     
    return <SalaryWrapper >
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
                            {t('menu.nurse_salary')}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            {/* content */}
            <Row>
                <Col lg={12}>
                    <Card >
                        <Card.Header>
                            <Card.Title>{t('salary.salary_list')}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs={1}>
                                    {t('salary.month')}
                                </Col>
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
                                <Col xs={1}>{t('salary.year')}</Col>
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
                                        title={t('salary.search')}> {t('salary.search')}
                                    </Button>
                                </Col>

                                <Col sm={12}>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th className="center middle">#</th>
                                                <th className="center middle">{t('salary.full_name')}</th>
                                                <th className="center middle">{t('salary.salary_coefficient')}</th>
                                                <th className="center middle">{t('salary.salary_base')}</th>
                                                <th className="center middle">{t('salary.support')}</th>
                                                <th className="center middle">{t('salary.total')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {salaries.map((salary) => {
                                                return <tr key={salary.MaYT}>
                                                    <td className="center middle">{salary.MaYT}</td>
                                                    <td className="center middle">{salary.TenYT}</td>
                                                    <td className="center middle">{salary.HeSoLuong}</td>
                                                    <td className="center middle">{formatMoney(salary.LuongCoBan)}</td>
                                                    <td className="center middle">{salary.HoTro}</td>
                                                    <td className="center middle">{formatMoney(salary.TongLuong)}</td>
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
                                        {/* {t('app.showing')} 1 {t('app.to')} 10 {t('app.of')} 57 {t('salary.salary')} */}
                                        {t('app.showing')} {salaries.length} {t('salary.salary')}
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
    </SalaryWrapper>;
}

export default SalarysScreen;