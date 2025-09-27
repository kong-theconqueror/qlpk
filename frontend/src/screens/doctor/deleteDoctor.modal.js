import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from "react-bootstrap";
import { doctorAction } from '../../actions'
import { DeleteDoctorModalWrapper } from "./doctor.style";

const DeleteDoctorModal = ({ isShow }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    let { selectedDoctor } = useSelector(state => state.doctor);

    const handleClose = () => {
        dispatch({
            type: doctorAction.HIDE_DELETE_DOCTOR_MODAL,
        });
    }

    const onDeleteBtnClick = () => {
        dispatch({
            type: doctorAction.DELETE_DOCTOR,
            value: selectedDoctor.MaBS,
        })
        handleClose();
    }

    return <DeleteDoctorModalWrapper>
        <Modal
            animation={false}
            show={isShow}
            onHide={handleClose}
            dialogClassName="modal-80w">
            <Modal.Header closeButton>
                <Modal.Title>{t('doctor.delete_doctor')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{t('doctor.delete_question')}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    {t('doctor.cancel')}
                </Button>
                <Button variant="danger" onClick={onDeleteBtnClick}>
                    {t('doctor.delete')}
                </Button>
            </Modal.Footer>
        </Modal>
    </DeleteDoctorModalWrapper>
};

export default DeleteDoctorModal;