import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Card, Table, Image, Badge, Button } from "react-bootstrap";
// import Pagging from "../../components/table/pagging.component";
import { medicineAction } from '../../actions';

import Urls from '../../constants/urls.constant';
import { MedicineWrapper } from './medicine.style';

const MedicinesScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    let { medicines, page, totalPage } = useSelector(state => state.medicine);

    useEffect(() => {
        dispatch({
            type: medicineAction.GET_MEDICINES,
        });
    }, [dispatch]);

    const onBtnPageClick = (page) => {
        dispatch({
            type: medicineAction.PAGE_CHANGE,
            value: page
        });
    }
     
    return <MedicineWrapper >
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
                            {t('menu.medicine')}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            {/* content */}
            <Row>
                <Col lg={12}>
                    <Card >
                        <Card.Header>
                            <Card.Title>{t('medicine.medicine_list')}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col sm={12}>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th className="center middle">#</th>
                                                <th className="center middle">{t('medicine.name')}</th>
                                                <th className="center middle">{t('medicine.description')}</th>
                                                <th className="center middle">{t('medicine.unit')}</th>
                                                <th className="center middle">{t('medicine.unit_price')}</th>
                                                <th className="center middle">{t('medicine.action')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {medicines.map((medicine) => {
                                                return <tr key={medicine.id}>
                                                    <td className="center middle">{medicine.id}</td>
                                                    <td className="center middle">{medicine.name}</td>
                                                    <td className="center middle">{medicine.description}</td>
                                                    <td className="center middle">{medicine.unit}</td>
                                                    <td className="center middle">{medicine.unit_price}</td>
                                                    <td className="center middle">
                                                        <Button variant="success" title={t('medicine.info')}>
                                                            <i className="fa fa-info" aria-hidden="true"></i>
                                                        </Button>
                                                        <Button variant="primary" title={t('medicine.update')}>
                                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                                        </Button>
                                                        <Button variant="danger" title={t('medicine.delete')}>
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
                                        {/* {t('app.showing')} 1 {t('app.to')} 10 {t('app.of')} 57 {t('medicine.medicine')} */}
                                        {t('app.showing')} {medicines.length} {t('medicine.medicine')}
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
    </MedicineWrapper>;
}

export default MedicinesScreen;