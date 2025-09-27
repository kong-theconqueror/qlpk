import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Row, Col } from "react-bootstrap";
import { Modal, Form, Button } from "react-bootstrap";
import { doctorAction } from '../../actions'
import { CreateDoctorModalWrapper } from "./doctor.style";

const CreateDoctorModal = ({ isShow }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    
    let { genders, departments } = useSelector(state => state.doctor);

    useEffect(() => {
        dispatch({
            type: doctorAction.GET_DEPARTMENTS,
        });
    }, [dispatch]);

    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [gender, setGender] = useState("Nam");
    const [room, setRoom] = useState("");
    const [salaryCoefficient, setSalaryCoefficient] = useState(0);
    const [yoe, setYoE] = useState(0);
    const [department, setDepartment] = useState("KH-MAT");

    const handleClose = () => {
        dispatch({
            type: doctorAction.HIDE_CREATE_DOCTOR_MODAL,
        });
    }

    const onSaveBtnClick = () => {
        dispatch({
            type: doctorAction.CREATE_DOCTOR,
            value: {
                MaBS: id,
                TenBS: fullName,
                GioiTinh: gender,
                PhongKham: room,
                HeSoLuong: salaryCoefficient,
                NamKinhNghiem: yoe,
                MaKhoa: department,
            }
        })
        handleClose();
    }

    return <CreateDoctorModalWrapper>
        <Modal
            animation={false}
            show={isShow}
            onHide={handleClose}
            dialogClassName="modal-85w">
            <Modal.Header closeButton>
                <Modal.Title>{t('doctor.add_doctor')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>{t('doctor.id')}</Form.Label>
                            <Form.Control
                                type='text'
                                value={id}
                                onChange={(event) => { setId(event.target.value) }} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>{t('doctor.full_name')}</Form.Label>
                            <Form.Control
                                type='text'
                                value={fullName}
                                onChange={(event) => { setFullName(event.target.value) }} />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} >
                            <Form.Label>{t('doctor.gender')}</Form.Label>
                            <Form.Control as="select"
                                value={gender}
                                onChange={(event) => { setGender(event.target.value) }}>
                                {genders.map((_gender) => {
                                    return <option
                                        key={_gender.id}
                                        value={_gender.id}>
                                        {_gender.name}
                                    </option>
                                })}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label>{t('doctor.specialty')}</Form.Label>
                            <Form.Control as="select"
                                value={department}
                                onChange={(event) => { setDepartment(event.target.value) }}>
                                {departments.map((_department) => {
                                    return <option
                                        key={_department.MaKhoa}
                                        value={_department.MaKhoa}>
                                        {_department.TenKhoa}
                                    </option>
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} >
                            <Form.Label>{t('doctor.room')}</Form.Label>
                            <Form.Control
                                type='text'
                                value={room}
                                onChange={(event) => { setRoom(event.target.value) }} />
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label>{t('doctor.years_of_experience')}</Form.Label>
                            <Form.Control
                                type='number'
                                value={yoe}
                                onChange={(event) => { setYoE(event.target.value) }} />
                        </Form.Group>
                        
                        <Form.Group as={Col} >
                            <Form.Label>{t('doctor.salary_coefficient')}</Form.Label>
                            <Form.Control
                                type='number'
                                value={salaryCoefficient}
                                onChange={(event) => { setSalaryCoefficient(event.target.value) }} />
                        </Form.Group>
                    </Row>
                </Form >

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {t('doctor.cancel')}
                </Button>
                <Button variant="primary" onClick={onSaveBtnClick}>
                    {t('doctor.save')}
                </Button>
            </Modal.Footer>
        </Modal>
    </CreateDoctorModalWrapper>
};

export default CreateDoctorModal;