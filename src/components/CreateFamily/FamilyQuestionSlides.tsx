import { IonSlides } from "@ionic/react";
import { useRef } from "react";
import { useHistory } from "react-router";
import { FamilyInfo } from "../../models/FamilyInfo";
import { HumanInfo } from "../../models/HumanInfo";
import { PetInfo } from "../../models/PetInfo";
import FamilyQuestions from "./FamilyQuestions";
import HumanQuestions from "./HumanQuestions";
import PetQuestions from "./PetQuestions";

export interface FamilyQuestionProps {
    index: string,
    saveFamilyInfo: (newFamily: FamilyInfo) => void,
    addHuman: (newHuman: HumanInfo) => void,
    addPet: (newPet: PetInfo) => void,
    submitFamily: (newPet: PetInfo | null) => void
}

const FamilyQuestionSlides = (props: FamilyQuestionProps) => {

    const history = useHistory();

    const sliderRef = useRef(document.createElement('ion-slides'));

    const saveFamilyToHuman = (newFamily: FamilyInfo) => {
        props.saveFamilyInfo(newFamily);
        toNextSlide();
    }

    const saveHumanToPet = (newHuman: HumanInfo | null) => {
        if(newHuman != null){
            props.addHuman(newHuman);
        }
        
        toNextSlide();
    }

    const toPreviousSlide = () => {
        console.log("to prev slide");
        sliderRef.current.slidePrev();
    }

    const toNextSlide = () => {
        console.log("to next slide");
        sliderRef.current.slideNext();
    }

    const SubmitFamilyAndBackToList = (petInfo: PetInfo | null) => {
        props.submitFamily(petInfo);
        history.goBack();
    }

    return(
        <IonSlides pager={ true } ref={sliderRef} id="slider" options={{ slidesPerView: "1", zoom: true, grabCursor: true, allowTouchMove: false }}>
            <FamilyQuestions index={props.index} toHumanInfo={saveFamilyToHuman} />
            <HumanQuestions toFamilyInfo={toPreviousSlide} anotherHuman={props.addHuman} toPetInfo={saveHumanToPet}/>
            <PetQuestions anotherPet={props.addPet} backToHumans={toPreviousSlide} submitFamily={SubmitFamilyAndBackToList} />
        </IonSlides>
    );
}

export default FamilyQuestionSlides;