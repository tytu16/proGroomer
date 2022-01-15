import { IonGrid, IonInput, IonRow } from "@ionic/react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import "./InputStyling.css";

export interface MyTextInputProps {
  index: number,
  label: string,
  objectType: string,
  fieldName: string,
  placeholder: string,
  required: boolean,
  onChange: (data: string, name: string) => void,
  watched: boolean
}

export const MyTextInput = (props: MyTextInputProps) => {
  const {label, placeholder, objectType, index, fieldName, onChange, watched} = props;
  
  const {register} = useFormContext();
  const [watchField, setWatchField] = useState<string>("");

  const myFieldName = `${objectType}.${index}.${fieldName}`;

  const handleChange = (e: any) => {
    // console.log(`handle change: ${myFieldName}`);
    const newFieldValue = e.detail.value;
    setWatchField(newFieldValue);
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
      {/* <p>{watchField}</p> */}
    </IonGrid>
  );
}