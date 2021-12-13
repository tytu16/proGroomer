import { IonButton, IonIcon, IonInput, IonItem } from "@ionic/react";
import { removeCircleOutline, addCircleOutline } from "ionicons/icons";
import { useState } from "react";
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

  const [phoneNum, setPhoneNum] = useState<string>("");

  const formatPhone = (value: string, preValue:string): string => {
    if (!value) return value;
    console.log(`string val: ${value}`)
    const currentValue = value.replace(/[^\d]/g, '');
    const previousValue = preValue.replace(/[^\d]/g, '');
    console.log(`digit val: ${currentValue}`);
    console.log(`prev val: ${previousValue}`);
    const cvLength = currentValue.length;
    let output = ""
    
    if (!previousValue || value.length != previousValue.length) {
      if (cvLength < 4){
        console.log('length less than 4');
        output = currentValue;
      }
      else if (cvLength < 7){
        console.log('length less than 7')
        output = `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
      }
      else{
        console.log('greater than 7')
        output = `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
      }
    }
    console.log(`output: ${output}`)
    return output;
  };

  return(
    <IonItem class="input-item ion-no-padding">
        <label>phone-{i+1}:</label>&nbsp;
        <IonInput ref={register(`phoneNum.${i}.value` as const)} key={field.key} class="input-field" 
          inputmode="tel" type="tel" placeholder="(XXX) XXX-XXXX" required={required} 
          value={phoneNum} onIonChange={(e) => {
            if(e.detail.value != phoneNum) {
              setPhoneNum(formatPhone(e.detail.value!, phoneNum))
            }
          }}
        />                                  
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