import { IonButton, IonCol, IonGrid, IonInput, IonItem, IonList, IonRow, IonSelect, IonSelectOption, IonSlide } from "@ionic/react";
import { useForm } from "react-hook-form";
import { FamilyInfo } from "../../models/FamilyInfo";
import "./Questions.css";
import { MyTextInput } from "../InputFields/MyTextInput";
import { MySelectList } from "../InputFields/MySelectList";
import { StateList } from "../../models/Enums/States";

export interface FamilyQuestionsProps {
    toHumanInfo: (newFamily: FamilyInfo) => void,
    index: string
}

const FamilyQuestions = (props: FamilyQuestionsProps) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onTouched",
        reValidateMode: "onSubmit"
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
            <IonGrid class="slide-grid ion-justify-content-center ion-align-items-center ion-align-self-center ion-no-padding">
                <IonRow class="spacer"></IonRow>
                    <IonRow>
                        <IonCol size="10" className="slide-content">
                            <h1>Family Information</h1>

                            <form onSubmit={handleSubmit(fakeSubmit)}>
                                <IonList class="question-list">
                                    <IonItem class="input-item ion-no-padding">
                                        <MyTextInput label="Family Name" placeholder="Family Name" name="familyName" register={register} required={false} />        
                                    </IonItem>
                                    <IonItem class="input-item ion-no-padding">
                                        <MyTextInput placeholder="123 Some St" label="Address One" name="addrOne" register={register} required={false} />
                                    </IonItem>
                                    <IonItem class="input-item ion-no-padding">
                                        <MyTextInput placeholder="Apt 321" label="Address Two" name="addrTwo" register={register} required={false} />
                                    </IonItem>
                                    <IonItem class="input-item ion-no-padding">
                                        <MyTextInput placeholder="City" label="City" name="addrCity" register={register} required={false} />
                                    </IonItem>
                                    <IonItem class="input-item ion-no-padding">
                                        <MySelectList placeholder="State" label="State" name="addrState" register={register} required={false} valueList={StateList} />
                                    </IonItem>
                                    <IonItem class="input-item ion-no-padding">
                                        <MyTextInput placeholder="Zipcode" label="Zipcode"name="addrZip" register={register} required={false} />
                                    </IonItem>
                                </IonList>
                                <IonButton class="top-button" type="submit" onClick={handleSubmit(toHumans)}>Next</IonButton>
                            </form>
                        </IonCol>
                    </IonRow>
                <IonRow class="spacer"></IonRow>
            </IonGrid>
        </IonSlide>
    );
};

export default FamilyQuestions;