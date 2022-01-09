import { IonCheckbox, IonCol, IonGrid, IonRow } from "@ionic/react";
import { Controller, useFormContext } from "react-hook-form";
import "./InputStyling.css";

export interface MyCheckBoxInputProps {
  index: number,
  label: string,
  objectType: string,
  fieldName: string,
  required: boolean,
  onChange: (data:boolean, index:number) => void,
  watched: boolean
}

export const MyCheckBox = (props: MyCheckBoxInputProps) => {
  const {label, objectType, index, fieldName, onChange,watched} = props;
  
  const {control} = useFormContext();
  const handleChange = (checked: boolean) => {
    if(watched){
      onChange(checked, index);
    }
  };

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
                      disabled={value == true}
                      onIonChange={({ detail: { checked } }) => {
                        if(checked){
                          onChange(checked);
                          handleChange(checked);
                        } else {
                          value = checked;
                        }
                      }}
                    />
                  )}
              />
            
          </IonCol>
      </IonRow>
    </IonGrid>
  );
}