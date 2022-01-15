import { IonButton, IonCol, IonGrid, IonList, IonRow  } from "@ionic/react";
import { useFormContext } from "react-hook-form";
import { FamilyInfo } from "../../../models/FamilyInfo";
import { MyTextInput } from "../../../components/InputFields/MyTextInput";
import { MySelectList } from "../../../components/InputFields/MySelectList";
import { StateList } from "../../../models/Enums/States";
import {FamilyQuestionFields, TextFieldPropInterface} from "./QuestionObjects"
import "./Questions.css"

export interface FamilyQuestionsProps {
    toPeopleInfo: (newFamily: FamilyInfo) => void,
    index: number
}

const FamilyQuestions = (props: FamilyQuestionsProps) => {

    const {handleSubmit} = useFormContext();

    const toPeople = (data: any) => {
        console.log('to persons');
        console.log(data);
        const newFamily = new FamilyInfo(data);
        // newFamily.id = props.index;
        props.toPeopleInfo(newFamily);
    }

    const handleFieldChange = (data: string, name: string) => {
        console.log(`FamilyQuestions: ${name}: ${data}`);
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
                                <MyTextInput key={index} index={props.index}
                                    placeholder={field.placeholder} label={field.label} 
                                    onChange={handleFieldChange} watched={field.watched}
                                    objectType={field.objectType} fieldName={field.fieldName} required={field.required}
                                />                          
                            ) : (
                                <MySelectList key={index} index={props.index} valueList={StateList}
                                    placeholder={field.placeholder} label={field.label} addStyling={true}
                                    objectType={field.objectType} fieldName={field.fieldName} required={field.required}
                                />
                            );
                        })
                    }
                    </IonList>
                    <IonRow>
                        <IonCol size="1"></IonCol>
                        <IonCol>
                            <IonButton class="top-button" expand="block" type="submit" onClick={handleSubmit(toPeople)}>People &gt;</IonButton>
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