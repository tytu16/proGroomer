import { IonButton, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonList, IonRow } from "@ionic/react";
import { removeCircleOutline, addCircleOutline } from "ionicons/icons";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import "./InputStyling.css";

export interface PhoneFieldProps {
  index: number,
  placeholder: string,
  label: string,
  objectType: string,
  fieldName: string,
}

export const PhoneFieldInput = (props: PhoneFieldProps) => {
  const {index, placeholder, fieldName, objectType} = props;

  const {control, register, handleSubmit} = useFormContext();
  const longObjectType = objectType + `.${index}` + '.phone';
  const { fields, append, remove} = useFieldArray({
      control,
      name: longObjectType,
  });

  const formatPhone = (value: string, preValue:string) => {
    if (!value) return value;
    // clear non-numeric characters
    const currentValue = value.replace(/[^\d]/g, '');
    const previousValue = preValue.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;
    let output = ""
    
    if (!previousValue || value.length != previousValue.length) {
      if (cvLength < 4){
        output = currentValue;
      }
      else if (cvLength < 7){
        output = `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
      }
      else{
        output = `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
      }
    }
    // setPhoneNum(output);
  };

  const addPhoneInput = (data: any) => {
    console.log('adding another phone');
    console.log(data);
    append({phoneNumber: ""});
  };
  
  const removePhoneInput = (index: number) => {
    remove(index);
  }

  return(
    <IonGrid>
        <IonRow><IonCol>
          <label key={0}>{props.label}:</label>&nbsp;
        </IonCol></IonRow>
        {fields.map((item, fieldArrayIndex) => (
          <IonRow key={fieldArrayIndex}>
            <IonCol>
              <IonInput {...register(`${longObjectType}.${fieldArrayIndex}.${fieldName}`)} class="input-field" 
                inputmode="tel" type="tel" placeholder={placeholder} maxlength={14} required={true}
              />
            </IonCol>
            <IonCol size="3">{
              (fieldArrayIndex == 0) ? (
                <IonButton id="addPhoneButton" onClick={addPhoneInput}><IonIcon icon={addCircleOutline}></IonIcon></IonButton>
              ) : (
                <IonButton id="removePhoneButton" onClick={() => removePhoneInput(fieldArrayIndex)}><IonIcon icon={removeCircleOutline}></IonIcon></IonButton>
              )
            }</IonCol>
          </IonRow>
        ))}
    </IonGrid>
  );
}