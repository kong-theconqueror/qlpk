import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Card, Table, Image, Badge, Button } from "react-bootstrap";
// import Pagging from "../../components/table/pagging.component";
import { equiqmentAction } from '../../actions';

import Urls from '../../constants/urls.constant';
import { EquiqmentWrapper } from './equiqment.style';

const EquiqmentsScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    let { equiqments, page, totalPage } = useSelector(state => state.equiqment);

    useEffect(() => {
        dispatch({
            type: equiqmentAction.GET_EQUIQMENTS,
        });
    }, [dispatch]);

    const onBtnPageClick = (page) => {
        dispatch({
            type: equiqmentAction.PAGE_CHANGE,
            value: page
        });
    }
     
    return <EquiqmentWrapper >
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
                            {t('menu.equiqment')}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            {/* content */}
            <Row>
                <Col lg={12}>
                    <Card >
                        <Card.Header>
                            <Card.Title>{t('equiqment.equiqment_list')}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col sm={12}>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th className="center middle">#</th>
                                                <th className="center middle">{t('equiqment.full_name')}</th>
                                                <th className="center middle">{t('equiqment.gender')}</th>
                                                <th className="center middle">{t('equiqment.room')}</th>
                                                <th className="center middle">{t('equiqment.years_of_experience')}</th>
                                                <th className="center middle">{t('equiqment.title')}</th>
                                                <th className="center middle">{t('equiqment.salary_coefficient')}</th>
                                                <th className="center middle">{t('equiqment.specialty')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {equiqments.map((equiqment) => {
                                                return <tr key={equiqment.id}>
                                                    <td className="center middle">{equiqment.id}</td>
                                                    <td className="center middle">{equiqment.full_name}</td>
                                                    <td className="center middle">{equiqment.gender}</td>
                                                    <td className="center middle">{equiqment.room}</td>
                                                    <td className="center middle">{equiqment.years_of_experience}</td>
                                                    <td className="center middle">{equiqment.title}</td>
                                                    <td className="center middle">{equiqment.salary_coefficient}</td>
                                                    <td className="center middle">{equiqment.specialty}</td>
                                                    <td className="center middle">
                                                        <Button variant="success" title={t('equiqment.info')}>
                                                            <i className="fa fa-info" aria-hidden="true"></i>
                                                        </Button>
                                                        <Button variant="primary" title={t('equiqment.update')}>
                                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                                        </Button>
                                                        <Button variant="danger" title={t('equiqment.delete')}>
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
                                        {/* {t('app.showing')} 1 {t('app.to')} 10 {t('app.of')} 57 {t('equiqment.equiqment')} */}
                                        {t('app.showing')} {equiqments.length} {t('equiqment.equiqment')}
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
    </EquiqmentWrapper>;
}

export default EquiqmentsScreen;