
import { IonItem, IonLabel } from "@ionic/react";
import { AccountFieldNames, PeopleFieldNames, PetFieldNames } from "../../../pages/CreateAccount/CreateAccountQuestions/QuestionObjects";

interface SummaryContentProps{
    formName: string,
    fieldIndex: number
}

const SummaryContent = (props: SummaryContentProps) => {
    return (<IonItem key={props.fieldIndex} slot="content" mode='md' lines="none">
                <IonLabel>{props.formName}</IonLabel>
            </IonItem>
    );
}

export const AccountSummaryContent = (props: SummaryContentProps) => {
    const fields  = AccountFieldNames().map(f => {
        return (`${props.formName}.${f}`);
    });

    return (<>
        {fields.map((f:string, fieldIndex) => {
            if(!(f.includes("person") || f.includes("pet"))){
                if(f.includes("note")){
                    return (<SummaryContent formName={f} fieldIndex={fieldIndex}></SummaryContent>);
                } else {
                    return (<SummaryContent formName={f} fieldIndex={fieldIndex}></SummaryContent>);
                }
            }
        })}
    </>);
}

export const PeopleSummaryContent = (props: SummaryContentProps) => {
    const fields  = PeopleFieldNames().map(f => {
        return (`${props.formName}.${f}`);
    });
    return (<>
        {fields.map((f, fieldIndex) => {
            if(f.includes("note")){
                return (<SummaryContent formName={f} fieldIndex={fieldIndex}></SummaryContent>);
            } else {
                return (<SummaryContent formName={f} fieldIndex={fieldIndex}></SummaryContent>);
            }
        })}
    </>);
}

export const PetsSummaryContent = (props: SummaryContentProps) => {
    
    const fields  = PetFieldNames().map(f => {
        return(`${props.formName}.${f}`);
    });
    return (<>
        {fields.map((f, fieldIndex) => {
            if(f.includes("note")){
                return (<SummaryContent formName={f} fieldIndex={fieldIndex}></SummaryContent>);
            } else {
                return (<SummaryContent formName={f} fieldIndex={fieldIndex}></SummaryContent>);
            }
        })}
    </>);
}