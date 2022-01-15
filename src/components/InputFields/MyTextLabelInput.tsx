import { IonGrid, IonInput, IonRow } from "@ionic/react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import "./InputStyling.css";

export interface MyTextLabelInputProps {
  index: number,
  label: string,
  objectType: string,
  fieldName: string,
  placeholder: string,
  required: boolean,
  onChange: (data: string, name: string) => void,
  watched: boolean
}

export const MyTextLabelInput = (props: MyTextLabelInputProps) => {
  const {label, placeholder, objectType, index, fieldName, onChange, watched} = props;
  
  const {register} = useFormContext();

  const myFieldName = `${objectType}.${index}.${fieldName}`;

  const handleChange = (e: any) => {
    const newFieldValue = e.detail.value;
    onChange(newFieldValue, myFieldName);
  }

  return(
    <IonGrid className="input-label-field">
      <IonRow>
        <label>{label}</label>
      </IonRow>
      <IonRow className="ion-text-left">
        <IonInput  {...register(myFieldName)}
          class="text-input-field" type="text"
          autocomplete="off" autoCorrect="off"
          placeholder={placeholder}
          onIonChange={(e) => { 
            if(watched){handleChange(e);}
           }}/>
      </IonRow>
    </IonGrid>
  );
}