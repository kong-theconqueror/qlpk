import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Card, Table, Image, Badge, Button } from "react-bootstrap";
// import Pagging from "../../components/table/pagging.component";
import { diseaseAction } from '../../actions';

import Urls from '../../constants/urls.constant';
import { DiseaseWrapper } from './disease.style';

const DiseasesScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    let { diseases, page, totalPage } = useSelector(state => state.disease);

    useEffect(() => {
        dispatch({
            type: diseaseAction.GET_DISEASES,
        });
    }, [dispatch]);

    const onBtnPageClick = (page) => {
        dispatch({
            type: diseaseAction.PAGE_CHANGE,
            value: page
        });
    }
     
    return <DiseaseWrapper >
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
                            {t('menu.disease')}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            {/* content */}
            <Row>
                <Col lg={12}>
                    <Card >
                        <Card.Header>
                            <Card.Title>{t('disease.disease_list')}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col sm={12}>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th className="center middle">#</th>
                                                <th className="center middle">{t('disease.full_name')}</th>
                                                <th className="center middle">{t('disease.gender')}</th>
                                                <th className="center middle">{t('disease.room')}</th>
                                                <th className="center middle">{t('disease.years_of_experience')}</th>
                                                <th className="center middle">{t('disease.title')}</th>
                                                <th className="center middle">{t('disease.salary_coefficient')}</th>
                                                <th className="center middle">{t('disease.specialty')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {diseases.map((disease) => {
                                                return <tr key={disease.id}>
                                                    <td className="center middle">{disease.id}</td>
                                                    <td className="center middle">{disease.full_name}</td>
                                                    <td className="center middle">{disease.gender}</td>
                                                    <td className="center middle">{disease.room}</td>
                                                    <td className="center middle">{disease.years_of_experience}</td>
                                                    <td className="center middle">{disease.title}</td>
                                                    <td className="center middle">{disease.salary_coefficient}</td>
                                                    <td className="center middle">{disease.specialty}</td>
                                                    <td className="center middle">
                                                        <Button variant="success" title={t('disease.info')}>
                                                            <i className="fa fa-info" aria-hidden="true"></i>
                                                        </Button>
                                                        <Button variant="primary" title={t('disease.update')}>
                                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                                        </Button>
                                                        <Button variant="danger" title={t('disease.delete')}>
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
                                        {/* {t('app.showing')} 1 {t('app.to')} 10 {t('app.of')} 57 {t('disease.disease')} */}
                                        {t('app.showing')} {diseases.length} {t('disease.disease')}
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
    </DiseaseWrapper>;
}

export default DiseasesScreen;