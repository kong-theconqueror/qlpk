import appReducer from "./app.reducer";
import userReducer from "./user.reducer";
import sidebarReducer from "./sidebar.reducer";

import examinationReducer from "./examination.reducer";

import doctorReducer from "./doctor.reducer";
import nurseReducer from "./nurse.reducer";
import medicineReducer from "./medicine.reducer";
import departmentReducer from "./department.reducer";
import equipmentReducer from "./equipment.reducer";
import serviceReducer from "./service.reducer";
import patientReducer from "./patient.reducer";
import diseaseReducer from "./disease.reducer";

import nurseSalaryReducer from "./nurseSalary.reducer";
import doctorSalaryReducer from "./doctorSalary.reducer";
import revenueReducer from "./revenue.reducer";
import diseaseStatisticReducer from "./diseaseStatistic.reducer";

const reducers = {
    app: appReducer,
    user: userReducer,
    sidebar: sidebarReducer,
    
    examination:examinationReducer,
    patient: patientReducer,

    doctor: doctorReducer,
    nurse: nurseReducer,
    medicine: medicineReducer,
    department: departmentReducer,
    equipment: equipmentReducer,
    service: serviceReducer,
    disease: diseaseReducer,

    doctorSalary: doctorSalaryReducer,
    nurseSalary: nurseSalaryReducer,
    revenue: revenueReducer,
    diseaseStatistic: diseaseStatisticReducer,
};

export default reducers;