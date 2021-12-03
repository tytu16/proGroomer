import { IonCol, IonGrid, IonRow, IonSelect, IonSelectOption } from "@ionic/react";
import { ListValue } from "../../models/Enums/States";
import "./InputStyling.css";

export interface MySelectListProps {
    label: string,
    placeholder: string,
    name: string,
    register: any, // register method passed down from react-hook-forms
    required: boolean,
    valueList: Array<ListValue>
  }

export const MySelectList = (props: MySelectListProps) => {
    const {label, name, placeholder, valueList, register, required} = props;

    return(
        <IonGrid>
            <IonRow>
                <label>{label}</label>
            </IonRow>
            <IonRow>
                <IonSelect id="my-list" placeholder={placeholder} {...register(name, { required })}>
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