import { IonButton, IonCol, IonGrid, IonInput, IonRow, IonText } from "@ionic/react";
import BaseFamily from "../../models/baseFamily";
import {useForm } from 'react-hook-form'

import './CreateFamily.css'; 

export interface CreateFamilyProps {
    onCreateFamily: (family: BaseFamily) => void,
    index: number
}

export interface CreateFamilyState {
    familyName: string
}

const CreateFamily = (props: CreateFamilyProps) => {
    const { onCreateFamily, index } = props;
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onTouched",
        reValidateMode: "onChange"
    });

    const onSubmit = (data: any) => {
        console.log(data);
        let newFamily = new BaseFamily({
            familyName: data.familyName,
            id: index+1
        })
        onCreateFamily(newFamily);
    }

    return (
        <IonGrid>
            <IonRow>
                <IonCol>
                    <h1>Creating a Family</h1>
                    <p>creating la fambam</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <IonInput class="input-field" placeholder="Family Name" {...register("familyName", {required: true})} />
                        <IonButton type="submit" routerLink="/families">Submit Family</IonButton>
                    </form>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
}

export default CreateFamily;