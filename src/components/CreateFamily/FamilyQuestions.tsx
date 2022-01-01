import { IonButton, IonCol, IonGrid, IonItem, IonList, IonRow  } from "@ionic/react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { FamilyInfo } from "../../models/FamilyInfo";
import "./Questions.css"
import { MyTextInput } from "../InputFields/MyTextInput";
import { MySelectList } from "../InputFields/MySelectList";
import { StateList } from "../../models/Enums/States";
import {FamilyQuestionFields, TextFieldPropInterface} from "./QuestionProps/InputProperties"

export interface FamilyQuestionsProps {
    toHumanInfo: (newFamily: FamilyInfo) => void,
    index: number
}

const FamilyQuestions = (props: FamilyQuestionsProps) => {

    const {handleSubmit} = useFormContext();

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
                        {
                            FamilyQuestionFields.map((field: TextFieldPropInterface, index) => {

                                return (field.fieldName != 'addressState') ? (
                                    <MyTextInput index={props.index}
                                        placeholder={field.placeholder} label={field.label} 
                                        objectType={field.objectType} fieldName={field.fieldName} required={field.required}
                                    />
                                ) : (
                                    <MySelectList index={props.index} valueList={StateList}
                                        placeholder={field.placeholder} label={field.label} 
                                        objectType={field.objectType} fieldName={field.fieldName} required={field.required}/>
                                );
                            })
                        }
                    </IonCol>
                    <IonButton class="top-button" type="submit" onClick={handleSubmit(toHumans)}>Next</IonButton>
                </IonRow>
            <IonRow class="spacer"></IonRow>
        </IonGrid>
    );
};

export default FamilyQuestions;