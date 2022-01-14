import { IonAccordion, IonAccordionGroup, IonButton, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonRow } from "@ionic/react";
import { arrowDownCircleOutline } from 'ionicons/icons';
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

export interface WatchedFieldsInter{
    petName: string,
    petBreed: string
}

const PetQuestions = (props: PetQuestionsProps) => {
    const {control, handleSubmit} = useFormContext();
    const objectType = `family.${props.index}.pet`;
    const { fields, append, remove} = useFieldArray({
        control,
        name: objectType,
    });

    const IonListRef = useRef<any>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [watchedFields, setWatchedFields] = useState<Array<WatchedFieldsInter>>([{
        petName: "", petBreed: ""
    }]);

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
// which is reflected in the human headers
const handleFieldChange = (data: string, name: string) => {
    // family.0.human.0.firstName
    let newFields = watchedFields.slice();
    const nameParse = name.split('.');
    const index = Number.parseInt(nameParse[3]);
    const fieldName = nameParse[4];
    let thisField = watchedFields[index];
    if(fieldName === 'name'){
        thisField.petName = data;
    } else if (fieldName === 'breed'){
        thisField.petBreed = data;
    }
    newFields[index] = thisField;
    setWatchedFields(newFields);
}

// Append a new copy of InitialHumanQuestionState to formArray
// Set active index to this newly added field so it's open
// Add a new watchedField to state for header
const addAnother = (data: any) => {
   append(InitPetQuestionState());
   setActiveIndex(watchedFields.length);
   setWatchedFields(watchedFields.concat({petName:"", petBreed:""}));
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

    const finishFamily = (data: any) => {
        props.submitFamily();
    }

    return (
        <IonGrid class="slide-grid ion-justify-content-center ion-align-items-center ion-align-self-center">
            <IonRow class="spacer"></IonRow>
            <IonRow>
                <IonCol size="10" className="slide-content">
                    <h1>Pet Information</h1>
                    <IonList ref={IonListRef}>
                    {fields.map((item, fieldArrayIndex) => (
                        <div key={fieldArrayIndex}>
                            <IonItemSliding>
                                <IonItemOptions side={"start"}><IonItemOption onClick={() => {handleDelete(fieldArrayIndex)}} color="danger" expandable>
                                    Delete
                                </IonItemOption></IonItemOptions>
                                <IonItem  className="accordion-header" 
                                    onClick={() => handleAccordionChange(fieldArrayIndex)} slot="header" mode='md' lines="none">
                                    {
                                        <IonLabel>
                                            { (fieldArrayIndex < watchedFields.length && 
                                                (watchedFields[fieldArrayIndex].petName != '' || watchedFields[fieldArrayIndex].petBreed != '')) ? (
                                                watchedFields[fieldArrayIndex].petName + ' ' + watchedFields[fieldArrayIndex].petBreed
                                            ) : (
                                                'Pet ' + (fieldArrayIndex+1)
                                            )}
                                        </IonLabel>
                                    }
                                    <IonIcon className={(activeIndex == fieldArrayIndex ? "active icon float-right" : "icon float-right")} size="large"
                                        icon={arrowDownCircleOutline}></IonIcon>
                                </IonItem>
                                <IonItemOptions side={"end"}><IonItemOption onClick={() => {handleDelete(fieldArrayIndex)}} color="danger" expandable>
                                    Delete
                                </IonItemOption></IonItemOptions>
                            </IonItemSliding>
                            <IonList className={activeIndex == fieldArrayIndex ? "accordion" : "accordion collapsed"} slot="content">
                                <div className="human-content shadow-container">{
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
                                            <IonInput placeholder="sex ;)"></IonInput>
                                        )
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
                            <IonButton expand="block" onClick={() => props.backToHumans()}>&lt; People</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton expand="block" onClick={()=> props.submitFamily()}>Submit &gt;</IonButton>
                        </IonCol>
                    </IonRow>    
                </IonCol>
            </IonRow>
            <IonRow class="spacer"></IonRow>
        </IonGrid>
    );
};

export default PetQuestions;