import axios from 'axios';
import { Profile } from "../models/Profile";

export const DoLogin = async (email: string, password: string) => {
    const headers = {'Content-type': 'application/json;'};
    const body = {email, password};

    try{
        const response = await axios.post('http://localhost:3000/login');
        return response.data;
    } catch (err) {
        console.log('error');
        console.log(err);
        return false;
    }

    // return axios.post('http://localhost:3000/login', body).then((res) => {
    //     if (res) {
    //         console.log(res.data);
    //         changeProfile(res.data);
    //     } else {
    //         return Promise.reject(res);
    //     }
    // }).then((data) => {
    //     console.log('then')
    //     return Promise.resolve(data);
    // }).catch((error) => {
    //     console.warn('Something went wrong.', error);
    // });
} 