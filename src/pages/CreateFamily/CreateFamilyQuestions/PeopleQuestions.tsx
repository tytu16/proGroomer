import { IonButton, IonList } from "@ionic/react";
import { useRef, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import "./Questions.css";
import {MyTextLabelInput} from "../../../components/InputFields/MyTextLabelInput";
import { PeopleQuestionFields, InitPersonQuestionState, TextFieldPropInterface } from "./QuestionObjects";
import {PhoneFieldInput} from "../../../components/InputFields/PhoneField";
import {HorizontalCheckBox} from "../../../components/InputFields/HorizontalCheckbox";
import NoteCardModal from "../../../components/Modal/NoteCardModal";
import SlideWrapper from "../../../components/Slide/SlideWrapper";
import AccordionHeader from "../../../components/Accordion/AccordionHeader";
import AccordionWrapper from "../../../components/Accordion/AccordionWrapper";
import 'swiper/swiper.min.css';
import '@ionic/react/css/ionic-swiper.css';
import BottomSlideButtons from "../../../components/Slide/BottomButtons";

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
    const {control, watch, setValue} = useFormContext();
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
    const [showWeight, setShowWeight] = useState<boolean>(false);
    const [weight, setWeight] = useState<number>(10);
// Ref Hooks
    const IonListRef = useRef<any>(null);

// ----RENDER---- //
// Dynamically rendered fields fed from PeopleQuestionFields
    const renderField = (field: any, questionIndex:number, fieldArrayIndex:number) => {
        switch (field.fieldName){
            case 'phoneNumber':
                return (
                    // ToDo: Make this an expandable Accordion
                    <div key={questionIndex} id="container">
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
                return (<div key={questionIndex}>
                    <IonButton onClick={()=>setShowWeight(true)}>Add Note</IonButton>
                        <NoteCardModal show={showWeight} setShow={setShowWeight} 
                            personIndex={fieldArrayIndex} formPrefix={objectType} onSave={(w:number) => setWeight(w)}/>
                    </div>);
            default:
                return  (
                    <MyTextLabelInput key={questionIndex} index={fieldArrayIndex} 
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
   const addAnother = () => {
       console.log('adding another person');
       logFormObject();
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
   const moveToPets = () => {
       console.log('moving to pets');
       logFormObject();
       props.toPetInfo();
   }

   const logFormObject = () => {
      console.log(objectType);
      console.log(watch(objectType));
   }

    return (
        <SlideWrapper title="People Information">
            <IonList ref={IonListRef}>
            {fields.map((item, fieldArrayIndex) => (
                <div key={fieldArrayIndex}>
                    <AccordionHeader fieldArrayIndex={fieldArrayIndex} 
                        isPrimary={primaryIndex == fieldArrayIndex} isActive={activeIndex == fieldArrayIndex}
                        handleDelete={handleDelete} handleAccordion={handleAccordionChange} 
                        label={(fieldArrayIndex < watchedFields.length && 
                            (watchedFields[fieldArrayIndex].firstName != '' || watchedFields[fieldArrayIndex].lastName != '')) ? (
                            watchedFields[fieldArrayIndex].firstName + ' ' + watchedFields[fieldArrayIndex].lastName
                            ) : (
                                'Person ' + (fieldArrayIndex+1)
                            )}>
                    </AccordionHeader>
                    <AccordionWrapper classNames={activeIndex == fieldArrayIndex ? "accordion" : "accordion collapsed"}>{
                        PeopleQuestionFields.map((field: TextFieldPropInterface, questionIndex) => {
                            return renderField(field, questionIndex, fieldArrayIndex);
                        })
                    }</AccordionWrapper>
                </div>
            ))}
            </IonList>

            <BottomSlideButtons numButtons="three"
                buttonOneLabel="Add Another" buttonOneClick={addAnother}
                buttonTwoLabel="&lt; Family" buttonTwoClick={props.toFamilyInfo}
                buttonThreeLabel="Pets &gt;" buttonThreeClick={moveToPets}/>
        </SlideWrapper>
    );
};

export default PeopleQuestions;