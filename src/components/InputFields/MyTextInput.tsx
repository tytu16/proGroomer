import { IonGrid, IonInput, IonItem, IonRow } from "@ionic/react";
import { useFormContext } from "react-hook-form";
import "./InputStyling.scss";

export interface MyTextInputProps {
  index: number,
  objectType: string,
  fieldName: string,
  placeholder: string,
  required: boolean,
  onChange: (data: string, name: string) => void,
  watched: boolean
}

export const MyTextInput = (props: MyTextInputProps) => {
  const {placeholder, objectType, index, fieldName, onChange, watched} = props;
  
  const {register} = useFormContext();

  const myFieldName = `${objectType}.${index}.${fieldName}`;

  const handleChange = (e: any) => {
    const newFieldValue = e.detail.value;
    onChange(newFieldValue, myFieldName);
  }

  return(
    <IonItem  mode={"md"} class="ion-no-padding">
      <IonGrid className="input-label-field">
        <IonRow className="ion-text-left">
          <IonInput {...register(myFieldName)}
            class="text-input-field" type="text"
            autocomplete="off" autoCorrect="off"
            placeholder={placeholder}
            onIonChange={(e) => { 
              if(watched){handleChange(e);}
            }}/>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
}