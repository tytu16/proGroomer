import { IonButton, IonCol, IonGrid, IonItem, IonList, IonRow } from "@ionic/react";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { HumanInfo } from "../../models/HumanInfo";
import "./Questions.css";
import {MyTextInput} from "../InputFields/MyTextInput";
import {PhoneFieldInput} from "../InputFields/PhoneField"

import 'swiper/swiper.min.css';
import '@ionic/react/css/ionic-swiper.css';

export interface HumanQuestionsProps {
    toPetInfo: (human: HumanInfo | null) => void,
    toFamilyInfo: () => void,
    anotherHuman: (human: HumanInfo) => void
}

const HumanQuestions = (props: HumanQuestionsProps) => {
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        mode: "onTouched",
        reValidateMode: "onSubmit",
        defaultValues:{
            "phoneNumbers": [{value: "(111)-111-1111"}],
            "firstName": "",
            "lastName": "",
            "email": ""
            }
    });
    const {fields, remove, append} = useFieldArray({
        name: "phoneNumbers",
        control,
        keyName: "key"
    })
    const [index, setIndex] = useState(0);
    const [humans, setHumans] = useState<Array<HumanInfo>>([])


    const saveHuman = (data: any) => {
        console.log('raw human form data');
        console.log(data);
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
            let localHumans = humans.slice();
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
        <IonGrid class="slide-grid ion-justify-content-center ion-align-items-center ion-align-self-center">
            <IonRow class="spacer"></IonRow>
                <IonRow>
                    <IonCol size="10" className="slide-content">
                        <h1>Human Information</h1>
                    </IonCol>
                </IonRow>
            <IonRow class="spacer"></IonRow>
        </IonGrid>
    );
};

export default HumanQuestions;