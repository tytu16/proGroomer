import { IonCol, IonGrid, IonInput, IonRow } from "@ionic/react";
import "./InputStyling.css";

export interface MyTextInputProps {
  label: string,
  placeholder: string,
  name?: string | null,
  register: any, // register method passed down from react-hook-forms
  required: boolean
}

export const MyTextInput = (props: MyTextInputProps) => {
  const {label, name, placeholder, register, required} = props;
  let registerName = (name != null) ? name : label;
  return(
    <IonGrid>
      <IonRow>
        <label>{label}</label>
      </IonRow>
      <IonRow>
        <IonInput class="input-field" placeholder={placeholder} pattern={"^\D*(\d{0,3})\D*(\d{0,3})\D*(\d{0,4})"} {...register(registerName, { required })}/>
      </IonRow>
    </IonGrid>
  );
}