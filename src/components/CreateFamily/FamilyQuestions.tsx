import { IonButton, IonCol, IonGrid, IonInput, IonRow, IonSlide } from "@ionic/react";
import { useForm } from "react-hook-form";
import { FamilyInfo } from "../../models/FamilyInfo";
import "./Questions.css";

export interface FamilyQuestionsProps {
    toHumanInfo: (newFamily: FamilyInfo) => void,
    index: number
}

const FamilyQuestions = (props: FamilyQuestionsProps) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onTouched",
        reValidateMode: "onChange"
    });

    const fakeSubmit = (data: any) => {
        console.log('Family Question submit button');
    };

    const toHumans = (data: any) => {
        const newFamily = new FamilyInfo(data);
        newFamily.id = props.index;
        props.toHumanInfo(newFamily);
    }

    return (

        <IonSlide>
            <IonGrid class="ion-justify-content-center ion-align-items-center ion-align-self-center">
                <IonRow class="spacer"></IonRow>
                    <IonRow>
                        <IonCol size="10" className="slide-content">
                            <h1>Family Information</h1>

                            <form onSubmit={handleSubmit(fakeSubmit)}>
                                <IonInput class="input-field" placeholder="Family Name" {...register("familyName", {required: true})} />
                                <IonInput class="input-field" placeholder="123 Some st" {...register("addrOne", {required: true})} />
                                <IonInput class="input-field" placeholder="Apt 321" {...register("addrTwo", {required: false})} />
                                <IonInput class="input-field" placeholder="City" {...register("addrCity", {required: true})} />
                                <IonInput class="input-field" placeholder="State" {...register("addrState", {required: true})} />
                                <IonInput class="input-field" placeholder="Zipcode" {...register("addrZip", {required: true})} />
                                <IonButton type="submit" onClick={handleSubmit(toHumans)}>Next</IonButton>
                            </form>
                        </IonCol>
                    </IonRow>
                <IonRow class="spacer"></IonRow>
            </IonGrid>
        </IonSlide>
    );
};

export default FamilyQuestions;