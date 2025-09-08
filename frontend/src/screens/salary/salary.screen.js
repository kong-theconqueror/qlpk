import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Card, Table, Button } from "react-bootstrap";
// import Pagging from "../../components/table/pagging.component";
import { salaryAction } from '../../actions';

import Urls from '../../constants/urls.constant';
import { SalaryWrapper } from './salary.style';

const SalarysScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    let { salaries, month, year } = useSelector(state => state.salary);

    useEffect(() => {
        dispatch({
            type: salaryAction.GET_SALARIES,
        });
    }, [dispatch]);

    const onBtnSearchClick = (month, year) => {
        dispatch({
            type: salaryAction.GET_SALARIES,
            value: month
        });
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
                            {t('menu.salary')}
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
                                <Col sm={12}>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th className="center middle">#</th>
                                                <th className="center middle">{t('salary.full_name')}</th>
                                                <th className="center middle">{t('salary.gender')}</th>
                                                <th className="center middle">{t('salary.years_of_experience')}</th>
                                                <th className="center middle">{t('salary.title')}</th>
                                                <th className="center middle">{t('salary.salary_coefficient')}</th>
                                                <th className="center middle">{t('salary.specialty')}</th>
                                                <th className="center middle">{t('salary.action')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {salaries.map((salary) => {
                                                return <tr key={salary.id}>
                                                    <td className="center middle">{salary.id}</td>
                                                    <td className="center middle">{salary.full_name}</td>
                                                    <td className="center middle">{salary.gender}</td>
                                                    <td className="center middle">{salary.years_of_experience}</td>
                                                    <td className="center middle">{salary.title}</td>
                                                    <td className="center middle">{salary.salary_coefficient}</td>
                                                    <td className="center middle">{salary.specialty}</td>
                                                    <td className="center middle">
                                                        <Button variant="success" title={t('salary.info')}>
                                                            <i className="fa fa-info" aria-hidden="true"></i>
                                                        </Button>
                                                        <Button variant="primary" title={t('salary.update')}>
                                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                                        </Button>
                                                        <Button variant="danger" title={t('salary.delete')}>
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