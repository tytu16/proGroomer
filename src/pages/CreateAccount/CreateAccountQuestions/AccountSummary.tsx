import { IonCol, IonGrid, IonLabel, IonList, IonRow, IonText } from "@ionic/react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import SummaryHeader from "../../../components/Accordion/SummaryHeader";
import SummaryAccordion from "../../../components/Accordion/SummaryAccordion";

export interface AccountSummaryProps {
    index: number,
    submitAndRepeat: Function,
    submitAndEnd: Function
}

const AccountSummary = (props: AccountSummaryProps) => {
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
            <IonList>
                <SummaryHeader isActive={accountActive} setIsActive={setAccountActive} label={"Account Info"} />
                <SummaryAccordion isActive={accountActive} label={"Account Stuff!"}></SummaryAccordion>

                <SummaryHeader isActive={peopleActive} setIsActive={setPeopleActive} label={"People Info"}/>
                <SummaryAccordion isActive={peopleActive} label={"People Stuff!"}></SummaryAccordion>

                <SummaryHeader isActive={petsActive} setIsActive={setPetsActive} label={"Pet Info"}/>
                <SummaryAccordion isActive={petsActive} label={"Pet Stuff!"}></SummaryAccordion>
            </IonList>
        </IonGrid>
    );
}

export default AccountSummary;