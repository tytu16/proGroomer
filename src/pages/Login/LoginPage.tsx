import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonInput, IonLabel, IonRow } from "@ionic/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "../../components/InputFields/CustomInput";
import { Profile } from "../../models/Profile";
import { doLogin } from "../../services/ApiService";
import { errorHandler } from "../../services/ErrorHandler";
import "./Login.scss";
import "animate.css";

interface LoginPageProps{
    onLogin: Function
}

function LoginPage(props: LoginPageProps) {
    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm({
        defaultValues: {email: "", password: ""}
    });
    const [serverError, setServerError] = useState<any>(null);

    useEffect(() => {
        setServerError(null);
    })

    const onLogin = async (data: any) => {
        console.log('login submitted: ');
        console.log(data);
        setServerError(null);
        try {
            const response = await doLogin(data.email, data.password);
            props.onLogin(response)
        } catch (error) {
            const { errMessage: errorMessage } = errorHandler(error);
            console.log('in login page catch');
            console.log(errorMessage);
            setServerError(errorMessage);
          }
    }

    const onFieldChange = (data: any) => {
        clearErrors(data);
    }

    return (
        <IonContent className="ion-text-center">
            <IonGrid>
                <IonRow className="ion-justify-content-center">
                    <IonCol size="11">
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>Login</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent className="text-center">
                                <CustomInput register={register} error={errors.email} name="email" watched={true}
                                    required={true} placeholder="email address" handleChange={()=>{onFieldChange("email")}}></CustomInput>
                                <CustomInput register={register} error={errors.password} name="password" handleChange={()=>{onFieldChange("password")}}
                                    required={true} placeholder="password"></CustomInput>
                            </IonCardContent>
                            {(serverError && !(errors.email || errors.password)) && <IonLabel className="animate__animated animate__bounceIn" color="danger">
                                {serverError}
                            </IonLabel>}
                            <IonFooter>
                                <IonRow className="ion-justify-content-center">
                                    <IonButton type="submit" color="primary" onClick={handleSubmit(onLogin)}>
                                         Login
                                    </IonButton>
                                    <IonButton color="light" onClick={() => {}}>Forgot Password</IonButton>
                                </IonRow>
                                 <IonRow className="ion-justify-content-center">
                                    <IonButton color="secondary" onClick={() => {}}>Create Account</IonButton>
                                </IonRow>
                            </IonFooter>
                        </IonCard>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    );
}

export default LoginPage;