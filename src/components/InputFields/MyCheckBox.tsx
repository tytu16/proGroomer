import { IonCheckbox, IonCol, IonGrid, IonRow } from "@ionic/react";
import { Controller, useFormContext } from "react-hook-form";
import "./InputStyling.css";

export interface MyCheckBoxInputProps {
  index: number,
  label: string,
  objectType: string,
  fieldName: string,
  required: boolean
}

export const MyCheckBox = (props: MyCheckBoxInputProps) => {
  const {label, objectType, index, fieldName} = props;
  
  const {control} = useFormContext();
  return(
    <IonGrid>
      <IonRow>
          <IonCol size="8">
            <label>{label}</label>
          </IonCol>
          <IonCol>
          <Controller
                control={control}
                name={`${objectType}.${index}.${fieldName}`}
                render={({ field: { value, onChange } }) => (
                    <IonCheckbox
                      checked={value}
                      onIonChange={({ detail: { checked } }) => onChange(checked)}
                    />
                  )}
              />
            
          </IonCol>
      </IonRow>
    </IonGrid>
  );
}