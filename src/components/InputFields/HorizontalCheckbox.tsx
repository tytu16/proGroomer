import { IonCheckbox, IonCol, IonGrid, IonRow } from "@ionic/react";
import { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import "./InputStyling.scss";

export interface MyCheckBoxInputProps {
  index: number,
  label: string,
  objectType: string,
  fieldName: string,
  required: boolean,
  onChange: (data:boolean, index:number) => void,
  watched: boolean
}

export const HorizontalCheckBox = (props: MyCheckBoxInputProps) => {
  const {label, objectType, index, fieldName, onChange,watched} = props;
  
  const {control} = useFormContext();
  const IonCheckboxRef = useRef<any>(null);
  const handleChange = (checked: boolean) => {
    if(watched){
      onChange(checked, index);
    }
  };

  return(
    <IonGrid className={(IonCheckboxRef.current && IonCheckboxRef.current.checked) ? "checked my-text-input" : "my-text-input"}>
      <IonRow>
          <IonCol size="8">
            <label>{label}</label>
          </IonCol>
          <IonCol>
          <Controller
              control={control}
              name={`${objectType}.${index}.${fieldName}`}
              render={({ field: { value, onChange } }) => (
                  <IonCheckbox class="my-checkbox"
                    ref={IonCheckboxRef}
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