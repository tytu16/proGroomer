import { IonContent, IonGrid, IonRow, IonSlides } from "@ionic/react";
import {useForm } from 'react-hook-form'

import './CreateFamily.css'; 
import { FamilyInfo } from "../../models/FamilyInfo";
import { HumanInfo } from "../../models/HumanInfo";
import { useHistory } from "react-router";
import { PetInfo } from "../../models/PetInfo";
import { useRef, useState } from "react";
import CreateFamilySlide from "../../components/CreateFamilySlide";
import FamilyQuestions from "../../components/CreateFamily/FamilyQuestions";
import HumanQuestions from "../../components/CreateFamily/HumanQuestions";
import PetQuestions from "../../components/CreateFamily/PetQuestions";

export interface CreateFamilyProps {
    onCreateFamily: (family: FamilyInfo) => void,
    index: number
}

export interface CreateFamilyState {
    familyName: string,
    humans: HumanInfo[],
    pets: PetInfo[]
}

const CreateFamily = (props: CreateFamilyProps) => {
    const { onCreateFamily, index } = props;
    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onTouched",
        reValidateMode: "onChange"
    });

    const sliderRef = useRef(document.createElement('ion-slides'));
	const [ newFamily, setNewFamily ] = useState(new FamilyInfo({}));

	const slideContent = [
		{
			title: "Family Info",
			text: "Family Name, Address info, etc n shit"
		},
		{
			title: "Human Info",
			text: "Name, pronoun, email, phone num, etc n shit"
		},
		{
			title: "Pet Info",
			text: "Breed, age, sex, etc n shit"
		}
	];

    const toFamilyInfo = () => {
        console.log('in creat family, back family info');
        sliderRef.current.slidePrev();
    }

    const toHumanInfo = (newFamily: FamilyInfo) => {
        console.log('in createFamily, to human info we go');
        sliderRef.current.slideNext();
    }

    const anotherHuman = () => {
        console.log("add a human");
    }

    const toPreviousSlide = () => {
        console.log("to prev slide");
        sliderRef.current.slidePrev();
    }

    const toNextSlide = () => {
        console.log("to next slide");
        sliderRef.current.slideNext();
    }

    const anotherPet = () => {
        console.log("add a pet");
    }



    const onSubmit = (data: any) => {
        console.log(data);
        let newHuman: HumanInfo = new HumanInfo({
            firstName: data.firstName,
            lastName:  data.lastName,
        });
        let newFamily = new FamilyInfo({
            familyName: data.familyName,
            humans: [newHuman],
            id: index+1,
            addrOne: data.addrOne,
            addrTwo: data.addrTwo,
            addrCity: data.addrCity,
            addrState: data.addrState,
            addrZip: data.addrZip,
        })
        onCreateFamily(newFamily);
        history.goBack();
    }

    return (
        <IonContent>
            <IonGrid class="thing">
                <IonRow>
                    <IonSlides pager={ true } ref={ sliderRef } id="slider" options={{ slidesPerView: "auto", zoom: true, grabCursor: true, allowTouchMove: false }}>
                        <FamilyQuestions toHumanInfo={toHumanInfo} />
                        <HumanQuestions toFamilyInfo={toPreviousSlide} anotherHuman={anotherHuman} toPetInfo={toNextSlide}/>
                        <PetQuestions anotherPet={anotherPet} backToHumans={toPreviousSlide} submitFamily={onSubmit} />
                    </IonSlides>
                </IonRow>
            </IonGrid>
        </IonContent>

    );
}

export default CreateFamily;