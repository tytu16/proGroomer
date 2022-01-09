import { IonAccordion, IonAccordionGroup, IonButton, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonList, IonRow } from "@ionic/react";
import { useRef, useState } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { PetInfo } from "../../models/PetInfo";
import { MyTextInput } from "../InputFields/MyTextInput";
import { InitPetQuestionState, PetQuestionFields, TextFieldPropInterface } from "./QuestionProps/InputProperties";
import "./Questions.css";

export interface PetQuestionsProps{
    index: number,
    backToHumans: () => void,
    submitFamily: () => void,
}

function PetHeader({ control, name, index }: { control: any, name: string, index: number }) {
    const nameBreed = useWatch({
        control,
        name: [`${name}.name`,`${name}.breed`],
      });
    
      return (nameBreed[0] != '' || nameBreed[1] != '') ? (
          <IonLabel>{nameBreed[0]} {nameBreed[1]}</IonLabel>
      ) : (
          <IonLabel>Pet {index+1}</IonLabel>
      )
}

const PetQuestions = (props: PetQuestionsProps) => {
    const {control, handleSubmit, register, watch} = useFormContext();
    const objectType = `family.${props.index}.pet`;
    const { fields, append, remove} = useFieldArray({
        control,
        name: objectType,
    });

    const accordionGroupRef = useRef<any>(null);
    const [index, setIndex] = useState(0);
    const [pets, setPets] = useState<Array<PetInfo>>([]);
    const [sex, setSex] = useState<string>("");

    const assignSex = (s: string) => {
        console.log('setting sex: ' + s);
        if(s == 'male'){
            setSex('male');
        } else {
            setSex('female');
        }
    }

    const handleFieldChange = (data: string, name: string) => {
        console.log(`PetQuestions: ${name}: ${data}`);
    }

    const addAnother = (data: any) => {
        append(InitPetQuestionState);
    }

    const finishFamily = (data: any) => {
        props.submitFamily();
    }

    return (
        <IonGrid class="slide-grid ion-justify-content-center ion-align-items-center ion-align-self-center">
            <IonRow class="spacer"></IonRow>
                <IonRow>
                    <IonCol size="10" className="slide-content">
                        <h1>Human Information</h1>
                        <IonAccordionGroup multiple={false} value={'pet_0'} ref={accordionGroupRef}>
                            {fields.map((item, fieldArrayIndex) => (
                                <IonAccordion class="accordion-expanded" key={fieldArrayIndex} value={`human_${fieldArrayIndex}`} >
                                    <IonItem slot="header">
                                        {
                                            <PetHeader control={control} name={`${objectType}.${fieldArrayIndex}`} index={fieldArrayIndex}/>
                                        }
                                    </IonItem>
                                    <IonList slot="content">
                                        <div className="human-content">{
                                            PetQuestionFields.map((field: TextFieldPropInterface, questionIndex) => {
                                                return (field.fieldName != 'sex') ? (
                                                    <IonItem key={questionIndex}>
                                                        <MyTextInput index={fieldArrayIndex} 
                                                            onChange={handleFieldChange} watched={field.watched}
                                                            placeholder={field.placeholder} label={field.label}
                                                            objectType={objectType} fieldName={field.fieldName} required={field.required}
                                                        />
                                                    </IonItem>
                                                ) : (
                                                    <IonGrid key={questionIndex}>
                                                        <IonRow>
                                                            <IonCol onClick={() => {assignSex("male");}} className={sex == "male" ? 'active-sex' : '' }>
                                                                Male
                                                            </IonCol>
                                                            <IonCol onClick={() => {assignSex("female");}} className={sex == "female" ? 'active-sex' : '' }>
                                                                Female
                                                            </IonCol>
                                                        </IonRow>
                                                    </IonGrid>
                                                )
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
                                <IonButton expand="block" onClick={handleSubmit(props.backToHumans)}>&lt; Humans</IonButton>
                            </IonCol>
                            <IonCol>
                                <IonButton expand="block" onClick={handleSubmit(props.submitFamily)}>Submit &gt;</IonButton>
                            </IonCol>
                        </IonRow>2
                    </IonCol>
                </IonRow>
     
            <IonRow class="spacer"></IonRow>
        </IonGrid>
    );
};

export default PetQuestions;