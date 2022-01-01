import { IonCol, IonGrid, IonRow, IonSelect, IonSelectOption } from "@ionic/react";
import { useFormContext } from "react-hook-form";
import { ListValue } from "../../models/Enums/States";
import "./InputStyling.css";

export interface MySelectListProps {
    index: number,
    placeholder: string,
    label: string,
    fieldName: string,
    objectType: string,
    required: boolean,
    valueList: Array<ListValue>
  }

export const MySelectList = (props: MySelectListProps) => {
    const {label, fieldName, objectType, index, placeholder, valueList, required} = props;

    const {register} = useFormContext();

    return(
        <IonGrid>
            <IonRow>
                <label>{label}</label>
            </IonRow>
            <IonRow>
                <IonSelect id="my-list" placeholder={placeholder}{...register(`${objectType}.${index}.${fieldName}`)}>
                {
                    //ToDo: Needs to have empty state
                    Object(valueList).map((v:ListValue) => {
                        return (
                            <IonSelectOption key={v.code} value={v.name}>{v.name}</IonSelectOption>
                        );
                    })
                }
                </IonSelect>
            </IonRow>
        </IonGrid>        
    );
  }