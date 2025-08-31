import appReducer from "./app.reducer";
import userReducer from "./user.reducer";
import sidebarReducer from "./sidebar.reducer";

import doctorReducer from "./doctor.reducer";

const reducers = {
    app: appReducer,
    user: userReducer,
    sidebar: sidebarReducer,
    
    doctor: doctorReducer,
};

export default reducers;