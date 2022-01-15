import { IonButton, IonCol, IonGrid, IonItem, IonList, IonRow, IonLabel, IonIcon, IonItemSliding, IonItemOption, IonItemOptions } from "@ionic/react";
import { useRef, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import "./Questions.css";
import {MyTextInput} from "../../../components/InputFields/MyTextInput";
import { PeopleQuestionFields, InitPersonQuestionState, TextFieldPropInterface } from "./QuestionObjects";
import {PhoneFieldInput} from "../../../components/InputFields/PhoneField";
import {HorizontalCheckBox} from "../../../components/InputFields/HorizontalCheckbox";
import {ModalInput} from "../../../components/InputFields/ModalInput"

import { arrowDownCircleOutline, arrowDownCircle } from 'ionicons/icons';

import 'swiper/swiper.min.css';
import '@ionic/react/css/ionic-swiper.css';

export interface PeopleQuestionsProps {
    index: number,
    toPetInfo: () => void,
    toFamilyInfo: () => void
}

export interface WatchedFieldsInter {
    firstName: string,
    lastName: string
}

const PeopleQuestions = (props: PeopleQuestionsProps) => {
// ----HOOKS---- //

// form hooks
    const objectType = `family.${props.index}.person`;
    const {control, handleSubmit, setValue} = useFormContext();
    const { fields, append, remove, replace} = useFieldArray({
        control,
        name: objectType,
    });
    const [watchedFields, setWatchedFields] = useState<Array<WatchedFieldsInter>>([{
        firstName: "", lastName: ""
    }]);

// State Hooks
    const [primaryIndex, setPrimaryIndex] = useState<number>(0);
    const [activeIndex, setActiveIndex] = useState<number>(0);

// Ref Hooks
    const IonListRef = useRef<any>(null);

// ----RENDER---- //
// Dynamically rendered fields fed from PeopleQuestionFields
    const renderField = (field: any, questionIndex:number, fieldArrayIndex:number) => {
        switch (field.fieldName){
            case 'phoneNumber':
                return (
                    <div  key={questionIndex} id="container">
                        <PhoneFieldInput index={fieldArrayIndex}
                            placeholder={field.placeholder} label={field.label} 
                            objectType={objectType} fieldName={field.fieldName}
                        />
                    </div>
                );

            case 'isPrimary':
                return (
                    <HorizontalCheckBox key={questionIndex} index={fieldArrayIndex}
                        onChange={handleCheckBoxChange} watched={field.watched}
                        label={field.label} objectType={objectType}
                        fieldName={field.fieldName} required={field.required} />
                );

            case 'note':
                return (
                    <ModalInput />
                );
            default:
                return  (
                    <MyTextInput key={questionIndex} index={fieldArrayIndex} 
                        onChange={handleFieldChange} watched={field.watched}
                        placeholder={field.placeholder} label={field.label}
                        objectType={objectType} fieldName={field.fieldName} required={field.required}
                    />
                );
        }
    }

// ----UTILITY METHODS---- //
// Remove field from fieldArray, set all accordions as inactive, 
  // remove watchedField from state, IonListRef to reset ion-item positions 
    const handleDelete = (index: number) => {
        remove(index);
        setActiveIndex(-1);
        let newWatchedFields = watchedFields.slice(0,index).concat(watchedFields.slice(index+1));
        setWatchedFields(newWatchedFields);
        IonListRef.current.closeSlidingItems();
    }

// Callback from input fields below returning onChange data and the name of the field
  // Parsing fieldName on objectType string sent back
  // Use parsed index and fieldName to update appropriate watchedField state, 
  // which is reflected in the person headers
   const handleFieldChange = (data: string, name: string) => {
        // family.0.person.0.firstName
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

// CallBack for isPrimary checkbox
  // Uses setValue from useFromContext to set every other isPrimary value to false
  // Uses the number of watchedFields to know how many to loop through
    const handleCheckBoxChange = (data: boolean, index: number) => {
        for(let i=0; i<watchedFields.length; i++){
            if(i != index){
                setValue(`${objectType}.${i}.isPrimary`, false);
            }
        }
        setPrimaryIndex(index);
    }

// Append a new copy of InitialPersonQuestionState to formArray
  // Set active index to this newly added field so it's open
  // Add a new watchedField to state for header
   const addAnother = (data: any) => {
       append(InitPersonQuestionState());
       setActiveIndex(watchedFields.length);
       setWatchedFields(watchedFields.concat({firstName:"", lastName:""}));
   }

// Sets the activeIndex to the clicked accordion
  // If currently active was clicked, close all accordions
   const handleAccordionChange = (index: number) => {
       if(index == activeIndex){
           setActiveIndex(-1);
       } else {
           setActiveIndex(index);
       }
   }

// Log pet data and move to next slide
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
                    <h1>People Information</h1>
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
                                <IonItem  className={primaryIndex == fieldArrayIndex ? 'accordion-header primary' : 'accordion-header' } 
                                    onClick={() => handleAccordionChange(fieldArrayIndex)} slot="header" mode='md' lines="none"
                                    fill={primaryIndex == fieldArrayIndex ? 'solid': 'outline'}>
                                    {
                                        <IonLabel>
                                            { (fieldArrayIndex < watchedFields.length && 
                                                (watchedFields[fieldArrayIndex].firstName != '' || watchedFields[fieldArrayIndex].lastName != '')) ? (
                                                watchedFields[fieldArrayIndex].firstName + ' ' + watchedFields[fieldArrayIndex].lastName
                                            ) : (
                                                'Person ' + (fieldArrayIndex+1)
                                            )}
                                        </IonLabel>
                                    }
                                    <IonIcon className={[(activeIndex == fieldArrayIndex ? "active icon float-right" : "icon float-right"),
                                                         primaryIndex == fieldArrayIndex ? "primary" : ""].join(" ")} size="large"
                                        icon={primaryIndex == fieldArrayIndex ? arrowDownCircle : arrowDownCircleOutline}></IonIcon>
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
                                <div className="question-content shadow-container">{
                                    PeopleQuestionFields.map((field: TextFieldPropInterface, questionIndex) => {
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

export default PeopleQuestions;