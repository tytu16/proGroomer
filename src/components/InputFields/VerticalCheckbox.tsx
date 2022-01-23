import { IonCheckbox, IonCol, IonGrid, IonLabel, IonRow } from "@ionic/react";
import { useRef, useState } from "react";
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

export const VerticalCheckbox = (props: MyCheckBoxInputProps) => {
  const {label, objectType, index, fieldName, onChange,watched} = props;
  
  const {control} = useFormContext();
  const [textable, setTextable] = useState<boolean>(false);
  const handleChange = (checked: boolean) => {
    setTextable(!textable);
    if(watched){
      onChange(checked, index);
    }
  };

  return(
    <IonGrid>
        <IonRow><IonCol>
        <IonLabel className={(textable) ? "textable text-label" : "text-label" }>Text</IonLabel>
        </IonCol></IonRow>
        <Controller
            control={control}
            name={`${objectType}.${index}.${fieldName}`}
            render={({ field: { value, onChange } }) => (
                <IonCheckbox class="my-checkbox"
                checked={value}
                onIonChange={({ detail: { checked } }) => {
                    onChange(checked);
                    handleChange(checked);}
                }
                />
            )}
        />
    </IonGrid>
  );
}