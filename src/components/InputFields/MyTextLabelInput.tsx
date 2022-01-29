import { IonGrid, IonItem, IonLabel, IonRow } from "@ionic/react";
import CustomInput from './CustomInput';
import { useFormContext } from "react-hook-form";
import "./InputStyling.scss";

export interface MyTextLabelInputProps {
  label: string,
  fieldName: string,
  placeholder: string,
  numbersOnly?: boolean,
  maxLength?: number,
  required: boolean,
  onChange: (data: string, name: string) => void,
  watched: boolean
}

export const MyTextLabelInput = (props: MyTextLabelInputProps) => {
  const {label, required, placeholder, numbersOnly, maxLength, fieldName, onChange, watched} = props;
  
  const {register} = useFormContext();

  const handleChange = (e: any) => {
    const newFieldValue = e.detail.value;
    onChange(newFieldValue, fieldName);
  }

  return(
    <IonItem mode={"md"} class="ion-no-padding">
      <IonGrid className="input-label-field">
        <IonRow>
          <IonLabel>{label}</IonLabel>
        </IonRow>
        <IonRow className="ion-text-left ion-justify-content-center">
          <CustomInput register={register} name={fieldName} error={null} required={required} 
             watched={watched} handleChange={handleChange}
             type={numbersOnly ? "tel": "text"} placeholder={placeholder}
             maxLength={maxLength ? maxLength : undefined}></CustomInput>
        </IonRow>
      </IonGrid>
    </IonItem>);
}