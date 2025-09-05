import appReducer from "./app.reducer";
import userReducer from "./user.reducer";
import sidebarReducer from "./sidebar.reducer";

import doctorReducer from "./doctor.reducer";
import nurseReducer from "./nurse.reducer";
import medicineReducer from "./medicine.reducer";
import departmentReducer from "./department.reducer";
import equiqmentReducer from "./equiqment.reducer";
import serviceReducer from "./service.reducer";
import patientReducer from "./patient.reducer";
import diseaseReducer from "./disease.reducer";

const reducers = {
    app: appReducer,
    user: userReducer,
    sidebar: sidebarReducer,
    
    doctor: doctorReducer,
    nurse: nurseReducer,
    medicine: medicineReducer,
    department: departmentReducer,
    equiqment: equiqmentReducer,
    service: serviceReducer,
    patient: patientReducer,
    disease: diseaseReducer,
};

export default reducers;