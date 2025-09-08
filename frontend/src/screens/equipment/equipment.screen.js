import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Card, Table, Button } from "react-bootstrap";
// import Pagging from "../../components/table/pagging.component";
import { equipmentAction } from '../../actions';

import Urls from '../../constants/urls.constant';
import { EquipmentWrapper } from './equipment.style';

const EquipmentsScreen = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    let { equipments } = useSelector(state => state.equipment);

    useEffect(() => {
        dispatch({
            type: equipmentAction.GET_EQUIPMENTS,
        });
    }, [dispatch]);
     
    return <EquipmentWrapper >
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
                            {t('menu.equipment')}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            {/* content */}
            <Row>
                <Col lg={12}>
                    <Card >
                        <Card.Header>
                            <Card.Title>{t('equipment.equipment_list')}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col sm={12}>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th className="center middle">#</th>
                                                <th className="center middle">{t('equipment.name')}</th>
                                                <th className="center middle">{t('equipment.price')}</th>
                                                <th className="center middle">{t('equipment.status')}</th>
                                                <th className="center middle">{t('equipment.action')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {equipments.map((equipment) => {
                                                return <tr key={equipment.id}>
                                                    <td className="center middle">{equipment.id_thiet_bi}</td>
                                                    <td className="center middle">{equipment.ten_thiet_bi}</td>
                                                    <td className="center middle">{equipment.chi_phi_su_dung}</td>
                                                    <td className="center middle">{equipment.trang_thai}</td>
                                                    <td className="center middle">
                                                        <Button variant="success" title={t('equipment.info')}>
                                                            <i className="fa fa-info" aria-hidden="true"></i>
                                                        </Button>
                                                        <Button variant="primary" title={t('equipment.update')}>
                                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                                        </Button>
                                                        <Button variant="danger" title={t('equipment.delete')}>
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
                                        {/* {t('app.showing')} 1 {t('app.to')} 10 {t('app.of')} 57 {t('equipment.equipment')} */}
                                        {t('app.showing')} {equipments.length} {t('equipment.equipment')}
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
    </EquipmentWrapper>;
}

export default EquipmentsScreen;