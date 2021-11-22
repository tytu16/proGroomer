import { IonButton, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonList, IonRow, IonSlide, IonToggle } from "@ionic/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PetInfo } from "../../models/PetInfo";
import "./Questions.css";

export interface PetQuestionsProps{
    anotherPet: (petInfo: PetInfo) => void,
    backToHumans: () => void,
    submitFamily: (petInfo: PetInfo | null) => void,
}

const PetQuestions = (props: PetQuestionsProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onTouched",
        reValidateMode: "onChange"
    });

    const [index, setIndex] = useState(0);
    const [pets, setPets] = useState<Array<PetInfo>>([]);

    const createPet = (data: any) => {
        const newPet = new PetInfo(data);
        if(pets.length > 0){
            for(let pet of pets) {
                if(newPet.isEqualWithoutId(pet)){
                    console.log('already have this pet');
                    return null;
                }
            }
        } 
        newPet.id = index;
        setIndex(index+1);

        if(pets.length == 0){
            setPets([newPet])
        } else {
            let localPets = pets;
            localPets.push(newPet);
            setPets(localPets);
        }
        return newPet;
        
    }

    const createAndSavePet = (data: any) => {

        let newPet = createPet(data);
        if(newPet == null){
            // toast, we already have this pet
            return;
        }
        props.anotherPet(newPet);
    }

    const submitPetInfo = (data: any) => {
        props.submitFamily(createPet(data));
    }

    return (

        <IonSlide>
            <IonGrid class="ion-justify-content-center ion-align-items-center ion-align-self-center ion-text-center">
                <IonRow class="spacer"></IonRow>
                    <IonRow>
                        <IonCol size="10" className="slide-content">
                            <h1>Pet Information</h1>

                            <form onSubmit={handleSubmit(()=>{})}>
                                <IonList>
                                    <IonItem class="input-item ion-no-padding">
                                        <IonInput class="input-field" placeholder="Name" {...register("name", {required: true})} />
                                    </IonItem>
                                    <IonItem class="input-item ion-no-padding">
                                        <IonInput class="input-field" placeholder="Breed" {...register("breed", {required: true})} />  
                                    </IonItem>
                                    <IonItem class="input-item ion-no-padding">
                                        <IonGrid>
                                            <IonRow>
                                                <IonCol class="activeSex">
                                                    Male
                                                </IonCol>
                                                <IonCol>
                                                    Female
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>
                                    </IonItem>
                                </IonList>
                                
                                
                                {/* <IonInput class="input-toggle">
                                   <IonRow no-padding id="male-female-toggle">
                                        <IonCol id="male" class="activeSex" size="6">
                                            Male
                                        </IonCol>
                                        <IonCol id="female" size="6">
                                            Female                                           
                                        </IonCol>
                                    </IonRow> 
                                    <IonRow>
                                        <IonToggle>
                                        
                                        </IonToggle>
                                    </IonRow>
                                </IonInput> */}
                                <IonGrid>
                                    <IonRow>
                                        <IonCol>
                                            <IonButton expand="block" no-margin type="reset" onClick={handleSubmit(createAndSavePet)}>Add Another</IonButton>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol no-padding>
                                            <IonButton expand="block" no-margin type="submit" onClick={handleSubmit(props.backToHumans)}>&lt; Humans</IonButton>
                                        </IonCol>
                                        <IonCol no-padding>
                                            <IonButton expand="block" no-margin type="submit" onClick={handleSubmit(submitPetInfo)}>Finish</IonButton>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </form>
                        </IonCol>
                    </IonRow>
                <IonRow class="spacer"></IonRow>
            </IonGrid>
        </IonSlide>
    );
};

export default PetQuestions;