import { IonButton, IonCol, IonGrid, IonItem, IonList, IonRow, IonLabel, IonAccordionGroup, IonAccordion, IonCheckbox } from "@ionic/react";
import { useRef, useState } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import "./Questions.css";
import {MyTextInput} from "../InputFields/MyTextInput";
import { HumanQuestionFields, InitHumanQuestionState, TextFieldPropInterface } from "./QuestionProps/InputProperties";
import {PhoneFieldInput} from "../InputFields/PhoneField";
import {MyCheckBox} from "../InputFields/MyCheckBox";

import 'swiper/swiper.min.css';
import '@ionic/react/css/ionic-swiper.css';
import { HumanInfo } from "../../models/HumanInfo";

export interface HumanQuestionsProps {
    index: number,
    toPetInfo: () => void,
    toFamilyInfo: () => void
}

function HumanHeader({ control, name, index }: { control: any, name: string, index: number }) {
    const firstLastName = useWatch({
      control,
      name: [`${name}.firstName`,`${name}.lastName`],
    });
  
    return (firstLastName[0] != '' || firstLastName[1] != '') ? (
            <IonLabel>{firstLastName[0]} {firstLastName[1]}</IonLabel>
        ) : (
            <IonLabel>Person {index+1}</IonLabel>
        )
  }

// Use checked state to allow only one primary checkbox at a time
const HumanQuestions = (props: HumanQuestionsProps) => {

    const {control, handleSubmit, register, watch} = useFormContext();
    const objectType = `family.${props.index}.human`;
    const { fields, append, remove} = useFieldArray({
        control,
        name: objectType,
    });

    const [fieldNumber, setFieldNumber] = useState<number>(0);
    const [humans, setHumans] = useState<Array<HumanInfo>>([new HumanInfo({})]);
    const [primaryIndex, setPrimaryIndex] = useState<number>(0);

    const accordionGroupRef = useRef<any>(null);
    
    const renderField = (field: any, questionIndex:number, fieldArrayIndex:number) => {
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
                        />
                    </IonItem>                               
                );
        }
    }

   const addAnother = (data: any) => {
       append(InitHumanQuestionState);
       setFieldNumber(fieldNumber+1);
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
                        <IonAccordionGroup multiple={false} value={'human_0'} ref={accordionGroupRef}>
                            {fields.map((item, fieldArrayIndex) => (
                                <IonAccordion class="accordion-expanded" key={fieldArrayIndex} value={`human_${fieldArrayIndex}`} >
                                    <IonItem slot="header">
                                        {
                                            <HumanHeader control={control} name={`${objectType}.${fieldArrayIndex}`} index={fieldArrayIndex}/>
                                        }
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