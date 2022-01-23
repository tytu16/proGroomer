import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonLabel, IonList, IonRow } from "@ionic/react";

import './CreateFamily.scss'; 
import { FamilyInfo } from "../../models/FamilyInfo";
import CreateFamilySlideWrapper from "./CreateFamilyQuestions/CreateFamilySlideWrapper"
import { useFieldArray, useForm, FormProvider } from "react-hook-form";

import { InitFamilyQuestionState } from "./CreateFamilyQuestions/QuestionObjects";
import { useRef, useState } from "react";
import AccordionWrapper from "../../components/Accordion/AccordionWrapper";
import AccordionHeader from "../../components/Accordion/AccordionHeader";
import { useHistory } from "react-router";

export interface CreateFamilyProps {
    onCreateFamily: (family: FamilyInfo) => void,
    index: number
}

export interface CreateFamilyState {
    familyInProgress: FamilyInfo
}

const CreateFamily = (props: CreateFamilyProps) => {

  const IonContentRef = useRef<any>(null);
  const IonListRef = useRef<any>(null);
  const history = useHistory();
  const methods = useForm({
    defaultValues: {family: [InitFamilyQuestionState()]}
  });
  const control = methods.control;
  const watch   = methods.watch;
  const { fields, append, remove} = useFieldArray({
    control,
    name: "family",
  });

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [familyNames, setFamilyNames] = useState<string[]>([]);

  const saveFamilyInfo = (newFamily: FamilyInfo) => {
      // if(!this.state.familyInProgress.baseFamilyEqual(newFamily)){
      //     newFamily.id = this.props.index.toString();
      //     this.setState({familyInProgress: newFamily});
      //     console.log('added family info, now to personInfo');
      //     console.log(newFamily);
      // } else {
      //     console.log('data is same, moving forward without saving');
      // }
  }

  const submitFamily = (index: number) => {
      console.log('in Create Family submit function');
      console.log(`submitting family ${index}`);
      let submitData = watch(`family.${index}`);
      console.log(submitData);
      history.goBack();
  }

  const handleFamilyNames = (name: string, index: number) => {
    // family.0.person.0.firstName
    let newFamilyNames = [...familyNames];
    newFamilyNames[index] = name;
    setFamilyNames(newFamilyNames);
  }

  // Remove field from fieldArray, set all accordions as inactive, 
  // remove watchedField from state, IonListRef to reset ion-item positions 
  const handleDelete = (index: number) => {
    remove(index);
    setActiveIndex(-1);
    let newFamilyNames = familyNames.slice(0,index).concat(familyNames.slice(index+1));
    setFamilyNames(newFamilyNames);
    IonListRef.current.closeSlidingItems();
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

  const toTop = () => {
    IonContentRef.current.scrollToTop(300);
  }

  return (
      <IonContent ref={IonContentRef}>
          <IonList ref={IonListRef}>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(data => console.log(data))}>
                {fields.map((field, familyIndex) => (
                  <div key={field.id}>
                    <div className="family-header">
                    <AccordionHeader fieldArrayIndex={familyIndex} labelClass="bold-header"
                        isPrimary={false} isActive={activeIndex == familyIndex}
                        handleDelete={handleDelete} handleAccordion={handleAccordionChange} 
                        label={(familyIndex < familyNames.length && familyNames[familyIndex] != '') ? (
                            familyNames[familyIndex]
                        ) : (
                            'Account ' + (familyIndex+1)
                        )}
                    /></div>
                    <AccordionWrapper addBorder={false} classNames={activeIndex == familyIndex ? "accordion" : "accordion collapsed"}>
                      <CreateFamilySlideWrapper familyNames={familyNames} index={familyIndex} 
                        saveFamilyInfo={saveFamilyInfo} toTop={toTop}
                        submitFamily={submitFamily} handleFamilyNames={handleFamilyNames}/>
                    </AccordionWrapper>
                  </div>
                ))}
                <IonButton type="button" onClick={() => {
                  append(InitFamilyQuestionState())
                }}>append</IonButton>
              </form>
            </FormProvider>
          </IonList>
      </IonContent>
  );
    
}

export default CreateFamily;