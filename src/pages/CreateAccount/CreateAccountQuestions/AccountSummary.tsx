import { IonCol, IonGrid, IonList, IonRow } from "@ionic/react";
import { useState } from "react";
import {addCircleOutline} from "ionicons/icons";

import SummaryHeader from "../../../components/Accordion/Summaries/SummaryHeader";
import SummaryAccordionWrapper from "../../../components/Accordion/Summaries/SummaryAccordionWrapper";
import {AccountSummaryContent, PeopleSummaryContent, PetsSummaryContent} from "../../../components/Accordion/Summaries/SummaryContent";
import BottomSlideButtons from "../../../components/Slide/BottomButtons";

export interface AccountSummaryProps {
    index: number,
    submitAndRepeat: Function,
    submitAndEnd: Function,
    backToPets: Function
}

const AccountSummary = (props: AccountSummaryProps) => {
    const {submitAndEnd, submitAndRepeat, backToPets} = props;

    const [accountActive, setAccountActive] = useState<boolean>(true);
    const [peopleActive, setPeopleActive] = useState<boolean>(true);
    const [petsActive, setPetsActive] = useState<boolean>(true);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const accountFormName = `account.${props.index}`;
    const peopleFormName = `${accountFormName}.person`; 
    const petsFormName = `${accountFormName}.pet`;


    //Todo: Handle errors
    const handleSubmitEnd = () => {
        setIsSubmitted(true);
        submitAndEnd();
    }

    const handleSubmitRepeat = () => {
        setIsSubmitted(true);
        submitAndRepeat();
    }

    return (
        <IonGrid>
            <IonRow><IonCol size="12">
            <IonList>
                {/* Could make headers slidable to make account editable again */}
                <SummaryHeader isActive={accountActive} setIsActive={setAccountActive} label={"Account Info"} />
                <SummaryAccordionWrapper isActive={accountActive} >
                    <AccountSummaryContent isSubmitted={isSubmitted} fieldIndex={props.index} formName={accountFormName}></AccountSummaryContent>
                </SummaryAccordionWrapper>

                <SummaryHeader isActive={peopleActive} setIsActive={setPeopleActive} label={"People Info"}/>
                <SummaryAccordionWrapper isActive={peopleActive}>
                    <PeopleSummaryContent isSubmitted={isSubmitted} fieldIndex={props.index} formName={peopleFormName}></PeopleSummaryContent>
                </SummaryAccordionWrapper>

                <SummaryHeader isActive={petsActive} setIsActive={setPetsActive} label={"Pet Info"}/>
                <SummaryAccordionWrapper isActive={petsActive}>
                    <PetsSummaryContent isSubmitted={isSubmitted} fieldIndex={props.index} formName={petsFormName}></PetsSummaryContent>
                </SummaryAccordionWrapper>
            </IonList>
            </IonCol></IonRow>
            { !isSubmitted && <BottomSlideButtons numButtons="three"
                buttonOneLabel={"Add Another Account"} buttonOneIcon={addCircleOutline} buttonOneClick={handleSubmitRepeat}
                buttonTwoLabel="&lt; Pets" buttonTwoClick={()=>backToPets}
                buttonThreeLabel="Submit &gt;" buttonThreeClick={handleSubmitEnd}/>}
        </IonGrid>
    );
}

export default AccountSummary;