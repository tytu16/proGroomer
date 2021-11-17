import { IonButton, IonCol, IonGrid, IonInput, IonRow, IonText } from "@ionic/react";
import {useForm } from 'react-hook-form'

import './CreateFamily.css'; 
import { FamilyInfo } from "../../models/FamilyInfo";
import { HumanInfo } from "../../models/HumanInfo";
import { useHistory } from "react-router";

export interface CreateFamilyProps {
    onCreateFamily: (family: FamilyInfo) => void,
    index: number
}

export interface CreateFamilyState {
    familyName: string
}

const CreateFamily = (props: CreateFamilyProps) => {
    const { onCreateFamily, index } = props;
    const history  = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onTouched",
        reValidateMode: "onChange"
    });

    const onSubmit = (data: any) => {
        console.log(data);
        let newHuman: HumanInfo = new HumanInfo({
            firstName: data.firstName,
            lastName:  data.lastName,
        })
        let newFamily = new FamilyInfo({
            familyName: data.familyName,
            humans: [newHuman],
            id: index+1
        })
        onCreateFamily(newFamily);
        history.goBack();
    }

    return (
        <IonGrid>
            <IonRow>
                <IonCol>
                    <h1>Creating a Family</h1>
                    <p>creating la fambam</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <IonInput class="input-field" placeholder="Family Name" {...register("familyName", {required: true})} />
                        <IonInput class="input-field" placeholder="Human's first name" {...register("firstName", {required: true})} />
                        <IonInput class="input-field" placeholder="Human's last name" {...register("lastName", {required: true})} />
                        <IonButton type="submit">Submit Family</IonButton>
                    </form>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
}

export default CreateFamily;