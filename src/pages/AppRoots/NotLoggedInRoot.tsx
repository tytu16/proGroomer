import { IonRouterOutlet } from "@ionic/react"
import { Route } from "react-router"

import LoginPage from "../Login/LoginPage";

interface NotLoggedInProps {
    onLogin: Function
}
const NotLoggedInRoot = (props: NotLoggedInProps) => {
    
    return (
        <IonRouterOutlet>
            <Route path="/login">
                <LoginPage onLogin={props.onLogin}></LoginPage>
            </Route>
            <Route path="/createProfile">
                {/* <LoginPage onLogin={props.onLogin}></LoginPage> */}
            </Route>
            <Route path="/forgotPassword">
                {/* <LoginPage onLogin={props.onLogin}></LoginPage> */}
            </Route>
        </IonRouterOutlet>
    )
}

export default NotLoggedInRoot;