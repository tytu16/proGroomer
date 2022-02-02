import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonInput, IonRow } from "@ionic/react";
import { useForm } from "react-hook-form";
import CustomField from "../../components/InputFields/CustomInput";
import { Profile } from "../../models/Profile";
import "./Login.scss";

interface LoginPageProps{
    onLogin: Function
}

function LoginPage(props: LoginPageProps) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {email: "", password: ""}
    });

    const onLogin = async (data: any) => {
        console.log('login submitted: ');
        console.log(data);
        props.onLogin(data)
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
                                <CustomField register={register} error={errors.email} name="email"
                                    required={true} placeholder="email address"></CustomField>
                                <CustomField register={register} error={errors.password} name="password"
                                    required={true} placeholder="password"></CustomField>
                            </IonCardContent>
                            <IonFooter>
                                <IonRow className="ion-justify-content-center">
                                    <IonButton color="primary" onClick={handleSubmit(onLogin)}> Login</IonButton>
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