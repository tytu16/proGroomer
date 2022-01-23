import { IonGrid, IonInput, IonItem, IonLabel, IonRow } from "@ionic/react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import "./InputStyling.scss";

export interface MyTextLabelInputProps {
  index: number,
  label: string,
  objectType: string,
  fieldName: string,
  placeholder: string,
  numbersOnly?: boolean,
  maxLength?: number,
  required: boolean,
  onChange: (data: string, name: string) => void,
  watched: boolean
}

export const MyTextLabelInput = (props: MyTextLabelInputProps) => {
  const {label, placeholder, objectType, index, numbersOnly, maxLength, fieldName, onChange, watched} = props;
  
  const {register} = useFormContext();

  const myFieldName = `${objectType}.${index}.${fieldName}`;

  const handleChange = (e: any) => {
    const newFieldValue = e.detail.value;
    onChange(newFieldValue, myFieldName);
  }

  return(
    <IonItem mode={"md"} class="ion-no-padding">
      <IonGrid className="input-label-field">
        <IonRow>
          <IonLabel>{label}</IonLabel>
        </IonRow>
        <IonRow className="ion-text-left">
          <IonInput  {...register(myFieldName)}
            class="text-input-field" type={numbersOnly ? "tel": "text"}
            autocomplete="off" autoCorrect="off" maxlength={maxLength ? maxLength : undefined}
            placeholder={placeholder}
            onIonChange={(e) => {
              if(watched){handleChange(e);}
            }}/>
        </IonRow>
      </IonGrid>
    </IonItem>);
}