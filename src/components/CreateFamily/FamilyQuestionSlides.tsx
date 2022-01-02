import { useRef, useState } from "react";
import { useHistory } from "react-router";
import { FamilyInfo } from "../../models/FamilyInfo";
import { HumanInfo } from "../../models/HumanInfo";
import { PetInfo } from "../../models/PetInfo";
import FamilyQuestions from "./FamilyQuestions";
import HumanQuestions from "./HumanQuestions";
import PetQuestions from "./PetQuestions";

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import { Keyboard, Pagination, Navigation, Scrollbar, Zoom, A11y } from 'swiper';

import 'swiper/modules/keyboard/keyboard.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/scrollbar/scrollbar.min.css';
import 'swiper/modules/zoom/zoom.min.css';
import '@ionic/react/css/ionic-swiper.css';

export interface FamilyQuestionProps {
    index: number,
    saveFamilyInfo: (newFamily: FamilyInfo) => void,
    addHuman: (newHuman: HumanInfo) => void,
    addPet: (newPet: PetInfo) => void,
    submitFamily: (newPet: PetInfo | null) => void
}

const FamilyQuestionSlides = (props: FamilyQuestionProps) => {

    const history = useHistory();
    const [swiper, setSwiper] = useState<any>(null);

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
        if(swiper){
            swiper.slidePrev();
        }
    }

    const toNextSlide = () => {
        console.log("to next slide");
        if(swiper){
            swiper.slideNext();
        }
    
    }

    const SubmitFamilyAndBackToList = (petInfo: PetInfo | null) => {
        props.submitFamily(petInfo);
        history.goBack();
    }

    return(
        <Swiper
        className="swiper-no-swiping" 
        modules={[Navigation, Keyboard, Pagination, Scrollbar, Zoom, A11y]}
          keyboard={true}
          pagination={true}
          slidesPerView={1}
          scrollbar={true}
          zoom={true}
          onSwiper={setSwiper}
        >
            <SwiperSlide>
                <FamilyQuestions index={props.index} toHumanInfo={saveFamilyToHuman} />
            </SwiperSlide>
            <SwiperSlide>
                <HumanQuestions index={props.index} toFamilyInfo={toPreviousSlide} anotherHuman={props.addHuman} toPetInfo={toNextSlide}/>
            </SwiperSlide>
            <SwiperSlide>
                <PetQuestions anotherPet={props.addPet} backToHumans={toPreviousSlide} submitFamily={SubmitFamilyAndBackToList} />
            </SwiperSlide>
        </Swiper>
    );
}

export default FamilyQuestionSlides;