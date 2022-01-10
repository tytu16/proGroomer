import { IonButton, IonCol, IonGrid, IonItem, IonList, IonRow, IonLabel, IonAccordionGroup, IonAccordion, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions } from "@ionic/react";
import { useRef, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import "./Questions.css";
import {MyTextInput} from "../InputFields/MyTextInput";
import { HumanQuestionFields, InitHumanQuestionState, TextFieldPropInterface } from "./QuestionProps/InputProperties";
import {PhoneFieldInput} from "../InputFields/PhoneField";
import {MyCheckBox} from "../InputFields/MyCheckBox";

import 'swiper/swiper.min.css';
import '@ionic/react/css/ionic-swiper.css';

export interface HumanQuestionsProps {
    index: number,
    toPetInfo: () => void,
    toFamilyInfo: () => void
}

export interface WatchedFieldsInter {
    firstName: string,
    lastName: string,
    isPrimary: boolean
}

// Use checked state to allow only one primary checkbox at a time
const HumanQuestions = (props: HumanQuestionsProps) => {

    const {control, handleSubmit, register, watch, setValue} = useFormContext();
    const objectType = `family.${props.index}.human`;
    const { fields, append, remove, replace} = useFieldArray({
        control,
        name: objectType,
    });

    const [watchedFields, setWatchedFields] = useState<Array<WatchedFieldsInter>>([{
        firstName: "", lastName: "", isPrimary: true
    }]);
    const [primaryIndex, setPrimaryIndex] = useState<number>(0);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    
    const renderField = (field: any, questionIndex:number, fieldArrayIndex:number) => {
        switch (field.fieldName){
            case 'phoneNumber':
                return (
                    <IonItem key={questionIndex}>
                        <PhoneFieldInput index={fieldArrayIndex}
                            placeholder={field.placeholder} label={field.label} 
                            objectType={objectType} fieldName={field.fieldName}
                        />
                    </IonItem>
                );

            case 'isPrimary':
                return (
                    <MyCheckBox key={questionIndex} index={fieldArrayIndex}
                        onChange={handleCheckBoxChange} watched={field.watched}
                        label={field.label} objectType={objectType}
                        fieldName={field.fieldName} required={field.required} />
                );

            default:
                return  (
                    <IonItem key={questionIndex}>
                        <MyTextInput index={fieldArrayIndex} 
                            onChange={handleFieldChange} watched={field.watched}
                            placeholder={field.placeholder} label={field.label}
                            objectType={objectType} fieldName={field.fieldName} required={field.required}
                        />
                    </IonItem>                               
                );
        }
    }

   const handleFieldChange = (data: string, name: string) => {
        console.log(`HumansQuestions: ${name}: ${data}`);

        // family.0.human.0.firstName
        let newFields = watchedFields.slice();
        const nameParse = name.split('.');
        const index = Number.parseInt(nameParse[3]);
        const fieldName = nameParse[4];
        let thisField = watchedFields[index];
        if(fieldName === 'firstName'){
            thisField.firstName = data;
        } else if (fieldName === 'lastName'){
            thisField.lastName = data;
        }
        newFields[index] = thisField;
        setWatchedFields(newFields);
    }

    const handleCheckBoxChange = (data: boolean, index: number) => {
        console.log(index);
        console.log(data);
        for(let i=0; i<watchedFields.length; i++){
            if(i != index){
                setValue(`${objectType}.${i}.isPrimary`, false);
            }
        }
        setPrimaryIndex(index);
    }

   const addAnother = (data: any) => {
       let newHuman = InitHumanQuestionState;
       newHuman.id = watchedFields.length+1;
       append(InitHumanQuestionState);
       setActiveIndex(watchedFields.length);
       setWatchedFields(watchedFields.concat({firstName:"", lastName:"",isPrimary:false}));
   }

   const handleAccordionChange = (index: number) => {
       if(index == activeIndex){
           setActiveIndex(-1);
       } else {
           setActiveIndex(index);
       }
   }

   const moveToPets = (data: any) => {
       console.log("moving to pets");
       console.log(data);
       props.toPetInfo();
   }

    return (
        <IonGrid class="slide-grid ion-justify-content-center ion-align-items-center ion-align-self-center">
            <IonRow class="spacer"></IonRow>
            <IonRow>
                <IonCol size="10" className="slide-content">
                    <h1>Human Information</h1>
                    {fields.map((item, fieldArrayIndex) => (
                        <IonList>
                            <IonRow key={fieldArrayIndex} onClick={() => handleAccordionChange(fieldArrayIndex)}>
                                <IonItemSliding>
                                    <IonItemOptions side="start"><IonItemOption onClick={() => {remove(fieldArrayIndex)}} color="danger" expandable>
                                        Delete
                                    </IonItemOption></IonItemOptions>
                                    <IonItem slot="header">
                                        {
                                            <IonLabel  className={primaryIndex == fieldArrayIndex ? 'primary-person' : '' }>
                                                { (fieldArrayIndex < watchedFields.length && 
                                                    (watchedFields[fieldArrayIndex].firstName != '' || watchedFields[fieldArrayIndex].lastName != '')) ? (
                                                    watchedFields[fieldArrayIndex].firstName + ' ' + watchedFields[fieldArrayIndex].lastName
                                                ) : (
                                                    'Person ' + (fieldArrayIndex+1)
                                                )}
                                            </IonLabel>
                                        }
                                    </IonItem>
                                    <IonItemOptions side="end"><IonItemOption onClick={() => {remove(fieldArrayIndex)}} color="danger" expandable>
                                        Delete
                                    </IonItemOption></IonItemOptions>
                                </IonItemSliding>
                            </IonRow>
                            { (activeIndex == fieldArrayIndex && <>
                                <IonList slot="content">
                                    <div className="human-content">{
                                        HumanQuestionFields.map((field: TextFieldPropInterface, questionIndex) => {
                                            return renderField(field, questionIndex, fieldArrayIndex);
                                        })
                                    }</div>
                                </IonList>
                                </>)}
                        </IonList>
                    ))}
                    <IonRow>
                        <IonCol><IonButton expand="block" onClick={handleSubmit(addAnother)}>
                            Add Another
                        </IonButton></IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton expand="block" onClick={props.toFamilyInfo}>&lt; Family</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton expand="block" onClick={handleSubmit(moveToPets)}>Pets &gt;</IonButton>
                        </IonCol>
                    </IonRow>    
                </IonCol>
            </IonRow>
            <IonRow class="spacer"></IonRow>
        </IonGrid>
    );
};

export default HumanQuestions;