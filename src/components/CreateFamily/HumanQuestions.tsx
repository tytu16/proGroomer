import { IonButton, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonList, IonRow, IonSlide } from "@ionic/react";
import { addCircleOutline } from "ionicons/icons";
import { useRef, useState } from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
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
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        mode: "onTouched",
        reValidateMode: "onChange",
        defaultValues:{"phoneNum": [{value: ""}]}
    });
    const {fields, remove, append} = useFieldArray({
        name: "phoneNum",
        control,
        keyName: "key"
    })
    const ref = useRef();
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
   }

    const saveHumanMove = (data: any) => {
        props.toPetInfo(saveHuman(data));
    }

    const fakeSubmit = () => {
        console.log("human question submit");
    }

    const formatPhone = (i:number) => {
        // console.log(`formattingPhone ${i}`);
        // let localPhones = phoneNumbers;
        // let editNum = localPhones[i];
        // console.log('numBefore: ');
        // console.log(editNum);
        
        // //normalize string and remove all unnecessary characters
        // editNum = editNum.replace(/[^\d]/g, "");
        // editNum = editNum.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    
        // localPhones[i] = editNum;
        // setPhoneNumbers(localPhones);
        
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
                                    {
                                        fields.map((field, index) => (
                                            // <input key={field.key} {...register(`phoneNum.${index}.value`)}></input>
                                            index == 0 ? (
                                                <PhoneFieldInput field={field} key={field.key} i={index} addPhoneInput={() => {
                                                    append({value: ""});
                                                }} register={register} required={true} />
                                            ) : (
                                                <PhoneFieldInput field={field} key={field.key} i={index} removePhoneInput={() => {
                                                    remove(index);
                                                }} register={register} required={false} />
                                            )
                                        ))
                                    }
                                        {/* <Controller
                                        name="test"
                                        control={control}
                                        render={({
                                            field: { onChange, onBlur, value, name, ref },
                                            fieldState: { invalid, isTouched, isDirty, error },
                                            formState,
                                          }) => {
                                        }}
                                        /> */}
                                                                       
                                    
                                    
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