import React from "react";
import { Switch, Route } from "react-router-dom";
import Urls from '../../constants/urls.constant';

import Profile from "./user.profile";
import ChangePassword from "./user.changepassword";

const HomeRoutes = () => {
    return (
        <Switch>
            <Route path={Urls.PROFILE} component={Profile} />
            <Route path={Urls.CHANGE_PASSWORD} component={ChangePassword} />
        </Switch>
    );
}

export default HomeRoutes;