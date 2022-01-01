import { IonGrid, IonInput, IonRow } from "@ionic/react";
import "./InputStyling.css";

export interface MyTextInputProps {
  index: number,
  label: string,
  objectType: string,
  fieldName: string,
  placeholder: string,
  register: any, // register method passed down from react-hook-forms
  required: boolean
}

export const MyTextInput = (props: MyTextInputProps) => {
  const {label, placeholder, register, objectType, index, fieldName} = props;
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