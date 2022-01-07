import { IonButton, IonCol, IonGrid, IonItem, IonList, IonRow, IonLabel, IonAccordionGroup, IonAccordion, IonCheckbox } from "@ionic/react";
import React, { useRef, useState } from "react";
import { useForm, useFieldArray, useFormContext } from "react-hook-form";
import { HumanInfo } from "../../models/HumanInfo";
import "./Questions.css";
import {MyTextInput} from "../InputFields/MyTextInput";
import { HumanQuestionFields, InitHumanQuestionState, TextFieldPropInterface } from "./QuestionProps/InputProperties";
import {PhoneFieldInput} from "../InputFields/PhoneField";
import {MyCheckBox} from "../InputFields/MyCheckBox";

import 'swiper/swiper.min.css';
import '@ionic/react/css/ionic-swiper.css';

export interface HumanQuestionsProps {
    index: number,
    toPetInfo: (human: HumanInfo | null) => void,
    toFamilyInfo: () => void,
    anotherHuman: (human: HumanInfo) => void
}

// Use checked state to allow only one primary checkbox at a time
const HumanQuestions = (props: HumanQuestionsProps) => {

    const {control, handleSubmit, register} = useFormContext();
    const objectType = `family.${props.index}.human`;
    const { fields, append, remove} = useFieldArray({
        control,
        name: objectType,
    });

    const accordionGroupRef = useRef<any>(null);
    const [fieldNumber, setFieldNumber] = useState<number>(0);

    const switchAccordions = (index:number) => {
        console.log(`switching to accordion ${index}`);
        // accordionGroupRef.current.value = undefined;
    }
    
    const renderField = (field: any,questionIndex:number,fieldArrayIndex:number) => {
        switch(field.fieldName){
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
                    label={field.label} objectType={objectType}
                    fieldName={field.fieldName} required={field.required} />
                );

            default:
                return  (
                    <IonItem key={questionIndex}>
                        <MyTextInput index={fieldArrayIndex}
                        placeholder={field.placeholder} label={field.label} 
                        objectType={objectType} fieldName={field.fieldName} required={field.required}
                    /></IonItem>                               
                );
        }
    }


   const addAnother = (data: any) => {
       console.log('new fam data:');
       console.log(data);
       append(InitHumanQuestionState);
       console.log(`fieldNumber: ${fieldNumber}`);
       const newFieldNumber = fieldNumber+1; 
       console.log(`newFieldNumber: ${newFieldNumber}`);
       setFieldNumber(newFieldNumber);
    //    switchAccordions(newFieldNumber);
   }

    return (
        <IonGrid class="slide-grid ion-justify-content-center ion-align-items-center ion-align-self-center">
            <IonRow class="spacer"></IonRow>
                <IonRow>
                    <IonCol size="10" className="slide-content">
                        <h1>Human Information</h1>
                        <IonAccordionGroup multiple={false} value={'human_0'} ref={accordionGroupRef}>
                            {fields.map((item, fieldArrayIndex) => (
                                <IonAccordion class="accordion-expanded" key={fieldArrayIndex} value={`human_${fieldArrayIndex}`} >
                                    <IonItem slot="header">
                                        <IonLabel>Human {fieldArrayIndex+1}</IonLabel>
                                    </IonItem>
                                    <IonList slot="content">
                                        <div className="human-content">{
                                            HumanQuestionFields.map((field: TextFieldPropInterface, questionIndex) => {
                                                return renderField(field, questionIndex, fieldArrayIndex);
                                            })
                                        }</div>
                                    </IonList>
                                </IonAccordion>
                            ))}
                        </IonAccordionGroup>
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
                                <IonButton expand="block" >Pets &gt;</IonButton>
                            </IonCol>
                        </IonRow>    
                    </IonCol>
                </IonRow>
     
            <IonRow class="spacer"></IonRow>
        </IonGrid>
    );
};

export default HumanQuestions;