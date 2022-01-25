import { IonCol, IonGrid, IonLabel, IonList, IonRow, IonText } from "@ionic/react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {addCircleOutline, pencil} from "ionicons/icons";

import SummaryHeader from "../../../components/Accordion/SummaryHeader";
import SummaryAccordion from "../../../components/Accordion/SummaryAccordion";
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
    const {watch} = useFormContext();
    const accountSummary = watch(`account.${props.index}`);
    const people = accountSummary.person;
    const pets = accountSummary.pet;

    const [accountActive, setAccountActive] = useState<boolean>(true);
    const [peopleActive, setPeopleActive] = useState<boolean>(true);
    const [petsActive, setPetsActive] = useState<boolean>(true);
    console.log(accountSummary);
    return (
        <IonGrid>
            <IonRow><IonCol size="12">
            <IonList>
                <SummaryHeader isActive={accountActive} setIsActive={setAccountActive} label={"Account Info"} />
                <SummaryAccordion isActive={accountActive} fields={AccountFieldNames()}></SummaryAccordion>

                <SummaryHeader isActive={peopleActive} setIsActive={setPeopleActive} label={"People Info"}/>
                <SummaryAccordion isActive={peopleActive} fields={PeopleFieldNames()}></SummaryAccordion>

                <SummaryHeader isActive={petsActive} setIsActive={setPetsActive} label={"Pet Info"}/>
                <SummaryAccordion isActive={petsActive} fields={PetFieldNames()}></SummaryAccordion>
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