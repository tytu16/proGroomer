import { IonButton, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonList, IonRow, IonSlide } from "@ionic/react";
import { add } from "ionicons/icons";
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
    const { register, handleSubmit, reset, resetField, formState: { errors } } = useForm({
        mode: "onTouched",
        reValidateMode: "onChange"
    });

    const [index, setIndex] = useState(0);
    const [extraPhones, setExtraPhones] = useState<number>(0);
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
        
        newHuman.id = index.toString();
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
        setExtraPhones(0);
    }

    const saveHumanMove = (data: any) => {
        props.toPetInfo(saveHuman(data));
    }

    const fakeSubmit = () => {
        console.log("human question submit");
    }

    const addPhone = () => {
        const numPhones = extraPhones+1;
        setExtraPhones(numPhones);
        resetField("phoneNumber"+{numPhones});
    }

    return (

        <IonSlide>
            <IonGrid class="ion-justify-content-center ion-align-items-center ion-align-self-center">
                <IonRow class="spacer"></IonRow>
                    <IonRow>
                        <IonCol size="10" className="slide-content">
                            <h1>Human Information</h1>

                            <form onSubmit={handleSubmit(fakeSubmit)}>
                                <IonList>
                                    <IonItem class="input-item ion-no-padding">
                                        <IonInput class="input-field" placeholder="First name" {...register("firstName", {required: true})} />
                                    </IonItem>
                                    <IonItem class="input-item ion-no-padding">
                                        <IonInput class="input-field" placeholder="Last name" {...register("lastName", {required: true})} />
                                    </IonItem>                                                          
                                    <IonItem class="input-item ion-no-padding">
                                        <IonInput class="input-field" placeholder="email" {...register("email", {required: true})} />
                                    </IonItem>
                                    <IonItem class="input-item ion-no-padding">
                                        <IonInput class="input-field" type="number" placeholder="XXX-XXX-XXXX" {...register("phoneNumber-0", {required: true})} />
                                        <IonButton onClick={addPhone}>
                                            <IonIcon class="morePhonesButton" icon={add}></IonIcon>    
                                        </IonButton>                                        
                                    </IonItem>
                                    {/* ToDo: Third phone number icomes prepopulated with second */}
                                    {
                                        Array(extraPhones).fill(1).map( (_, i) => {
                                            return (
                                                <IonItem key={i} class="input-item ion-no-padding">
                                                    <IonInput class="input-field" type="number" placeholder="XXX-XXX-XXXX" {...register("phoneNumber-"+{i}, {required: true})} />                                  
                                                </IonItem>
                                            );                                        
                                        })                                        
                                    }
                                </IonList>
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