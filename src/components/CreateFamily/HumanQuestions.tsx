import { IonButton, IonCol, IonGrid, IonItem, IonList, IonRow, IonLabel, IonIcon, IonItemSliding, IonItemOption, IonItemOptions } from "@ionic/react";
import { useRef, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import "./Questions.css";
import {MyTextInput} from "../InputFields/MyTextInput";
import { HumanQuestionFields, InitHumanQuestionState, TextFieldPropInterface } from "./QuestionProps/InputProperties";
import {PhoneFieldInput} from "../InputFields/PhoneField";
import {MyCheckBox} from "../InputFields/MyCheckBox";

import { arrowDownCircleOutline } from 'ionicons/icons';

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

    const {control, handleSubmit, setValue} = useFormContext();
    const objectType = `family.${props.index}.human`;
    const { fields, append, remove, replace} = useFieldArray({
        control,
        name: objectType,
    });

    const IonListRef = useRef<any>(null);

    const [watchedFields, setWatchedFields] = useState<Array<WatchedFieldsInter>>([{
        firstName: "", lastName: "", isPrimary: true
    }]);
    const [numPeople, setNumPeople] = useState<number>(1);
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

    const handleDelete = (index: number) => {
        remove(index);
        setNumPeople(numPeople-1);
        setActiveIndex(-1);
        let newWatchedFields = watchedFields.slice(0,index).concat(watchedFields.slice(index+1));
        setWatchedFields(newWatchedFields);
        IonListRef.current.closeSlidingItems();
    }

   const handleFieldChange = (data: string, name: string) => {
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
        for(let i=0; i<watchedFields.length; i++){
            if(i != index){
                setValue(`${objectType}.${i}.isPrimary`, false);
            }
        }
        setPrimaryIndex(index);
    }

   const addAnother = (data: any) => {
       append(InitHumanQuestionState());
       setActiveIndex(watchedFields.length);
       setWatchedFields(watchedFields.concat({firstName:"", lastName:"",isPrimary:false}));
       setNumPeople(numPeople+1);
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
                    <IonList ref={IonListRef}>
                    {fields.map((item, fieldArrayIndex) => (
                        <div key={fieldArrayIndex}>
                            <IonItemSliding>
                                {(fieldArrayIndex == primaryIndex) ? (
                                    <IonItemOptions side="start"><IonItemOption onClick={() => {alert('Can\'t delete primary contact.')}} color="primary" expandable>
                                        Primary
                                    </IonItemOption></IonItemOptions>
                                ) : (
                                    <IonItemOptions side={"start"}><IonItemOption onClick={() => {handleDelete(fieldArrayIndex)}} color="danger" expandable>
                                        Delete
                                    </IonItemOption></IonItemOptions>
                                )}
                                <IonItem onClick={() => handleAccordionChange(fieldArrayIndex)} slot="header">
                                    {
                                        <IonLabel className={primaryIndex == fieldArrayIndex ? 'accordion-header primary-person' : 'accordion-header' }>
                                            { (fieldArrayIndex < watchedFields.length && 
                                                (watchedFields[fieldArrayIndex].firstName != '' || watchedFields[fieldArrayIndex].lastName != '')) ? (
                                                watchedFields[fieldArrayIndex].firstName + ' ' + watchedFields[fieldArrayIndex].lastName
                                            ) : (
                                                'Person ' + (fieldArrayIndex+1)
                                            )}
                                        </IonLabel>
                                    }
                                    <IonIcon className={activeIndex == fieldArrayIndex ? "active-icon float-right" : "inactive-icon float-right"} 
                                        size="large"icon={arrowDownCircleOutline}></IonIcon>
                                </IonItem>
                                {(fieldArrayIndex == primaryIndex) ? (
                                    <IonItemOptions side="end"><IonItemOption onClick={() => {alert('Can\'t delete primary contact.')}} color="primary" expandable>
                                        Primary
                                    </IonItemOption></IonItemOptions>
                                ) : (
                                    <IonItemOptions side={"end"}><IonItemOption onClick={() => {handleDelete(fieldArrayIndex)}} color="danger" expandable>
                                        Delete
                                    </IonItemOption></IonItemOptions>
                                )}
                            </IonItemSliding>
                            <IonList className={activeIndex == fieldArrayIndex ? "accordion" : "accordion collapsed"} slot="content">
                                <div className="human-content">{
                                    HumanQuestionFields.map((field: TextFieldPropInterface, questionIndex) => {
                                        return renderField(field, questionIndex, fieldArrayIndex);
                                    })
                                }</div>
                            </IonList>
                        </div>
                    ))}
                    </IonList>

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