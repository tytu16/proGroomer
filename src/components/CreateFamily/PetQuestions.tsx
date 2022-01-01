import { IonButton, IonCol, IonGrid, IonInput, IonItem, IonList, IonRow } from "@ionic/react";
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
        reValidateMode: "onSubmit"
    });

    const [index, setIndex] = useState(0);
    const [pets, setPets] = useState<Array<PetInfo>>([]);
    const [sex, setSex] = useState<string>("");

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

    const assignSex = (s: string) => {
        console.log('setting sex: ' + s);
        if(s == 'male'){
            setSex('male');
        } else {
            setSex('female');
        }
    }

    return (
        <IonGrid class="slide-grid ion-justify-content-center ion-align-items-center ion-align-self-center ion-text-center">
            <IonRow class="spacer"></IonRow>
                <IonRow>
                    <IonCol size="10" className="slide-content">
                        <h1>Pet Information</h1>
                    </IonCol>
                </IonRow>
            <IonRow class="spacer"></IonRow>
        </IonGrid>
    );
};

export default PetQuestions;