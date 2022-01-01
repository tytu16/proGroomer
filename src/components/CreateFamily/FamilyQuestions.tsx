import { IonButton, IonCol, IonGrid, IonItem, IonList, IonRow  } from "@ionic/react";
import { Controller, useForm } from "react-hook-form";
import { FamilyInfo } from "../../models/FamilyInfo";
import "./Questions.css"
import { MyTextInput } from "../InputFields/MyTextInput";
import { MySelectList } from "../InputFields/MySelectList";
import { StateList } from "../../models/Enums/States";

export interface FamilyQuestionsProps {
    toHumanInfo: (newFamily: FamilyInfo) => void,
    control: any, // form controller
    register: any, // form register
    index: number
}

const FamilyQuestions = (props: FamilyQuestionsProps) => {

    const fakeSubmit = (data: any) => {
        console.log('Family Question submit button');
    };

    const toHumans = (data: any) => {
        console.log('to humans');
        console.log(data);
        const newFamily = new FamilyInfo(data);
        // newFamily.id = props.index;
        props.toHumanInfo(newFamily);
    }

    return (
        <IonGrid class="slide-grid ion-justify-content-center ion-align-items-center ion-align-self-center ion-no-padding">
            <IonRow class="spacer"></IonRow>
                <IonRow>
                    <IonCol size="10" className="slide-content">
                        <h1>Family Information</h1>
                        <MyTextInput index={props.index} register={props.register} 
                            placeholder="First Name" label={"First Name"} 
                            objectType={"test"} fieldName={"firstName"} required={true}/>

                        <MyTextInput index={props.index} register={props.register} 
                            placeholder="Last Name" label={"Last Name"} 
                            objectType={"test"} fieldName={"lastName"} required={true}/>
                    </IonCol>
                </IonRow>
            <IonRow class="spacer"></IonRow>
        </IonGrid>
    );
};

export default FamilyQuestions;