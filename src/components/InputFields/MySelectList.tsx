import { IonCol, IonGrid, IonItem, IonRow, IonSelect, IonSelectOption } from "@ionic/react";
import { useFormContext } from "react-hook-form";
import { ListValueInterface } from "../../models/Enums/States";
import "./InputStyling.scss";

export interface MySelectListProps {
    index: number,
    placeholder: string,
    label: string,
    fieldName: string,
    objectType: string,
    required: boolean,
    defaultValue?: string,
    addStyling: boolean,
    valueList: Array<ListValueInterface>
  }

export const MySelectList = (props: MySelectListProps) => {
    const {label, fieldName, objectType, index, placeholder, valueList, addStyling, defaultValue} = props;

    const {register} = useFormContext();

    return (<IonItem className="ion-no-padding" mode="md">
        <IonGrid className={addStyling ? "my-select-list" : ""}>
            {(label != '') && (
                <IonRow>
                    <label>{label}</label>
                </IonRow>)}
            <IonRow className="ion-text-left ion-align-items-center">
                {/* ToDo: make this populate from a default state set on profile setup  */}
                <IonSelect id="my-list" value={defaultValue} placeholder={placeholder}{...register(`${objectType}.${index}.${fieldName}`)}>
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
    </IonItem>);
  }