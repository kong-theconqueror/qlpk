import React from "react";
import { Switch, Route } from "react-router-dom";
import Urls from '../constants/urls.constant';

import DoctorScreen from "../screens/doctor/doctor.screen";
import NurseScreen from "../screens/nurse/nurse.screen";
import PatientScreen from "../screens/patient/patient.screen";
import DiseaseScreen from "../screens/disease/disease.screen";
import DepartmentScreen from "../screens/department/department.screen";
import MedicineScreen from "../screens/medicine/medicine.screen";
import EquipmentScreen from "../screens/equipment/equipment.screen";
import ServiceScreen from "../screens/service/service.screen";

import SalarysScreen from "../screens/salary/salary.screen";

const HomeRoutes = () => {
    return (
        <Switch>
            <Route exact path="/" component={DoctorScreen} />
            <Route path={Urls.DOCTOR} component={DoctorScreen} />
            <Route path={Urls.NURSE} component={NurseScreen} />
            <Route path={Urls.PATIENT} component={PatientScreen} />
            <Route path={Urls.DISEASE} component={DiseaseScreen} />
            <Route path={Urls.DEPARTMENT} component={DepartmentScreen} />
            <Route path={Urls.MEDICINE} component={MedicineScreen} />
            <Route path={Urls.EQUIQMENT} component={EquipmentScreen} />
            <Route path={Urls.SERVICE} component={ServiceScreen} />

            <Route path={Urls.SALARY} component={SalarysScreen} />
            
        </Switch>
    );
}

export default HomeRoutes;