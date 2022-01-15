import { IonGrid, IonRow, IonTextarea } from "@ionic/react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import "./InputStyling.css";

export interface MyTextAreaProps {
  index: number,
  objectType: string,
  fieldName: string,
  placeholder: string
}

export const MyTextArea = (props: MyTextAreaProps) => {
  const {placeholder, objectType, index, fieldName} = props;
  const numberChars = 256;
  const {register} = useFormContext();

  const myFieldName = `${objectType}.${index}.${fieldName}`;
  const [charsLeft, setCharsLeft] = useState<number>(numberChars)

  const handleChange = (e: any) => {
    const newFieldValue = e.detail.value;
    setCharsLeft(numberChars-newFieldValue.length);
  }

  return(
    <IonGrid className="input-label-field">
      <IonRow className="ion-text-left">
        <IonTextarea  {...register(myFieldName)}
          class="text-input-field" inputmode="text"          
          placeholder={placeholder} autoGrow={true}
          maxlength={numberChars}
          onIonChange={(e) =>handleChange(e)}>
        </IonTextarea>
      </IonRow>
      <IonRow class="char-limit ion-float-right">
          { charsLeft == numberChars ? (
            <p>Character limit: {charsLeft}</p>
          ) : (
            <p>{charsLeft} characters left</p>
          )}
      </IonRow>
    </IonGrid>
  );
}