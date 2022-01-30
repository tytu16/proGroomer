import { useState } from "react";
import {Storage} from "@ionic/storage";

export default function useAuthToken(){
    const [token, setToken] = useState<string>();
    const storage = new Storage();
    const tokenKey = 'tokenKey';

    const getToken = async () => {
        const tokenObject = await storage.get(tokenKey);
        const userToken = JSON.parse(tokenObject);
        return userToken?.token;
    }

    const saveToken = (userToken: any) => {
        storage.set(tokenKey,userToken);
        setToken(userToken.token);
    }

    return ({
        setToken: saveToken,
        token
    });
}