import React from "react";
import { Switch, Route } from "react-router-dom";
import Urls from '../constants/urls.constant';

import DoctorScreen from "../screens/doctor/doctor.screen";

const HomeRoutes = () => {
    return (
        <Switch>
            <Route exact path="/" component={DoctorScreen} />
            <Route path={Urls.DOCTOR} component={DoctorScreen} />
        </Switch>
    );
}

export default HomeRoutes;