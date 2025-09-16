
const Urls = {
    //no require login
    REGISTER: '/register',
    LOGIN: '/log-in',
    LOGOUT: '/lod-out',

    //required login
    HOME: '/',
    USER: '/user',
    PROFILE: '/user/profile',
    CHANGE_PASSWORD: '/user/change-password',
    CHANGE_USERNAME: '/user/change-user-name',
    SETTING: '/setting',

    EXAMINATION: '/kham-chua-benh/kham-benh',
    TREATMENT: '/kham-chua-benh/chua-benh',
    MEDICAL_RECORD: '/kham-chua-benh/ho-so-benh-an',
    DOCTOR_SALARY: '/phong-kham/luong-bac-sy',
    NURSE_SALARY: '/phong-kham/luong-y-ta',
    REVENUE: '/phong-kham/doanh-thu',
    DISEASE_STATISTIC: '/phong-kham/thong-ke-benh',

    DOCTOR: '/danh-muc/bac-sy',
    NURSE: '/danh-muc/y-ta',
    MEDICINE: '/danh-muc/thuoc',
    PATIENT: '/danh-muc/benh-nhan',
    DISEASE: '/danh-muc/benh',
    SERVICE: '/danh-muc/dich-vu',
    EQUIQMENT: '/danh-muc/thiet-bi',
    DEPARTMENT: '/danh-muc/khoa',
    
    SYSTEM: '/system',
    FUNCTION: 'system/function',
    ROLE: '/system/role',
    ACCOUNTS: '/system/accounts',
};
export default Urls;