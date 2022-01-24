import { IonCol, IonGrid, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonRadio, IonRadioGroup, IonRow } from "@ionic/react";
import { arrowDownCircleOutline } from 'ionicons/icons';
import { useRef, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { MyTextLabelInput } from "../../../components/InputFields/MyTextLabelInput";
import { InitPetQuestionState, PetQuestionFields, TextFieldPropInterface } from "./QuestionObjects";
import "./Questions.scss";
import ModalFormWrapper from "../../../components/Modal/ModalFormWrapper";
import { MySelectList } from "../../../components/InputFields/MySelectList";
import {WeightUnitList} from "../../../models/Enums/WeightUnitList"
import { addCircleOutline } from "ionicons/icons";
import BottomSlideButtons from "../../../components/Slide/BottomButtons";

export interface PetQuestionsProps{
    index: number,
    backToPeople: () => void,
    submitAccount: () => void,
}

export interface WatchedFieldsInter{
    petName: string,
    petBreed: string
}

// ToDo: Add Weight
const PetQuestions = (props: PetQuestionsProps) => {
    const {control, handleSubmit} = useFormContext();
    const objectType = `account.${props.index}.pet`;
    const { fields, append, remove} = useFieldArray({
        control,
        name: objectType,
    });

    const IonListRef = useRef<any>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [watchedFields, setWatchedFields] = useState<Array<WatchedFieldsInter>>([{
        petName: "", petBreed: ""
    }]);
    
// ----RENDER---- //
// Dynamically rendered fields fed from PeopleQuestionFields
    const renderFields = (field: any, questionIndex:number, petIndex:number) => {
        switch(field.fieldName){
            case 'maleFemale':
                return(
                    <Controller key={questionIndex}
                        control={control}
                        name={`${objectType}.${petIndex}.${field.fieldName}`}
                        render={({ field: { onChange, name, value } }) => (
                            <IonRadioGroup value={value} onIonChange={onChange} name={name}>
                                    <IonRow>
                                        <IonCol size="6">
                                            <IonItem class="ion-no-padding ion-text-center" mode="md">
                                                <IonLabel>Male</IonLabel>
                                                <IonRadio class="ion-no-padding" slot="end" value="Male" />
                                            </IonItem>
                                        </IonCol>
                                        <IonCol size="6">
                                            <IonItem class="ion-no-padding ion-text-center" mode="md">
                                                <IonLabel>Female</IonLabel>
                                                <IonRadio class="ion-no-padding" slot="end" value="Female" />
                                            </IonItem>
                                        </IonCol>
                                    </IonRow>
                            </IonRadioGroup>
                        )}
                    />
                );

            case 'age':
                return (
                    <IonRow key={questionIndex}>
                        <IonCol size ="6">
                            <MyTextLabelInput key={questionIndex} index={petIndex} numbersOnly={true}
                                onChange={handleFieldChange} watched={field.watched} maxLength={2}
                                placeholder={"years"} label={"Age - Years"}
                                objectType={objectType} fieldName={'ageYr'} required={field.required}
                            />
                        </IonCol>
                        <IonCol size="6">
                            <MyTextLabelInput key={questionIndex} index={petIndex} numbersOnly={true}
                                onChange={handleFieldChange} watched={field.watched} maxLength={2}
                                placeholder={"months"} label={"Age - Months"}
                                objectType={objectType} fieldName={'ageMn'} required={field.required}
                            />
                        </IonCol>
                    </IonRow>
                );

            case 'weight':
                return (
                    <IonRow key={questionIndex}>
                        <IonCol size ="6">
                            <MyTextLabelInput key={questionIndex} index={petIndex} numbersOnly={true}
                                onChange={handleFieldChange} watched={field.watched}
                                placeholder={field.placeholder} label={"Weight"}
                                objectType={objectType} fieldName={'weight'} required={field.required}
                            />
                        </IonCol>
                        <IonCol size="6">
                            <div className="input-label-field"><MySelectList key={questionIndex} index={petIndex} addStyling={true}
                                placeholder={field.placeholder} label={"Units"} valueList={WeightUnitList}
                                objectType={objectType} fieldName={'wUnits'} required={field.required}
                            /></div>
                        </IonCol>
                    </IonRow>
                );

            case 'note':
                return (<ModalFormWrapper key={questionIndex} label={derivePetLabel(petIndex, true)}
                    defaultOn={false} objectIndex={petIndex} formPrefix={objectType}/>);

            default:
                return (
                        <MyTextLabelInput key={questionIndex} index={petIndex} 
                            onChange={handleFieldChange} watched={field.watched}
                            placeholder={field.placeholder} label={field.label}
                            objectType={objectType} fieldName={field.fieldName} required={field.required}
                        />
                );
        }
    }

    const derivePetLabel = (index: number, isNote: boolean) => {
        let outString = "";
        if(index < watchedFields.length && watchedFields[index].petName != ''){
            outString = watchedFields[index].petName;
            if(watchedFields[index].petBreed != '' && !isNote) {
                outString += ' - ' + watchedFields[index].petBreed
            }
        } else {
            outString = `Pet ${index+1}`
        }
        return outString;
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
// which is reflected in the pet headers
const handleFieldChange = (data: string, name: string) => {
    // account.0.pet.0.name
    let newFields = [...watchedFields];
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

// Append a new copy of InitialPetQuestionState to formArray
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
                                            {derivePetLabel(fieldArrayIndex, false)}
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
                                <div className="question-content shadow-container">{
                                    PetQuestionFields.map((field: TextFieldPropInterface, questionIndex) => {
                                        return renderFields(field, questionIndex, fieldArrayIndex);
                                    })
                                }</div>
                            </IonList>
                        </div>
                    ))}
                    </IonList>
                    <BottomSlideButtons numButtons="three"
                        buttonOneLabel={"Add Another Pet"} buttonOneIcon={addCircleOutline} buttonOneClick={addAnother}
                        buttonTwoLabel="&lt; People" buttonTwoClick={() => props.backToPeople()}
                        buttonThreeLabel="Submit &gt;" buttonThreeClick={()=> props.submitAccount()}/>
                </IonCol>
            </IonRow>
            <IonRow class="spacer"></IonRow>
        </IonGrid>
    );
};

export default PetQuestions;