import { IonButton, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonList, IonRow, IonSlide } from "@ionic/react";
import { add } from "ionicons/icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { HumanInfo } from "../../models/HumanInfo";
import "./Questions.css";
import {MyTextInput} from "../InputFields/MyTextInput";
import {PhoneFieldInput} from "../InputFields/PhoneField"

export interface HumanQuestionsProps {
    toPetInfo: (human: HumanInfo | null) => void,
    toFamilyInfo: () => void,
    anotherHuman: (human: HumanInfo) => void
}

const HumanQuestions = (props: HumanQuestionsProps) => {
    const { register, handleSubmit, control ,formState: { errors } } = useForm({
        mode: "onTouched",
        reValidateMode: "onChange"
    });
    const [index, setIndex] = useState(0);
    const [extraPhones, setExtraPhones] = useState<string[]>([""]);
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
        setExtraPhones([""]);
    }

    const saveHumanMove = (data: any) => {
        props.toPetInfo(saveHuman(data));
    }

    const fakeSubmit = () => {
        console.log("human question submit");
    }

    const addPhone = () => {
        console.log('adding phone');
        let localPhones = extraPhones.slice();
        console.log('phones before: ');
        console.log(localPhones);
        localPhones.push("");
        setExtraPhones(localPhones);
        console.log('phoneAfter');
    }

    const removePhone = (i:number) => {
        console.log('adding phone');
        let localPhones = extraPhones.slice();
        if(i+1 == localPhones.length){
            localPhones.pop();
        } else {
            localPhones = localPhones.slice(0,i).concat(localPhones.slice(i))
        }
        console.log('phones before: ');
        console.log(localPhones);
        setExtraPhones(localPhones);
        console.log('phoneAfter');
    }

    const formatPhone = (i:number) => {
        console.log(`formattingPhone ${i}`);
        let localPhones = extraPhones;
        let editNum = localPhones[i];
        console.log('numBefore: ');
        console.log(editNum);
        
        //normalize string and remove all unnecessary characters
        editNum = editNum.replace(/[^\d]/g, "");
        editNum = editNum.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    
        localPhones[i] = editNum;
        setExtraPhones(localPhones);
        
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
                                        <MyTextInput placeholder="First Name" label="First Name" name="firstName" register={register} required={false} />
                                    </IonItem>
                                    <IonItem class="input-item ion-no-padding">
                                        <MyTextInput placeholder="Last Name" label="Last Name" name="lastName" register={register} required={false} />
                                    </IonItem>                                                          
                                    <IonItem class="input-item ion-no-padding">
                                        <MyTextInput placeholder="email@domain.com" label="Email" register={register} required={false} />
                                    </IonItem>
                                    <IonItem class="input-item ion-no-padding">
                                        <IonButton onClick={addPhone}><IonIcon icon={add}></IonIcon></IonButton>
                                        <Controller
                                        name="test"
                                        control={control}
                                        render={({
                                            field: { onChange, onBlur, value, name, ref },
                                            fieldState: { invalid, isTouched, isDirty, error },
                                            formState,
                                          }) => {
                                            return (<MyTextInput label={"Phone Number"} placeholder="PhoneNumber" register={register} required={true}/>);
                                        }}
                                        />
                                                                       
                                    </IonItem>
                                    {
                                        extraPhones.slice(1).map( (phone, i) => {
                                            return (
                                                <PhoneFieldInput removePhoneInput={() => {

                                                }} i={i+1} register={register} required={false} />
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