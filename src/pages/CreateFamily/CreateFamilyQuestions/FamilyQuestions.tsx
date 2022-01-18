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

export interface FamilyQuestionsProps {
    handleFamilyNames: (name: string, index: number) => void,
    toPeopleInfo: () => void,
    index: number
}

const FamilyQuestions = (props: FamilyQuestionsProps) => {

    const {watch} = useFormContext();

    const toPeople = (data?: any) => {
        props.toPeopleInfo();
    }

    const handleFieldChange = (data: string, name: string) => {
        props.handleFamilyNames(data, Number.parseInt(name.split('.')[1]));
    }

    return (
        <SlideWrapper title="Family Information">
            <IonList>
            {
                FamilyQuestionFields.map((field: TextFieldPropInterface, index) => {
                    return (field.fieldName != 'addressState') ? (
                        <MyTextLabelInput key={index} index={props.index}
                            placeholder={field.placeholder} label={field.label} 
                            onChange={handleFieldChange} watched={field.watched}
                            objectType={field.objectType} fieldName={field.fieldName} required={field.required}
                        />                          
                    ) : (
                        <MySelectList key={index} index={props.index} valueList={StateList}
                            placeholder={field.placeholder} label={field.label} addStyling={true}
                            objectType={field.objectType} fieldName={field.fieldName} required={field.required}
                        />
                    );
                })
            }
            </IonList>
            <BottomSlideButtons numButtons="one" buttonOneLabel="People &gt;" buttonOneClick={toPeople}/>
        </SlideWrapper>
    );
};

export default FamilyQuestions;