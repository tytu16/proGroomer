import { IonGrid, IonItem, IonRow, IonTextarea } from "@ionic/react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import "./InputStyling.scss";

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

  return(
    <IonGrid>
      <IonRow className="ion-text-left">
        <IonItem className="my-text-area-item ion-no-padding" counter={true}>
          <IonTextarea {...register(myFieldName)}
            class="text-input-field my-text-area" inputmode="text"
            placeholder={placeholder} autoGrow={true}
            maxlength={numberChars}>
          </IonTextarea>
        </IonItem>
      </IonRow>
    </IonGrid>
  );
}