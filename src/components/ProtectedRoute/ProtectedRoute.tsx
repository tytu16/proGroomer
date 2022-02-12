import { Component } from "react";
import { Redirect, Route } from "react-router";
import useAuthHook from "../../hooks/useAuthHook";
import {AuthLevel} from "../../models/Enums/AuthLevel";

interface ProtectedRouteProps {
    authLevel: string,
    path: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({authLevel, children, path})  => {
    const useLogging = true;
    const {token, isPaid} = useAuthHook();
    if(useLogging){
        console.log('In Protected Route');
        console.log(`token: ${token}`);
        console.log(`is paid: ${isPaid}`);
    }

    const hasToken = () => {
        return (token && token != '');
    }

    const isAuthorized = () => {
        switch((authLevel)) {
            case AuthLevel.Full: {
                return (hasToken() && isPaid);
            }
            case AuthLevel.LN: {
                return (hasToken());
            }
            case AuthLevel.PD: {
                return isPaid;
            }
            default:
                console.log('Defaulting to LoggedIn');
                return (hasToken());
        }
    }

    return (
        <Route path={path} render={() => 
            isAuthorized() ? { children } : <Redirect to="/login" />
        }/>
    );
    
}

export default ProtectedRoute;