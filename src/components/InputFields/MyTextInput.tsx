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
  const [focused, setFocused] = useState<boolean>(false);

  const myFieldName = `${objectType}.${index}.${fieldName}`;

  const handleFocus = () => {
    setFocused(true);
  }

  const handleBlur = () => {
    setFocused(false);
  }
  
  const handleChange = (e: any) => {
    // console.log(`handle change: ${myFieldName}`);
    const newFieldValue = e.detail.value;
    setWatchField(newFieldValue);
    onChange(newFieldValue, myFieldName);
  }

  return(
    <IonGrid className={focused ? "input-label-field focused" : "input-label-field"}>
      <IonRow>
        <label>{label}</label>
      </IonRow>
      <IonRow className="ion-text-left">
        <IonInput  {...register(myFieldName)}
          type="text"
          onIonFocus={handleFocus}
          onIonBlur={handleBlur}
          onIonChange={(e) => { 
            if(watched){handleChange(e);}
           }}
          autocomplete="off" autoCorrect="off"
          class="text-input-field" placeholder={placeholder}/>
      </IonRow>
      {/* <p>{watchField}</p> */}
    </IonGrid>
  );
}