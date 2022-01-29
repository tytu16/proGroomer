import { IonList } from "@ionic/react";
import { useFormContext } from "react-hook-form";
import { MyTextLabelInput } from "../../../components/InputFields/MyTextLabelInput";
import { MySelectList } from "../../../components/InputFields/MySelectList";
import { StateList } from "../../../models/Enums/States";
import {AccountQuestionFields, TextFieldPropInterface} from "./QuestionObjects"
import SlideWrapper from "../../../components/Slide/SlideWrapper";
import BottomSlideButtons from "../../../components/Slide/BottomButtons";
import "./Questions.scss"
import ModalFormWrapper from "../../../components/Modal/ModalFormWrapper";

export interface AccountQuestionsProps {
    handleAccountNames: (name: string, index: number) => void,
    accountNames: Array<string>,
    toPeopleInfo: () => void,
    index: number
}

const AccountQuestions = (props: AccountQuestionsProps) => {

    const {watch} = useFormContext();

    const toPeople = (data?: any) => {
        console.log('account data');
        console.log(watch());
        props.toPeopleInfo();
    }

    const handleFieldChange = (data: string, name: string) => {
        props.handleAccountNames(data, Number.parseInt(name.split('.')[1]));
    }

    const renderFields = (field: any, questionIndex: number) => {
        switch(field.fieldName){
            case "addressState":
                return (<MySelectList key={questionIndex} index={props.index} valueList={StateList}
                    placeholder={field.placeholder} label={field.label} addStyling={true} defaultValue={"MO"}
                    objectType={field.objectType} fieldName={field.fieldName} required={field.required}
                />);

            case "note":
                let accountName = (props.accountNames[props.index] && props.accountNames[props.index] != '') ? 
                props.accountNames[props.index] : `Account ${props.index+1}`;
                return (<ModalFormWrapper key={questionIndex} label={accountName} defaultOn={false}
                            formName={`${field.objectType}.${props.index}.note`}/>);

            default:
                return (<MyTextLabelInput key={questionIndex} required={field.required}
                    placeholder={field.placeholder} label={field.label} 
                    onChange={handleFieldChange} watched={field.watched}
                    fieldName={`${field.objectType}.${props.index}.${field.fieldName}`}
                />);
        }
    }

    return (
        <SlideWrapper title="Account Information">
            <IonList>{
                AccountQuestionFields.map((field: TextFieldPropInterface, questionIndex: number) => {
                    return renderFields(field, questionIndex);
                })
            }</IonList>
            <BottomSlideButtons numButtons="one" buttonOneLabel="People &gt;" buttonOneClick={toPeople}/>
        </SlideWrapper>
    );
};

export default AccountQuestions;