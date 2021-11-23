import { IonButton, IonCol, IonGrid, IonInput, IonItem, IonList, IonRow, IonSelect, IonSelectOption, IonSlide } from "@ionic/react";
import { useForm } from "react-hook-form";
import { FamilyInfo } from "../../models/FamilyInfo";
import "./Questions.css";
import { State, StateList } from "../../models/Enums/States";

export interface FamilyQuestionsProps {
    toHumanInfo: (newFamily: FamilyInfo) => void,
    index: string
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
        console.log('to humans');
        console.log(data);
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
                                <IonList>
                                    <IonItem class="input-item ion-no-padding">
                                        <IonInput class="input-field" placeholder="Family Name" {...register("familyName", {required: true})} />        
                                    </IonItem>
                                    <IonItem class="input-item ion-no-padding">
                                        <IonInput class="input-field" placeholder="123 Some st" {...register("addrOne", {required: true})} />
                                    </IonItem>
                                    <IonItem class="input-item ion-no-padding">
                                        <IonInput class="input-field" placeholder="Apt 321" {...register("addrTwo", {required: false})} />
                                    </IonItem>
                                    <IonItem class="input-item ion-no-padding">
                                        <IonInput class="input-field" placeholder="City" {...register("addrCity", {required: true})} />
                                    </IonItem>
                                    <IonItem class="input-item ion-no-padding">
                                            <IonSelect id="state-list" placeholder="State" {...register("addrState")}>
                                                {
                                                    //ToDo: Needs to have empty state
                                                    Object(StateList).map((s:State) => {
                                                        return (
                                                            <IonSelectOption key={s.code} value={s.name}>{s.name}</IonSelectOption>
                                                        );
                                                    })
                                                }
                                            </IonSelect>
                                    </IonItem>
                                    <IonItem class="input-item ion-no-padding">
                                        <IonInput class="input-field" placeholder="Zipcode" {...register("addrZip", {required: true})} />
                                    </IonItem>
                                </IonList>
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