import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Row, Col } from "react-bootstrap";
import { Modal, Form, Button, Card, Table} from "react-bootstrap";
import { medicalRecordAction } from '../../actions'
import { DetailMedicalRecordModalWrapper } from "./medicalRecord.style";

const DetailMedicalRecordModal = ({ isShow }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    
    let { selectedMedicalRecord, examination, treatments } = useSelector(state => state.medicalRecord);

    useEffect(() => {
        if(selectedMedicalRecord.MaBA){
            dispatch({
                type: medicalRecordAction.GET_EXAM_DETAIL,
                value: selectedMedicalRecord.MaBA,
            });
        }
    }, [dispatch, selectedMedicalRecord]);

   
    const handleClose = () => {
        dispatch({
            type: medicalRecordAction.HIDE_DETAIL_MEDICAL_RECORD_MODAL,
        });
    }

    const str2date = (str) => {
        const date = new Date(str);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // tháng bắt đầu từ 0
        const year = date.getFullYear();

        const formatted = `${day}-${month}-${year}`;
        console.log(formatted); // đd-mm-yyyy
        return formatted;
    }

    const str2array = (str) => {
        if(str){
            console.log(str)
            return str.split("|").map(item => {
                // Bỏ khoảng trắng thừa và dấu {}
                const clean = item.replace(/[{}]/g, "").trim();

                // Tách thành cặp key:value
                const parts = clean.split(",").map(p => p.trim());

                // Convert sang object
                const obj = {};
                parts.forEach(p => {
                    let [key, value] = p.split(":");

                    key = key.trim();
                    value = value.trim();

                    // Nếu value là số thì ép sang Number
                    if (!isNaN(value)) {
                    value = Number(value);
                    }

                    obj[key] = value;
                });

                return obj;
                });
        }
        else return [];
    };

    const countTotal = (array) => {
        let total = 0;
        array.forEach(element => {
            total += element.SL * element.Gia;
        });
        return total
    }

    return <DetailMedicalRecordModalWrapper>
        <Modal
            animation={false}
            show={isShow}
            onHide={handleClose}
            dialogClassName="modal-900w" size="xl">
            <Modal.Header closeButton>
                <Modal.Title>{t('medical_record.record_detail')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col lg={12}>
                        <Card.Title>{t('medical_record.general_info')}</Card.Title>
                    </Col>
                    <Col lg={4}>
                        <Form.Label>{t('medical_record.record_id')}: </Form.Label>
                        <Form.Label className="bold">{selectedMedicalRecord.MaBA}</Form.Label>
                    </Col>
                    <Col lg={4}>
                        <Form.Label>{t('medical_record.patient_id')}: </Form.Label>
                        <Form.Label className="bold">{selectedMedicalRecord.MaBN}</Form.Label>
                    </Col>
                    <Col lg={4}>
                        <Form.Label>{t('medical_record.patient')}: </Form.Label>
                        <Form.Label className="bold">{selectedMedicalRecord.TenBN}</Form.Label>
                    </Col>
                    <Col lg={4}>
                        <Form.Label>{t('medical_record.doctor_id')}: </Form.Label>
                        <Form.Label className="bold">{selectedMedicalRecord.MaBS}</Form.Label>
                    </Col>
                    <Col lg={4}>
                        <Form.Label>{t('medical_record.doctor')}: </Form.Label>
                        <Form.Label className="bold">{selectedMedicalRecord.TenBS}</Form.Label>
                    </Col>
                    <Col lg={4}>
                        <Form.Label>{t('medical_record.department')}: </Form.Label>
                        <Form.Label className="bold">{selectedMedicalRecord.TenKhoa}</Form.Label>
                    </Col>
                    <Col lg={4}>
                        <Form.Label>{t('medical_record.disease')}: </Form.Label>
                        <Form.Label className="bold">{selectedMedicalRecord.TenBenh}</Form.Label>
                    </Col>
                    <Col lg={4}>
                        <Form.Label>{t('medical_record.status')}: </Form.Label>
                        <Form.Label className="bold">{selectedMedicalRecord.TrangThai}</Form.Label>
                    </Col>
                    <Col lg={6}>
                        <Form.Label>{t('medical_record.open_time')}: </Form.Label>
                        <Form.Label className="bold">{str2date(selectedMedicalRecord.ThoiGianMo)}</Form.Label>
                    </Col>
                    <Col lg={6}>
                        <Form.Label>{t('medical_record.close_time')}: </Form.Label>
                        <Form.Label className="bold">{str2date(selectedMedicalRecord.ThoiGianKetThuc)}</Form.Label>
                    </Col>
                </Row>
                <hr/>

                <Row>
                    <Col>
                        <Card.Title>{t('medical_record.exam_info')}</Card.Title>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4}>
                        <Form.Label>{t('medical_record.exam_time')}: </Form.Label>
                        <Form.Label className="bold">{examination.ThoiGian}</Form.Label>
                    </Col>
                    <Col lg={4}>
                        <Form.Label>{t('medical_record.disease')}: </Form.Label>
                        <Form.Label className="bold">{examination.TenBenh}</Form.Label>
                    </Col>
                    <Col lg={4}>
                        <Form.Label>{t('medical_record.treatent_predict')}: </Form.Label>
                        <Form.Label className="bold">{examination.SoLanChuaBenhDuDoan}</Form.Label>
                    </Col>
                </Row>
                {/* YTaThamGia */}
                <Row>
                    <Col> 
                        <Card.Title>{t('medical_record.nurses')}</Card.Title>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th className="center middle">#</th>
                                    <th className="center middle">{t('medical_record.nurse_id')}</th>
                                    <th className="center middle">{t('medical_record.full_name')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {str2array(examination.YTaThamGia).map((item, index) => {
                                    return <tr key={index}>
                                        <td className="center middle">{index+1}</td>
                                        <td className="center middle">{item.MaYTa}</td>
                                        <td className="center middle">{item.TenYT}</td>
                                    </tr>
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                {/* DichVuSuDung */}
                <Row>
                    <Col> 
                        <Card.Title>{t('medical_record.services')}</Card.Title>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th className="center middle">#</th>
                                    <th className="center middle">{t('medical_record.service_id')}</th>
                                    <th className="center middle">{t('medical_record.service_name')}</th>
                                    <th className="center middle">{t('medical_record.quantity')}</th>
                                    <th className="center middle">{t('medical_record.price')}</th>
                                    <th className="center middle">{t('medical_record.total')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {str2array(examination.DichVuSuDung).map((item, index) => {
                                    return <tr key={index}>
                                        <td className="center middle">{index+1}</td>
                                        <td className="center middle">{item.MaDV}</td>
                                        <td className="center middle">{item.TenDV}</td>
                                        <td className="center middle">{item.SL}</td>
                                        <td className="center middle">{item.Gia}</td>
                                        <td className="center middle">{item.Gia * item.SL}</td>
                                    </tr>
                                })}
                                <tr>
                                    <td colSpan={5} className="center middle">{t('medical_record.total')}</td>
                                    <td className="center middle">{countTotal(str2array(examination.DichVuSuDung))}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                {/* ThietBiSuDung */}
                <Row>
                    <Col> 
                        <Card.Title>{t('medical_record.equipments')}</Card.Title>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th className="center middle">#</th>
                                    <th className="center middle">{t('medical_record.equipment_id')}</th>
                                    <th className="center middle">{t('medical_record.equipment_name')}</th>
                                    <th className="center middle">{t('medical_record.quantity')}</th>
                                    <th className="center middle">{t('medical_record.price')}</th>
                                    <th className="center middle">{t('medical_record.total')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {str2array(examination.ThietBiSuDung).map((item, index) => {
                                    return <tr key={index}>
                                        <td className="center middle">{index+1}</td>
                                        <td className="center middle">{item.MaThietBi}</td>
                                        <td className="center middle">{item.TenThietBi}</td>
                                        <td className="center middle">{item.SL}</td>
                                        <td className="center middle">{item.Gia}</td>
                                        <td className="center middle">{item.Gia * item.SL}</td>
                                    </tr>
                                })}
                                <tr>
                                    <td colSpan={5} className="center middle">{t('medical_record.total')}</td>
                                    <td className="center middle">{countTotal(str2array(examination.ThietBiSuDung))}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <hr/>
                <Row>
                    <Col>
                        <Card.Title>{t('medical_record.treatment_info')}</Card.Title>
                    </Col>
                </Row>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {t('medical_record.close')}
                </Button>
            </Modal.Footer>
        </Modal>
    </DetailMedicalRecordModalWrapper>
};

export default DetailMedicalRecordModal;