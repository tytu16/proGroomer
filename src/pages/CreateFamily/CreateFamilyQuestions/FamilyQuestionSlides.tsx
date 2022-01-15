import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { FamilyInfo } from "../../../models/FamilyInfo";
import { PersonInfo } from "../../../models/PersonInfo";
import { PetInfo } from "../../../models/PetInfo";
import FamilyQuestions from "./FamilyQuestions";
import PeopleQuestions from "./PeopleQuestions";
import PetQuestions from "./PetQuestions";

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import { Keyboard, Pagination, Navigation, Scrollbar, Zoom, A11y } from 'swiper';

import 'swiper/modules/keyboard/keyboard.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/scrollbar/scrollbar.min.css';
import 'swiper/modules/zoom/zoom.min.css';
import '@ionic/react/css/ionic-swiper.css';
import { IonContent } from "@ionic/react";

export interface FamilyQuestionProps {
    index: number,
    saveFamilyInfo: (newFamily: FamilyInfo) => void,
    addPerson: (newPerson: PersonInfo) => void,
    addPet: (newPet: PetInfo) => void,
    submitFamily: (newPet: PetInfo | null) => void,
    toTop: () => void
}

const FamilyQuestionSlides = (props: FamilyQuestionProps) => {

    const history = useHistory();
    const [swiper, setSwiper] = useState<any>(null);

    const saveFamilyToPeople = (newFamily: FamilyInfo) => {
        props.saveFamilyInfo(newFamily);
        toNextSlide();
    }

    const toPreviousSlide = () => {
        console.log("to prev slide");
        if(swiper){
            swiper.slidePrev();
            props.toTop();
        }
    }

    const toNextSlide = () => {
        console.log("to next slide");
        if(swiper){
            props.toTop();
            swiper.slideNext();
        }
    }

    const SubmitFamilyAndBackToList = () => {
        // props.submitFamily(petInfo);
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
          onSwiper={setSwiper}>
            <SwiperSlide>
                <FamilyQuestions index={props.index} toPeopleInfo={saveFamilyToPeople} />
            </SwiperSlide>
            <SwiperSlide>
                <PeopleQuestions index={props.index} toFamilyInfo={toPreviousSlide} toPetInfo={toNextSlide}/>
            </SwiperSlide>
            <SwiperSlide>
                <PetQuestions index={props.index} backToPeople={toPreviousSlide} submitFamily={SubmitFamilyAndBackToList} />
            </SwiperSlide>
        </Swiper>
    );
}

export default FamilyQuestionSlides;