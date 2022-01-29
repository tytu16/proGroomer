
import { IonContent, IonIcon, IonItem, IonLabel, IonText } from "@ionic/react";
import { useFormContext } from "react-hook-form";
import * as _ from "lodash";
import {pencil} from "ionicons/icons";
import { AccountFieldNames, PeopleFieldNames, PetFieldNames } from "../../../pages/CreateAccount/CreateAccountQuestions/QuestionObjects";
import ModalFormWrapper from "../../Modal/ModalFormWrapper";

interface SummaryContentProps{
    formName: string,
    fieldIndex: number,
    fieldName?: string
}

const SummaryContent = (props: SummaryContentProps) => {
    const {watch} = useFormContext();
    const fieldName = props.fieldName ? props.fieldName : "";  
    let fieldValue = watch(props.formName);
    return (<div>
        <IonItem mode='md' lines="none">
            <IonText slot="start" >{fieldValue ? fieldValue : fieldName}</IonText>
            <IonIcon slot="end" icon={pencil}></IonIcon>
        </IonItem>
    </div>);
}

interface NoteContentProps{
    noteHeader: string,
    formName: string,
}

const NoteContent = (props: NoteContentProps) => {
    return (<ModalFormWrapper key={0} label={props.noteHeader} defaultOn={false}
                formName={props.formName}/>);
}

export const AccountSummaryContent = (props: SummaryContentProps) => {
    const deriveFormName = (fieldName: string) => {
        return (`${props.formName}.${fieldName}`);
    }
    return (<>
        {AccountFieldNames().map((f:string, fieldIndex) => {
            if(!(f.includes("person") || f.includes("pet"))){
                if(f === "note"){
                    return (<NoteContent key={fieldIndex} formName={f} noteHeader="AccountNoter"></NoteContent>);
                } else {
                    return (<SummaryContent key={fieldIndex} formName={deriveFormName(f)} fieldName={f} fieldIndex={fieldIndex}></SummaryContent>);
                }
            }
        })}
    </>);
}

export const PeopleSummaryContent = (props: SummaryContentProps) => {

    const deriveFormName = (fieldName: string, index: number) => {
        return (`${props.formName}.${index}.${fieldName}`);
    }
    return (<>
        {PeopleFieldNames().map((f, fieldIndex) => {
            if(f === "note"){
                return (<NoteContent key={fieldIndex} formName={f} noteHeader="PeopleNoter"></NoteContent>);
            } else if(f === "phone"){
                <IonText>Some good phone shit</IonText>
            } else {
                return (<SummaryContent key={fieldIndex} formName={deriveFormName(f,0)} fieldName={f} fieldIndex={fieldIndex}></SummaryContent>);
            }
        })}
    </>);
}

export const PetsSummaryContent = (props: SummaryContentProps) => {
    const deriveFormName = (fieldName: string, index: number) => {
        return (`${props.formName}.${index}.${fieldName}`);
    }
    return (<>
        {PetFieldNames().map((f, fieldIndex) => {
            if(f === "note"){
                return (<NoteContent key={fieldIndex} formName={f} noteHeader="PetNoter"></NoteContent>);
            } else {
                return (<SummaryContent key={fieldIndex} formName={deriveFormName(f,0)} fieldName={f} fieldIndex={fieldIndex}></SummaryContent>);
            }
        })}
    </>);
}