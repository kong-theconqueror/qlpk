import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Card, Table, Button } from "react-bootstrap";
// import Pagging from "../../components/table/pagging.component";
import { departmentAction } from '../../actions';

import Urls from '../../constants/urls.constant';
import { DepartmentWrapper } from './department.style';

const DepartmentsScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    let { departments } = useSelector(state => state.department);

    useEffect(() => {
        dispatch({
            type: departmentAction.GET_DEPARTMENTS,
        });
    }, [dispatch]);
     
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
                                                <th className="center middle">{t('department.name')}</th>
                                                <th className="center middle">{t('department.description')}</th>
                                                <th className="center middle">{t('department.action')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {departments.map((department) => {
                                                return <tr key={department.MaKhoa}>
                                                    <td className="center middle">{department.MaKhoa}</td>
                                                    <td className="center middle">{department.TenKhoa}</td>
                                                    <td className="center middle">{department.MoTa}</td>
                                                    <td className="center middle">
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