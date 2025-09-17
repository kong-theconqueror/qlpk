import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Row, Col } from "react-bootstrap";
import { Modal, Form, Button } from "react-bootstrap";
// import { FormControl, InputGroup } from 'react-bootstrap';
import { doctorAction } from '../../actions'
import { UpdateDoctorModalWrapper } from "./doctor.style";

const UpdateDoctorModal = ({ isShow }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    let { genders, departments, selectedDoctor } = useSelector(state => state.doctor);

    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [gender, setGender] = useState(1);
    const [room, setRoom] = useState("");
    const [title, setTitle] = useState("");
    const [salaryCoefficient, setSalaryCoefficient] = useState(0);
    const [yoe, setYoE] = useState(0);
    const [department, setDepartment] = useState("");

    useEffect(() => {
        setId(selectedDoctor.id ? selectedDoctor.id : "");
        setFullName(selectedDoctor.full_name ? selectedDoctor.full_name : "");
        setGender(selectedDoctor.gender ? selectedDoctor.gender : -1);
        setRoom(selectedDoctor.room ? selectedDoctor.room : "");
        setTitle(selectedDoctor.title ? selectedDoctor.title : "");
        setSalaryCoefficient(selectedDoctor.salary_coefficient ? selectedDoctor.salary_coefficient : 0);
        setYoE(selectedDoctor.years_of_experience ? selectedDoctor.years_of_experience : 0);
        setDepartment(selectedDoctor.specialty ? selectedDoctor.specialty : "KH-MAT");
    }, [selectedDoctor]);

    const handleClose = () => {
        dispatch({
            type: doctorAction.HIDE_UPDATE_DOCTOR_MODAL,
        });
    }

    const onSaveBtnClick = () => {
        dispatch({
            type: doctorAction.UPDATE_DOCTOR,
            value: {
                id: id,
                full_name: fullName,
                gender: gender,
                room: room,
                title: title,
                salary_coefficient: salaryCoefficient,
                years_of_experience: yoe,
                specialty: department,
            }
        })
        handleClose();
    }

    return <UpdateDoctorModalWrapper>
        <Modal
            animation={false}
            show={isShow}
            onHide={handleClose}
            dialogClassName="modal-80w">
            <Modal.Header closeButton>
                <Modal.Title>{t('doctor.update_doctor')}</Modal.Title>
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
                                    key={_department.ma_khoa}
                                    value={_department.ma_khoa}>
                                    {_department.ten_khoa}
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
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} >
                        <Form.Label>{t('doctor.title')}</Form.Label>
                        <Form.Control
                            type='text'
                            value={title}
                            onChange={(event) => { setTitle(event.target.value) }} />
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
    </UpdateDoctorModalWrapper>
};

export default UpdateDoctorModal;