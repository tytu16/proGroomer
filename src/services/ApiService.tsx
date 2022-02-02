import axios from 'axios';
import {errorHandler} from './ErrorHandler';
import { Profile } from "../models/Profile";

export const doLogin = async (email: string, password: string) => {
    const headers = {'Content-type': 'application/json;'};
    const body = {email, password};

    const response = await axios.post('http://localhost:3000/login', body);
    console.log(response);
    if(response.status == 200){
        return response.data;
    }
} 