import { IonButton, IonCol, IonGrid, IonItem, IonList, IonRow  } from "@ionic/react";
import { useFormContext } from "react-hook-form";
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

    const toHumans = (data: any) => {
        console.log('to humans');
        console.log(data);
        const newFamily = new FamilyInfo(data);
        // newFamily.id = props.index;
        props.toHumanInfo(newFamily);
    }

    return (
        <IonGrid class="ion-justify-content-center ion-align-items-center ion-align-self-center">
            <IonRow class="spacer"></IonRow>
                <IonRow>
                    <IonCol size="10" className="slide-content">
                        <h1>Family Information</h1>
                        <IonList>
                        {
                            FamilyQuestionFields.map((field: TextFieldPropInterface, index) => {

                                return (field.fieldName != 'addressState') ? (
                                    <IonItem key={index}><MyTextInput index={props.index}
                                        placeholder={field.placeholder} label={field.label} 
                                        objectType={field.objectType} fieldName={field.fieldName} required={field.required}
                                    /></IonItem>                               
                                ) : (
                                    <IonItem key={index}><MySelectList index={props.index} valueList={StateList}
                                        placeholder={field.placeholder} label={field.label} 
                                        objectType={field.objectType} fieldName={field.fieldName} required={field.required}
                                    /></IonItem>
                                );
                            })
                        }
                        </IonList>
                        <IonRow>
                    <IonCol size="1"></IonCol>
                    <IonCol>
                        <IonButton class="top-button" expand="block" type="submit" onClick={handleSubmit(toHumans)}>Humans &gt;</IonButton>
                    </IonCol>
                    <IonCol size="1"></IonCol>
                </IonRow>                       
                    </IonCol>
                </IonRow>
            <IonRow class="spacer"></IonRow>
        </IonGrid>
    );
};

export default FamilyQuestions;