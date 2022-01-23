import { IonCol, IonContent, IonGrid, IonIcon, IonLabel, IonList, IonRow } from "@ionic/react";

import './CreateFamily.scss'; 
import { FamilyInfo } from "../../models/FamilyInfo";
import { PersonInfo } from "../../models/PersonInfo";
import { PetInfo } from "../../models/PetInfo";
import CreateFamilySlideWrapper from "./CreateFamilyQuestions/CreateFamilySlideWrapper"
import { useFieldArray, useForm, FormProvider } from "react-hook-form";

import { InitFamilyQuestionState } from "./CreateFamilyQuestions/QuestionObjects";
import { useRef, useState } from "react";
import AccordionWrapper from "../../components/Accordion/AccordionWrapper";
import AccordionHeader from "../../components/Accordion/AccordionHeader";

export interface CreateFamilyProps {
    onCreateFamily: (family: FamilyInfo) => void,
    index: number
}

export interface CreateFamilyState {
    familyInProgress: FamilyInfo
}

const CreateFamily = (props: CreateFamilyProps) => {

  const IonContentRef = useRef<any>(null);

  const addPerson = (newperson: PersonInfo) => {
      
  }

  const addPet = (newPet: PetInfo): FamilyInfo => {
      // let newFamily = this.state.familyInProgress;
      // if(newFamily.pets.length == 0){
      //     newFamily.pets = [newPet];
      // } else {
      //     newFamily.pets.push(newPet);
      // }

      // console.log('family has a new pet');
      // console.log(newFamily);
      // this.setState({familyInProgress: newFamily});
      // return newFamily;
      return new FamilyInfo({});
  }

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

  const submitFamily = (newPet: PetInfo | null) => {
      // this method is broken
      // if(newPet == null){
      //     console.log('pet already exists, moving on with family as is');
      //     this.props.onCreateFamily(this.state.familyInProgress);
      // } else {
      //     this.props.onCreateFamily(addPet(newPet));
      // }
  }

  const IonListRef = useRef<any>(null);
  const methods = useForm({
    defaultValues: {family: [InitFamilyQuestionState()]}
  });
  const control = methods.control;
  const { fields, append, remove} = useFieldArray({
    control,
    name: "family",
  });

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [familyNames, setFamilyNames] = useState<string[]>([]);

  const handleFamilyNames = (name: string, index: number) => {
    // family.0.person.0.firstName
    let newFamilyNames = familyNames.slice();
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
                      <CreateFamilySlideWrapper familyNames={familyNames} index={familyIndex} saveFamilyInfo={saveFamilyInfo} toTop={toTop}
                        addPerson={addPerson} addPet={addPet} submitFamily={submitFamily} handleFamilyNames={handleFamilyNames}/>
                    </AccordionWrapper>
                  </div>
                ))}
                <button type="button" onClick={() => append(InitFamilyQuestionState())}>
                  append
                </button>
                <input type="submit" />
              </form>
            </FormProvider>
          </IonList>
      </IonContent>
  );
    
}

export default CreateFamily;