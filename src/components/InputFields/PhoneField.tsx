import { IonButton, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonList, IonRow } from "@ionic/react";
import { removeCircleOutline, addCircleOutline } from "ionicons/icons";
import { useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import NumberFormat from "react-number-format";

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
            <Controller
              control={control}
              name={`${longObjectType}.${fieldArrayIndex}.${fieldName}`}
              render={({ field: { onChange, name, value } }) => (
                <NumberFormat className="input-field"
                  placeholder={placeholder} 
                  format="(###) ###-####"
                  name={name}
                  value={value}
                  onChange={onChange}
                />
              )}
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