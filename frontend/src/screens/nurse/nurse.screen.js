import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Card, Table, Button } from "react-bootstrap";
// import Pagging from "../../components/table/pagging.component";
import { nurseAction } from '../../actions';

import Urls from '../../constants/urls.constant';
import { NurseWrapper } from './nurse.style';

const NursesScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    let { nurses } = useSelector(state => state.nurse);

    useEffect(() => {
        dispatch({
            type: nurseAction.GET_NURSES,
        });
    }, [dispatch]);
     
    return <NurseWrapper >
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
                            {t('menu.nurse')}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            {/* content */}
            <Row>
                <Col lg={12}>
                    <Card >
                        <Card.Header>
                            <Card.Title>{t('nurse.nurse_list')}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col sm={12}>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th className="center middle">#</th>
                                                <th className="center middle">{t('nurse.full_name')}</th>
                                                <th className="center middle">{t('nurse.gender')}</th>
                                                <th className="center middle">{t('nurse.years_of_experience')}</th>
                                                <th className="center middle">{t('nurse.title')}</th>
                                                <th className="center middle">{t('nurse.salary_coefficient')}</th>
                                                <th className="center middle">{t('nurse.action')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {nurses.map((nurse) => {
                                                return <tr key={nurse.MaYT}>
                                                    <td className="center middle">{nurse.MaYT}</td>
                                                    <td className="center middle">{nurse.TenYT}</td>
                                                    <td className="center middle">{nurse.GioiTinh}</td>
                                                    <td className="center middle">{nurse.NamKinhNghiem}</td>
                                                    <td className="center middle">{nurse.BoPhan}</td>
                                                    <td className="center middle">{nurse.HeSoLuong}</td>
                                                    <td className="center middle">
                                                        <Button variant="primary" title={t('nurse.update')}>
                                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                                        </Button>
                                                        <Button variant="danger" title={t('nurse.delete')}>
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
                                        {/* {t('app.showing')} 1 {t('app.to')} 10 {t('app.of')} 57 {t('nurse.nurse')} */}
                                        {t('app.showing')} {nurses.length} {t('nurse.nurse')}
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
    </NurseWrapper>;
}

export default NursesScreen;