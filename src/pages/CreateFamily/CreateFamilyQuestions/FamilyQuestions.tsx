import { IonButton, IonCol, IonGrid, IonList, IonRow  } from "@ionic/react";
import { useFormContext } from "react-hook-form";
import { FamilyInfo } from "../../../models/FamilyInfo";
import { MyTextLabelInput } from "../../../components/InputFields/MyTextLabelInput";
import { MySelectList } from "../../../components/InputFields/MySelectList";
import { StateList } from "../../../models/Enums/States";
import {FamilyQuestionFields, TextFieldPropInterface} from "./QuestionObjects"
import SlideWrapper from "../../../components/Slide/SlideWrapper";
import BottomSlideButtons from "../../../components/Slide/BottomButtons";
import "./Questions.css"
import ModalFormWrapper from "../../../components/Modal/ModalFormWrapper";
import { useState } from "react";

export interface FamilyQuestionsProps {
    handleFamilyNames: (name: string, index: number) => void,
    familyNames: Array<string>,
    toPeopleInfo: () => void,
    index: number
}

const FamilyQuestions = (props: FamilyQuestionsProps) => {

    const {watch} = useFormContext();

    const toPeople = (data?: any) => {
        console.log('family data');
        console.log(watch());
        props.toPeopleInfo();
    }

    const handleFieldChange = (data: string, name: string) => {
        props.handleFamilyNames(data, Number.parseInt(name.split('.')[1]));
    }

    const renderFields = (field: any, questionIndex: number) => {
        switch(field.fieldName){
            case "addressState":
                return (<MySelectList key={questionIndex} index={props.index} valueList={StateList}
                    placeholder={field.placeholder} label={field.label} addStyling={true}
                    objectType={field.objectType} fieldName={field.fieldName} required={field.required}
                />);

            case "note":
                let familyName = (props.familyNames[props.index] && props.familyNames[props.index] != '') ? 
                props.familyNames[props.index] : `Family ${props.index+1}`;
                return (<ModalFormWrapper key={questionIndex} label={familyName}
                            objectIndex={props.index} formPrefix={field.objectType}/>);

            default:
                return (<MyTextLabelInput key={questionIndex} index={props.index}
                    placeholder={field.placeholder} label={field.label} 
                    onChange={handleFieldChange} watched={field.watched}
                    objectType={field.objectType} fieldName={field.fieldName} required={field.required}
                />);
        }
    }

    return (
        <SlideWrapper title="Family Information">
            <IonList>
            {
                FamilyQuestionFields.map((field: TextFieldPropInterface, questionIndex: number) => {
                    return renderFields(field, questionIndex);
                })
            }
            </IonList>
            <BottomSlideButtons numButtons="one" buttonOneLabel="People &gt;" buttonOneClick={toPeople}/>
        </SlideWrapper>
    );
};

export default FamilyQuestions;