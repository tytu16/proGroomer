import { IonCol, IonGrid, IonLabel, IonList, IonRow, IonText } from "@ionic/react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {addCircleOutline, pencil} from "ionicons/icons";

import SummaryHeader from "../../../components/Accordion/Summaries/SummaryHeader";
import SummaryAccordionWrapper from "../../../components/Accordion/Summaries/SummaryAccordionWrapper";
import {AccountSummaryContent, PeopleSummaryContent, PetsSummaryContent} from "../../../components/Accordion/Summaries/SummaryContent";
import { AccountFieldNames, PeopleFieldNames, PetFieldNames } from "./QuestionObjects";
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

    const accountFormName = `account.${props.index}`;
    const peopleFormName = `${accountFormName}.person`; 
    const petsFormName = `${accountFormName}.pet`;

    return (
        <IonGrid>
            <IonRow><IonCol size="12">
            <IonList>
                <SummaryHeader isActive={accountActive} setIsActive={setAccountActive} label={"Account Info"} />
                <SummaryAccordionWrapper isActive={accountActive} >
                    <AccountSummaryContent fieldIndex={props.index} formName={accountFormName}></AccountSummaryContent>
                </SummaryAccordionWrapper>

                <SummaryHeader isActive={peopleActive} setIsActive={setPeopleActive} label={"People Info"}/>
                <SummaryAccordionWrapper isActive={peopleActive}>
                    <PeopleSummaryContent fieldIndex={props.index} formName={peopleFormName}></PeopleSummaryContent>
                </SummaryAccordionWrapper>

                <SummaryHeader isActive={petsActive} setIsActive={setPetsActive} label={"Pet Info"}/>
                <SummaryAccordionWrapper isActive={petsActive}>
                    <PetsSummaryContent fieldIndex={props.index} formName={petsFormName}></PetsSummaryContent>
                </SummaryAccordionWrapper>
            </IonList>
            </IonCol></IonRow>
            <BottomSlideButtons numButtons="three"
                buttonOneLabel={"Add Another Account"} buttonOneIcon={addCircleOutline} buttonOneClick={()=>submitAndRepeat()}
                buttonTwoLabel="&lt; Pets" buttonTwoClick={()=>backToPets()}
                buttonThreeLabel="Submit &gt;" buttonThreeClick={()=>submitAndEnd()}/>
        </IonGrid>
    );
}

export default AccountSummary;