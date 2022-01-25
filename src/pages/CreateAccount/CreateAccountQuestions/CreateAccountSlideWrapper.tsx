import { useState } from "react";
import { AccountInfo } from "../../../models/AccountInfo";
import AccountQuestions from "./AccountQuestions";
import PeopleQuestions from "./PeopleQuestions";
import PetQuestions from "./PetQuestions";
import AccountSummary from "./AccountSummary"

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import { Keyboard, Pagination, Navigation, Scrollbar, Zoom, A11y } from 'swiper';

import 'swiper/modules/keyboard/keyboard.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/scrollbar/scrollbar.min.css';
import 'swiper/modules/zoom/zoom.min.css';
import '@ionic/react/css/ionic-swiper.css';

export interface CreateAccountSlideWrapperProps {
    index: number,
    accountNames: Array<string>,
    saveAccountInfo: (newAccount: AccountInfo) => void,
    handleAccountNames: (name: string, index: number) => void,
    submitAccount: (index: number) => void,
    toTop: () => void
}

const CreateAccountSlideWrapper = (props: CreateAccountSlideWrapperProps) => {

    const [swiper, setSwiper] = useState<any>(null);

    const saveAccountToPeople = (newAccount?: AccountInfo) => {
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

    const submitAccountAndBackToList = () => {
        props.submitAccount(props.index);
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
                <AccountQuestions accountNames={props.accountNames} handleAccountNames={props.handleAccountNames} index={props.index} toPeopleInfo={saveAccountToPeople} />
            </SwiperSlide>
            <SwiperSlide>
                <PeopleQuestions index={props.index} toAccountInfo={toPreviousSlide} toPetInfo={toNextSlide}/>
            </SwiperSlide>
            <SwiperSlide>
                <PetQuestions index={props.index} backToPeople={toPreviousSlide} reviewAccount={toNextSlide} />
            </SwiperSlide>
            <SwiperSlide>
                <AccountSummary index={props.index} submitAndEnd={()=>{}} submitAndRepeat={()=>{}} backToPets={toPreviousSlide}></AccountSummary>
            </SwiperSlide>
        </Swiper>
    );
}

export default CreateAccountSlideWrapper;