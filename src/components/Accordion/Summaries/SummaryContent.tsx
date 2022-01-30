
import { IonButton, IonIcon, IonInput, IonItem, IonText } from "@ionic/react";
import { useFormContext } from "react-hook-form";
import * as _ from "lodash";
import {pencil} from "ionicons/icons";
import { AccountFieldNames, PeopleFieldNames, PetFieldNames } from "../../../pages/CreateAccount/CreateAccountQuestions/QuestionObjects";
import ModalFormWrapper from "../../Modal/ModalFormWrapper";
import "../../InputFields/InputStyling.scss";
import { useState } from "react";

interface SummaryContentProps{
    formName: string,
    fieldIndex: number,
    fieldName?: string
}

const SummaryContent = (props: SummaryContentProps) => {
    const {watch, register} = useFormContext();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const fieldName = props.fieldName ? props.fieldName : "";  
    let fieldValue = watch(props.formName);

    const saveField = () => {
        setIsEdit(!isEdit);
    }
    return (<div>{
            isEdit ? (
                <IonItem>
                    <IonInput {...register(props.formName)} placeholder={props.fieldName}></IonInput>
                    <IonButton onClick={saveField}>Save</IonButton>
                </IonItem>
            ) : (
            <IonItem class={fieldValue ? "" : "empty"} mode='md' lines="none">
                <IonText slot="start" >{fieldValue ? fieldValue : `${fieldName} is empty`}</IonText>
                <IonIcon slot="end" icon={pencil} onClick={()=>setIsEdit(!isEdit)}></IonIcon>
            </IonItem>
            )
        }
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

interface PhoneContentProps {
    formName: string
}

const PhoneContent = (props: PhoneContentProps) => {
    const {watch} = useFormContext();
    const phoneFields = watch(props.formName);
    const prettifyPhone = (phone:string) => {
        return '('+phone.substring(0,3)+') ' + phone.substring(3,6) + ' - ' + phone.substring(6);
    }
    return(<div className="wrapper">
        {
            phoneFields.map((f:any, phoneIndex:number) => {
                return(
                    <IonItem mode='md' lines="none">
                        <IonText slot="start">{prettifyPhone(f.phoneNumber)}</IonText>
                    </IonItem>
                );
            })
        }
    </div>);
}

export const AccountSummaryContent = (props: SummaryContentProps) => {
    const deriveFormName = (fieldName: string) => {
        return (`${props.formName}.${fieldName}`);
    }
    return (<>
        {AccountFieldNames().map((f:string, fieldIndex) => {
            if(!(f.includes("person") || f.includes("pet"))){
                if(f === "note"){
                    return (<NoteContent key={fieldIndex} formName={deriveFormName(f)} noteHeader="AccountNoter"></NoteContent>);
                } else {
                    return (<SummaryContent key={fieldIndex} formName={deriveFormName(f)} fieldName={f} fieldIndex={fieldIndex}></SummaryContent>);
                }
            }
        })}
    </>);
}

export const PeopleSummaryContent = (props: SummaryContentProps) => {
    const {watch} = useFormContext();
    const numPeople = watch(props.formName).length;
    const deriveFormName = (fieldName: string, index: number) => {
        return (`${props.formName}.${index}.${fieldName}`);
    }
    return (<>{ 
        [...Array(numPeople)].map((_,personIndex) => 
            (<div key={personIndex}>
                {PeopleFieldNames().map((f, fieldIndex) => {
                    switch(f){
                        case "note":
                            return (<NoteContent key={fieldIndex} formName={deriveFormName(f,personIndex)} noteHeader="PeopleNoter"/>);

                        case "phone":
                            return (<PhoneContent key={fieldIndex} formName={deriveFormName(f,personIndex)}/>); 

                        case "isPrimary":
                            return;

                        default:
                            return (<SummaryContent key={fieldIndex} formName={deriveFormName(f,personIndex)} 
                                fieldName={f} fieldIndex={fieldIndex}/>);
                    }
                })}
            </div>)
        )}</>);
}

export const PetsSummaryContent = (props: SummaryContentProps) => {
    const deriveFormName = (fieldName: string, index: number) => {
        return (`${props.formName}.${index}.${fieldName}`);
    }
    return (<>
        {PetFieldNames().map((f, fieldIndex) => {
            switch(f){
                case "note":
                    return (<NoteContent key={fieldIndex} formName={deriveFormName(f,0)} noteHeader="PeopleNoter"/>);

                default:
                    return (<SummaryContent key={fieldIndex} formName={deriveFormName(f,0)} fieldName={f} fieldIndex={fieldIndex}></SummaryContent>);
            }
        })}
    </>);
}