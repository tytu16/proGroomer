import { IonButton, IonCol, IonGrid, IonInput, IonRow, IonSlide } from "@ionic/react";
import { useForm } from "react-hook-form";
import "./Questions.css";

export interface HumanQuestionsProps {
    toPetInfo: () => void,
    toFamilyInfo: () => void,
    anotherHuman: () => void
}

const HumanQuestions = (props: HumanQuestionsProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onTouched",
        reValidateMode: "onChange"
    });

    const fakeSubmit = () => {
        console.log("human question submit");
    }

    return (

        <IonSlide>
            <IonGrid class="ion-justify-content-center ion-align-items-center ion-align-self-center">
                <IonRow class="spacer"></IonRow>
                    <IonRow>
                        <IonCol size="10" className="slide-content">
                            <h1>Human Information</h1>

                            <form onSubmit={handleSubmit(fakeSubmit)}>
                                <IonInput class="input-field" placeholder="First name" {...register("firstName", {required: true})} />
                                <IonInput class="input-field" placeholder="Last name" {...register("lastName", {required: true})} />
                                <IonInput class="input-field" placeholder="email" {...register("email", {required: true})} />
                                <IonGrid>
                                    <IonRow>
                                        <IonCol>
                                            <IonButton expand="block" no-margin type="submit" onClick={handleSubmit(props.anotherHuman)}>Add Another</IonButton>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol no-padding>
                                            <IonButton expand="block" no-margin type="submit" onClick={handleSubmit(props.toFamilyInfo)}> &lt;Fam</IonButton>
                                        </IonCol>
                                        <IonCol no-padding>
                                            <IonButton expand="block" no-margin type="submit" onClick={handleSubmit(props.toPetInfo)}>Pet &gt;</IonButton>
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

export default HumanQuestions;