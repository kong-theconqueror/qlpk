import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Card, Table, Button, Form } from "react-bootstrap";
// import Pagging from "../../components/table/pagging.component";
import { revenueAction } from '../../actions';

import Urls from '../../constants/urls.constant';
import { RevenueWrapper } from './revenue.style';

const RevenuesScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const years = [2020, 2021, 2022, 2023, 2024, 2025];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const [year, setYear] = useState(currentYear);

    let { revenues } = useSelector(state => state.revenue);

    useEffect(() => {
        const date = new Date();
        const currentYear = date.getFullYear();
        dispatch({
            type: revenueAction.GET_REVENUES,
            value: {
                year: currentYear
            }
        });
    }, [dispatch]);

    const onBtnSearchClick = () => {
        dispatch({
            type: revenueAction.GET_REVENUES,
            value: {
                year: year
            }
        });
    }

    const formatMoney = (value) => {
        if(value){
            return value.toLocaleString("vi-VN"); // "11.360.000"
        }else return 0;
    }
     
    return <RevenueWrapper >
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
                            {t('menu.revenue')}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            {/* content */}
            <Row>
                <Col lg={12}>
                    <Card >
                        <Card.Header>
                            <Card.Title>{t('revenue.revenue_list')}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs={1}>{t('revenue.year')}</Col>
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
                                        title={t('revenue.search')}> {t('revenue.search')}
                                    </Button>
                                </Col>

                                <Col sm={12}>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th className="center middle">{t('revenue.month')}</th>
                                                <th className="center middle">{t('revenue.exam_service')}</th>
                                                <th className="center middle">{t('revenue.exam_equipment')}</th>
                                                <th className="center middle">{t('revenue.treat_service')}</th>
                                                <th className="center middle">{t('revenue.treat_equipment')}</th>
                                                <th className="center middle">{t('revenue.medicine')}</th>
                                                <th className="center middle">{t('revenue.total')}</th>
                                                {/* <th className="center middle">{t('revenue.action')}</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {revenues.map((revenue) => {
                                                return <tr key={revenue.Thang}>
                                                    <td className="center middle">{t('revenue.month')} {revenue.Thang}</td>
                                                    <td className="center middle">{formatMoney(revenue.DoanhThu_DichVuKB)}</td>
                                                    <td className="center middle">{formatMoney(revenue.DoanhThu_ThietBiKB)}</td>
                                                    <td className="center middle">{formatMoney(revenue.DoanhThu_DichVuCB)}</td>
                                                    <td className="center middle">{formatMoney(revenue.DoanhThu_ThietBiCB)}</td>
                                                    <td className="center middle">{formatMoney(revenue.DoanhThu_Thuoc)}</td>
                                                    <td className="center middle">{formatMoney(revenue.TongDoanhThu)}</td>
                                                    {/* <td className="center middle">
                                                        <Button variant="success" 
                                                            title={t('revenue.detail')}>
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
                                        {/* {t('app.showing')} 1 {t('app.to')} 10 {t('app.of')} 57 {t('revenue.revenue')} */}
                                        {t('app.showing')} {revenues.length} {t('revenue.revenue')}
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
    </RevenueWrapper>;
}

export default RevenuesScreen;