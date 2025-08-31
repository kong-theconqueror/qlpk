import { toast } from 'react-toastify';
import i18n from '../i18n';

const defaultConfig = {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
};

export const infoNotifiaction = (message, ...props) => {
    toast.info(i18n.t(message), {
        ...defaultConfig,
        ...props
    });
}

export const successNotification = (message, ...props) => {
    toast.success(i18n.t(message), {
        ...defaultConfig,
        ...props
    });
}

export const warningNotification = (message, ...props) => {
    toast.warn(i18n.t(message), {
        ...defaultConfig,
        ...props
    });
}

export const errorNotification = (message, ...props) => {
    toast.error(i18n.t(message), {
        ...defaultConfig,
        ...props
    });
}

export const clearNotifications = () => {
    toast.dismiss();
}