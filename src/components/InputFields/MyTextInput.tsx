import { IonGrid, IonInput, IonRow } from "@ionic/react";
import { useFormContext } from "react-hook-form";
import "./InputStyling.css";

export interface MyTextInputProps {
  index: number,
  label: string,
  objectType: string,
  fieldName: string,
  placeholder: string,
  required: boolean
}

export const MyTextInput = (props: MyTextInputProps) => {
  const {label, placeholder, objectType, index, fieldName} = props;
  
  const {register} = useFormContext();
  return(
    <IonGrid>
      <IonRow>
        <label>{label}</label>
      </IonRow>
      <IonRow>
        <IonInput {...register(`${objectType}.${index}.${fieldName}`)} 
          class="input-field" placeholder={placeholder}/>
      </IonRow>
    </IonGrid>
  );
}