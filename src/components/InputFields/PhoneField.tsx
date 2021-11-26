import { IonButton, IonIcon, IonInput, IonItem } from "@ionic/react";
import { removeCircleOutline } from "ionicons/icons";
import "./InputStyling.css";

export interface PhoneFieldProps {
  i: number,
  register: any, // register method passed down from react-hook-forms
  required: boolean,
  removePhoneInput: () => void
}

export const PhoneFieldInput = (props: PhoneFieldProps) => {
  const {register, i, required, removePhoneInput} = props;
  return(
    <IonItem key={i} class="input-item ion-no-padding">
        <label>phone-{i+1}:</label>&nbsp;
        <IonInput class="input-field" inputmode="tel" type="tel" placeholder="XXX-XXX-XXXX" {...register("phoneNumber-"+{i}, {required})} />                                  
        <IonButton onClick={removePhoneInput}><IonIcon icon={removeCircleOutline}></IonIcon></IonButton>
    </IonItem>
  );
}