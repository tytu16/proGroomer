
import { IonButton, IonIcon, IonInput, IonItem, IonText } from "@ionic/react";
import { useForm, useFormContext } from "react-hook-form";
import * as _ from "lodash";
import {pencil} from "ionicons/icons";
import { AccountFieldNames, PeopleFieldNames, PetFieldNames } from "../../../pages/CreateAccount/CreateAccountQuestions/QuestionObjects";
import ModalFormWrapper from "../../Modal/ModalFormWrapper";
import "../../InputFields/InputStyling.scss";
import { useState } from "react";

interface SummaryContentProps{
    formName: string,
    fieldIndex: number,
    fieldName?: string,
    isSubmitted: boolean
}

interface EditIconProps{
    isSubmitted: boolean,
    isEdit: boolean,
    setIsEdit: Function,
}
const EditIcon = (props: EditIconProps) => {
    const {isSubmitted, isEdit, setIsEdit} = props;
    return (<>{ !isSubmitted && <IonIcon slot="end" icon={pencil} onClick={()=>setIsEdit(!isEdit)}></IonIcon>}</>);
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
                <EditIcon isSubmitted={props.isSubmitted} isEdit={isEdit} setIsEdit={setIsEdit}></EditIcon>
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

export const AccountSummaryContent = (props: SummaryContentProps) => {
    const {watch} = useFormContext();
    const deriveFormName = (fieldName: string) => {
        return (`${props.formName}.${fieldName}`);
    }
    let noteHeader = watch(`account.${props.fieldIndex}.accountName`);
    return (<>
        {AccountFieldNames().map((f:string, fieldIndex) => {
            if(!(f.includes("person") || f.includes("pet"))){
                if(f === "note"){
                    return (<NoteContent key={fieldIndex} formName={deriveFormName(f)} noteHeader={noteHeader}></NoteContent>);
                } else {
                    return (<SummaryContent isSubmitted={props.isSubmitted} key={fieldIndex} formName={deriveFormName(f)} fieldName={f} fieldIndex={fieldIndex}></SummaryContent>);
                }
            }
        })}
    </>);
}

// People Stuff //

interface PhoneContentProps {
    formName: string,
    isSubmitted: boolean
}

const PhoneContent = (props: PhoneContentProps) => {
    const {watch} = useFormContext();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const phoneFields = watch(props.formName);
    return(<div className="wrapper">
        {
            phoneFields.map((f:any, phoneIndex:number) => {
                return(
                    <IonItem key={phoneIndex} mode='md' lines='none'>
                        <IonText slot="start">{`${f.phoneNumber} : ${f.phoneType}`}</IonText>
                        <EditIcon isSubmitted={props.isSubmitted} isEdit={isEdit} setIsEdit={setIsEdit}></EditIcon>
                    </IonItem>
                );
            })
        }
    </div>);
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
                            return (<NoteContent key={fieldIndex} formName={deriveFormName(f,personIndex)} 
                                noteHeader="person"/>);

                        case "phone":
                            return (<PhoneContent key={fieldIndex} isSubmitted={props.isSubmitted} formName={deriveFormName(f,personIndex)}/>); 

                        case "isPrimary":
                            return;

                        default:
                            return (<SummaryContent key={fieldIndex} formName={deriveFormName(f,personIndex)} 
                                fieldName={f} fieldIndex={fieldIndex} isSubmitted={props.isSubmitted}/>);
                    }
                })}
            </div>)
        )}</>);
}

// Pet stuff //

const AgeContent = (props: SummaryContentProps) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const {watch, register} = useFormContext();
    const ageYr = watch(props.formName+'ageYr');
    const ageMn = watch(props.formName+'ageMn');
    let yr = "";
    if (ageYr === '1'){
        yr = `${ageYr} yr`;
    } else if(ageYr != '0') {
        yr = `${ageYr} yrs`;
    }

    let mn = "";
    if (ageMn === '1'){
        mn = `${ageMn} month`;
    } else if(ageMn != '0'){
        mn = `${ageMn} months`;
    }

    let age = "";
    if(yr!='' && mn!=''){
        age = yr + ' and ' + mn + ' old';
    } else if(yr!=''){
        age = yr + ' old';
    } else {
        age = mn + ' old';
    }

    const saveField = () => {
        setIsEdit(!isEdit);
    }
    return(<div>{
            isEdit ? (
                <IonItem>
                    <IonInput {...register(props.formName+'ageYr')} placeholder="years" slot="start"></IonInput>
                    <IonInput {...register(props.formName+'ageMn')} placeholder="months" slot="end"></IonInput>
                    <IonButton onClick={saveField}>Save</IonButton>
                </IonItem>
            ) : (
                <IonItem mode='md' lines="none">
                    <IonText slot="start">{age}</IonText>
                    <EditIcon isSubmitted={props.isSubmitted} isEdit={isEdit} setIsEdit={setIsEdit}></EditIcon>
                </IonItem>
            )
        }
    </div>);
}

const WeightContent = (props: SummaryContentProps) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const {watch, register} = useFormContext();
    const weight = watch(props.formName+'weight');
    const units = watch(props.formName+'wUnits');

    const weightString = weight === '1' ? weight + " " + units : weight + " " + units+"s";
    return (
        <IonItem mode='md' lines="none">
            <IonText slot="start">{weightString}</IonText>
            <EditIcon isSubmitted={props.isSubmitted} isEdit={isEdit} setIsEdit={setIsEdit}></EditIcon>
        </IonItem>
    );
}

export const PetsSummaryContent = (props: SummaryContentProps) => {
    const deriveFormName = (fieldName: string, index: number) => {
        return (`${props.formName}.${index}.${fieldName}`);
    }
    return (<>
        {PetFieldNames().map((f, fieldIndex) => {
            switch(f){
                case "note":
                    return (<NoteContent key={fieldIndex} formName={deriveFormName(f,0)} noteHeader="Pet"/>);
                case "ageYr":
                    return;
                case "ageMn":
                    return (
                        <AgeContent isSubmitted={props.isSubmitted} key={fieldIndex} fieldIndex={0} formName={`${props.formName}.${0}.`}></AgeContent>
                    );

                case "wUnits":
                    return;
                case "weight":
                    return (
                        <WeightContent isSubmitted={props.isSubmitted} key={fieldIndex} fieldIndex={0} formName={`${props.formName}.${0}.`}></WeightContent>
                    );

                default:
                    return (<SummaryContent isSubmitted={props.isSubmitted} key={fieldIndex} formName={deriveFormName(f,0)} fieldName={f} fieldIndex={fieldIndex}></SummaryContent>);
            }
        })}
    </>);
}