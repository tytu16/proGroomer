import { IonButton, IonCol, IonGrid, IonInput, IonRow, IonSlide } from "@ionic/react";
import { useForm } from "react-hook-form";
import { PetInfo } from "../../models/PetInfo";
import "./Questions.css";

export interface PetQuestionsProps{
    anotherPet: () => void,
    backToHumans: () => void,
    submitFamily: (petInfo: PetInfo) => void,

}

const PetQuestions = (props: PetQuestionsProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onTouched",
        reValidateMode: "onChange"
    });

    const submitPetInfo = (data: any) => {
        let newPet = new PetInfo({
            id: 0,
            name: data.petName,
            breed: data.petBreed,
            sex: data.petSex
        })
        props.submitFamily(newPet);
    }

    return (

        <IonSlide>
            <IonGrid class="ion-justify-content-center ion-align-items-center ion-align-self-center">
                <IonRow class="spacer"></IonRow>
                    <IonRow>
                        <IonCol size="10" className="slide-content">
                            <h1>Pet Information</h1>

                            <form onSubmit={handleSubmit(()=>{})}>
                                <IonInput class="input-field" placeholder="Name" {...register("petName", {required: true})} />
                                <IonInput class="input-field" placeholder="Breed" {...register("petBreed", {required: true})} />
                                <IonInput class="input-field" placeholder="Male or Female" {...register("petSex", {required: true})} />
                                <IonGrid>
                                    <IonRow>
                                        <IonCol>
                                            <IonButton expand="block" no-margin type="submit" onClick={handleSubmit(props.anotherPet)}>Add Another</IonButton>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol no-padding>
                                            <IonButton expand="block" no-margin type="submit" onClick={handleSubmit(props.backToHumans)}>&lt; H</IonButton>
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