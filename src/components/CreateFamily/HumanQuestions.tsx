import { IonButton, IonCol, IonGrid, IonInput, IonRow, IonSlide } from "@ionic/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HumanInfo } from "../../models/HumanInfo";
import "./Questions.css";

export interface HumanQuestionsProps {
    toPetInfo: (human: HumanInfo | null) => void,
    toFamilyInfo: () => void,
    anotherHuman: (human: HumanInfo) => void
}

const HumanQuestions = (props: HumanQuestionsProps) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: "onTouched",
        reValidateMode: "onChange"
    });

    const [index, setIndex] = useState(0);
    const [humans, setHumans] = useState<Array<HumanInfo>>([])

    const saveHuman = (data: any) => {
        const newHuman = new HumanInfo(data);
        if(humans.length > 0){
            for(let human of humans ){
                if(human.isEqualWithoutId(newHuman)){
                    console.log('we already have this person');
                    return null;
                }
            }
        }
        
        newHuman.id = index;
        console.log('new human created: ');
        console.log(newHuman);
        setIndex(index+1);

        if(humans.length == 0){
            setHumans([newHuman]);    
        } else {
            let localHumans = humans;
            localHumans.push(newHuman);
            setHumans(localHumans);
        }
        
        return newHuman;
    }

    const saveHumanNoMove = (data: any) => {
        console.log('saving human with no move');
        const newHuman = saveHuman(data);
        if(newHuman == null){
            // already have this person,
            // ToDo: should probably put a toast out there
            return;
        }
        props.anotherHuman(newHuman);
    }

    const saveHumanMove = (data: any) => {
        props.toPetInfo(saveHuman(data));
    }

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
                                            <IonButton expand="block" no-margin type="reset" onClick={handleSubmit(saveHumanNoMove)}>Add Another</IonButton>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol no-padding>
                                            <IonButton expand="block" no-margin type="submit" onClick={props.toFamilyInfo}> &lt;Fam</IonButton>
                                        </IonCol>
                                        <IonCol no-padding>
                                            <IonButton expand="block" no-margin type="submit" onClick={handleSubmit(saveHumanMove)}>Pet &gt;</IonButton>
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