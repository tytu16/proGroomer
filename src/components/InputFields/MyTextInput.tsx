import { IonCol, IonGrid, IonInput, IonRow } from "@ionic/react";
import "./InputStyling.css";

export interface MyTextInputProps {
  label: string,
  placeholder: string,
  name?: string | null,
  value?: string | null,
  register: any, // register method passed down from react-hook-forms
  required: boolean
}

export const MyTextInput = (props: MyTextInputProps) => {
  const {label, name, value, placeholder, register, required} = props;
  let registerName = (name != null) ? name : label;
  let inputValue  = (value != null) ? value : "";
  return(
    <IonGrid>
      <IonRow>
        <label>{label}</label>
      </IonRow>
      <IonRow>
        <IonInput class="input-field" value={inputValue} placeholder={placeholder} {...register(registerName, { required })}/>
      </IonRow>
    </IonGrid>
  );
}