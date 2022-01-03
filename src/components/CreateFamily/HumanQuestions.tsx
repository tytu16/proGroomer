import { IonButton, IonCol, IonGrid, IonItem, IonList, IonRow, IonLabel, IonAccordionGroup, IonAccordion } from "@ionic/react";
import { useState } from "react";
import { useForm, useFieldArray, useFormContext } from "react-hook-form";
import { HumanInfo } from "../../models/HumanInfo";
import "./Questions.css";
import {MyTextInput} from "../InputFields/MyTextInput";
import { HumanQuestionFields, InitHumanQuestionState, TextFieldPropInterface } from "./QuestionProps/InputProperties";
import {PhoneFieldInput} from "../InputFields/PhoneField"

import 'swiper/swiper.min.css';
import '@ionic/react/css/ionic-swiper.css';

export interface HumanQuestionsProps {
    index: number,
    toPetInfo: (human: HumanInfo | null) => void,
    toFamilyInfo: () => void,
    anotherHuman: (human: HumanInfo) => void
}

const HumanQuestions = (props: HumanQuestionsProps) => {

    const {control, handleSubmit} = useFormContext();
    const objectType = `family.${props.index}.human`;
    const { fields, append, remove} = useFieldArray({
        control,
        name: objectType,
    });

   const addAnother = (data: any) => {
       console.log('new fam data:');
       console.log(data);
       append(InitHumanQuestionState);
   }

    return (
        <IonGrid class="slide-grid ion-justify-content-center ion-align-items-center ion-align-self-center">
            <IonRow class="spacer"></IonRow>
                <IonRow>
                    <IonCol size="10" className="slide-content">
                        <h1>Human Information</h1>
                        <IonList>
                        <IonAccordionGroup multiple={false} value="human0" >
                            {fields.map((item, fieldArrayIndex) => (
                                <IonAccordion class="accordion-expanded" key={fieldArrayIndex} value={`human${fieldArrayIndex}`} >
                                    <IonItem slot="header">
                                        <IonLabel>Human {fieldArrayIndex+1}</IonLabel>
                                    </IonItem>
                                    <IonList slot="content">
                                        <div className="human-content"> 
                                        {
                                            HumanQuestionFields.map((field: TextFieldPropInterface, questionIndex) => {

                                                return (field.fieldName != 'phoneNumber') ? (
                                                    <IonItem key={questionIndex}><MyTextInput index={fieldArrayIndex}
                                                        placeholder={field.placeholder} label={field.label} 
                                                        objectType={objectType} fieldName={field.fieldName} required={field.required}
                                                    /></IonItem>                               
                                                ) : (
                                                    <IonItem key={questionIndex}>
                                                        <PhoneFieldInput index={fieldArrayIndex}
                                                            placeholder={field.placeholder} label={field.label} 
                                                            objectType={objectType} fieldName={field.fieldName}
                                                        />
                                                    </IonItem>
                                                );
                                            })
                                        }</div>
                                    </IonList>
                                </IonAccordion>
                            ))}
                        </IonAccordionGroup>
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