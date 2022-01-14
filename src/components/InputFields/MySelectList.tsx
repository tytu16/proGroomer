import { IonCol, IonGrid, IonRow, IonSelect, IonSelectOption } from "@ionic/react";
import { useFormContext } from "react-hook-form";
import { ListValueInterface } from "../../models/Enums/States";
import "./InputStyling.css";

export interface MySelectListProps {
    index: number,
    placeholder: string,
    label: string,
    fieldName: string,
    objectType: string,
    required: boolean,
    addStyling: boolean,
    valueList: Array<ListValueInterface>
  }

export const MySelectList = (props: MySelectListProps) => {
    const {label, fieldName, objectType, index, placeholder, valueList, required, addStyling} = props;

    const {register} = useFormContext();

    return(
        <IonGrid className={addStyling ? "my-select-list" : ""}>
            {(label != '') ? (
                <IonRow>
                    <label>{label}</label>
                </IonRow>) : (
                <></>
            )}
            <IonRow className="ion-text-left">
                <IonSelect id="my-list" placeholder={placeholder}{...register(`${objectType}.${index}.${fieldName}`)}>
                {
                    Object(valueList).map((v:ListValueInterface) => {
                        return (
                            <IonSelectOption key={v.label} value={v.value}>{v.label}</IonSelectOption>
                        );
                    })
                }
                </IonSelect>
            </IonRow>
        </IonGrid>        
    );
  }