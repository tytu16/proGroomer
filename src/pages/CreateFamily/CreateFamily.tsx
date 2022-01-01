import { IonCol, IonContent, IonGrid, IonRow } from "@ionic/react";

import './CreateFamily.css'; 
import { FamilyInfo } from "../../models/FamilyInfo";
import { HumanInfo } from "../../models/HumanInfo";
import { PetInfo } from "../../models/PetInfo";
import FamilyQuestionSlides from "../../components/CreateFamily/FamilyQuestionSlides"
import { useFieldArray, useForm, FormProvider, useFormContext } from "react-hook-form";

export interface CreateFamilyProps {
    onCreateFamily: (family: FamilyInfo) => void,
    index: number
}

export interface CreateFamilyState {
    familyInProgress: FamilyInfo
}

const CreateFamily = (props: CreateFamilyProps) => {

  const addHuman = (newHuman: HumanInfo) => {
      // let newFamily = this.state.familyInProgress;
      // if(newFamily.humans.length == 0){
      //     newFamily.humans = [newHuman];
      // } else {
      //     newFamily.humans.push(newHuman);
      // }
      
      // console.log('family has a new human');
      // console.log(newFamily);
      
      // this.setState({familyInProgress: newFamily});
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
      //     console.log('added family info, now to humanInfo');
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

  const methods = useForm({
    // defaultValues: {}; you can populate the fields by this attribute 
  });
  const control = methods.control;
  const { fields, append, remove} = useFieldArray({
    control,
    name: "family",
  });

  return (
      <IonContent>
          <IonGrid class="thing">
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(data => console.log(data))}>
                <ol>
                  {fields.map((item, index) => (
                    <IonGrid key={item.id} class="slide-grid ion-justify-content-center ion-align-items-center ion-align-self-center">
                      <IonRow>
                        <IonCol>
                          <li key={item.id}>
                          <IonRow>
                              <FamilyQuestionSlides index={index} saveFamilyInfo={saveFamilyInfo}
                                  addHuman={addHuman} addPet={addPet} submitFamily={submitFamily}/>
                          </IonRow>
                            <button type="button" onClick={() => remove(index)}>Delete</button>
                          </li> 
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  ))}
                </ol>
                <button
                  type="button"
                  onClick={() => append({ firstName: "", lastName: "" })}
                >
                  append
                </button>
                <input type="submit" />
              </form>
            </FormProvider>
          </IonGrid>
      </IonContent>
  );
    
}

export default CreateFamily;