import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Card, Table, Image, Badge, Button } from "react-bootstrap";
// import Pagging from "../../components/table/pagging.component";
import { departmentAction } from '../../actions';

import Urls from '../../constants/urls.constant';
import { DepartmentWrapper } from './department.style';

const DepartmentsScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    let { departments, page, totalPage } = useSelector(state => state.department);

    useEffect(() => {
        dispatch({
            type: departmentAction.GET_DEPARTMENTS,
        });
    }, [dispatch]);

    const onBtnPageClick = (page) => {
        dispatch({
            type: departmentAction.PAGE_CHANGE,
            value: page
        });
    }
     
    return <DepartmentWrapper >
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
                            {t('menu.department')}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            {/* content */}
            <Row>
                <Col lg={12}>
                    <Card >
                        <Card.Header>
                            <Card.Title>{t('department.department_list')}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col sm={12}>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th className="center middle">#</th>
                                                <th className="center middle">{t('department.full_name')}</th>
                                                <th className="center middle">{t('department.gender')}</th>
                                                <th className="center middle">{t('department.room')}</th>
                                                <th className="center middle">{t('department.years_of_experience')}</th>
                                                <th className="center middle">{t('department.title')}</th>
                                                <th className="center middle">{t('department.salary_coefficient')}</th>
                                                <th className="center middle">{t('department.specialty')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {departments.map((department) => {
                                                return <tr key={department.id}>
                                                    <td className="center middle">{department.id}</td>
                                                    <td className="center middle">{department.full_name}</td>
                                                    <td className="center middle">{department.gender}</td>
                                                    <td className="center middle">{department.room}</td>
                                                    <td className="center middle">{department.years_of_experience}</td>
                                                    <td className="center middle">{department.title}</td>
                                                    <td className="center middle">{department.salary_coefficient}</td>
                                                    <td className="center middle">{department.specialty}</td>
                                                    <td className="center middle">
                                                        <Button variant="success" title={t('department.info')}>
                                                            <i className="fa fa-info" aria-hidden="true"></i>
                                                        </Button>
                                                        <Button variant="primary" title={t('department.update')}>
                                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                                        </Button>
                                                        <Button variant="danger" title={t('department.delete')}>
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
                                        {/* {t('app.showing')} 1 {t('app.to')} 10 {t('app.of')} 57 {t('department.department')} */}
                                        {t('app.showing')} {departments.length} {t('department.department')}
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
    </DepartmentWrapper>;
}

export default DepartmentsScreen;