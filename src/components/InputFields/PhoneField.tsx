import { IonButton, IonIcon, IonInput, IonItem } from "@ionic/react";
import { removeCircleOutline, addCircleOutline } from "ionicons/icons";
import "./InputStyling.css";

export interface PhoneFieldProps {
  register: any, // register method passed down from react-hook-forms
  field: any,
  required: boolean,
  i: number,
  removePhoneInput?: () => void | null,
  addPhoneInput?: () => void | null
}

export const PhoneFieldInput = (props: PhoneFieldProps) => {
  const {register, required, i, field, removePhoneInput, addPhoneInput} = props;
  return(
    <IonItem class="input-item ion-no-padding">
        <label>phone-{i+1}:</label>&nbsp;
        <IonInput ref={register(`phoneNum.${i}.value` as const)} key={field.key} class="input-field" 
        inputmode="tel" type="tel" placeholder="(XXX) XXX-XXXX" required={required}
        onChange={(value) => {
          console.log('le change');
          console.log(value);
          field.onChange(value);
          
        }} />                                  
        {
          removePhoneInput == null ? (
            <IonButton id="addPhoneButton" onClick={addPhoneInput}><IonIcon icon={addCircleOutline}></IonIcon></IonButton>
          ) : (
            <IonButton id="removePhoneButton" onClick={removePhoneInput}><IonIcon icon={removeCircleOutline}></IonIcon></IonButton>
           )
        }
    </IonItem>
  );
}