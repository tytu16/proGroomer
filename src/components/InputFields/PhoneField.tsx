import { IonButton, IonCol, IonGrid, IonIcon, IonLabel, IonRow } from "@ionic/react";
import { removeCircleOutline, addCircleOutline } from "ionicons/icons";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import NumberFormat from "react-number-format";

import "./InputStyling.css";
import { MySelectList } from "./MySelectList";
import { PhoneTypeList } from "../../models/Enums/PhoneTypes";
import { VerticalCheckbox } from "./VerticalCheckbox";
import { useState } from "react";

export interface PhoneFieldProps {
  index: number,
  placeholder: string,
  label: string,
  objectType: string,
  fieldName: string,
}

export const PhoneFieldInput = (props: PhoneFieldProps) => {
  const {index, placeholder, fieldName, objectType} = props;
  const formPrefix = objectType + `.${index}` + '.phone';

  const {control} = useFormContext();
  const { fields, append, remove} = useFieldArray({
      control,
      name: formPrefix,
  });
  const [focusedIndex, setFocusedIndex ] = useState<number>();

  const addPhoneInput = (data: any) => {
    append({phoneNumber: "", phoneType: "", textable: false});
  };
  
  const removePhoneInput = (index: number) => {
    remove(index);
  }

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  }

  const handleBlur = () => {
    setFocusedIndex(-1);
  }

  return(
    <IonGrid className="ion-no-padding shadow-container">
        <IonRow><IonCol >
          <IonLabel className="text-left">{props.label}:</IonLabel>&nbsp;
        </IonCol></IonRow>
        {fields.map((item, fieldArrayIndex) => (
          <IonGrid className={focusedIndex==fieldArrayIndex ? "phone-field-grid focused" : "phone-field-grid"} key={fieldArrayIndex}>
            <IonRow class="nowrap">
              {/* PhoneType */}
              <IonCol size="6">
                <MySelectList index={fieldArrayIndex} valueList={PhoneTypeList}
                              placeholder="Phone Type" label=""
                              objectType={formPrefix} fieldName="phoneType"
                              required={false} addStyling={false}
                />
              </IonCol>
              {/* Textable */}
              <VerticalCheckbox index={fieldArrayIndex}
                        onChange={()=>{}} watched={false}
                        label={""} objectType={formPrefix}
                        fieldName={"textable"} required={false} 
              />
              <IonCol>{
                (fieldArrayIndex == 0) ? (
                  <IonButton className="phone-button" id="addPhoneButton" onClick={addPhoneInput}><IonIcon icon={addCircleOutline}></IonIcon></IonButton>
                ) : (
                  <IonButton className="phone-button" id="removePhoneButton" onClick={() => removePhoneInput(fieldArrayIndex)}><IonIcon icon={removeCircleOutline}></IonIcon></IonButton>
                )
              }</IonCol>
            </IonRow>
            <IonRow className={focusedIndex==fieldArrayIndex ? "focused" : "my-phone-input"}>
              <IonCol>
                <Controller
                  control={control}
                  name={`${formPrefix}.${fieldArrayIndex}.${fieldName}`}
                  render={({ field: { onChange, name, value } }) => (
                    <NumberFormat className="phone-field"
                      color="none"
                      placeholder={placeholder}
                      type={"tel"}
                      format="(###) ### - ####"
                      name={name}
                      value={value}
                      onChange={onChange}
                      onFocus={() => handleFocus(fieldArrayIndex)}
                      onBlur={() => handleBlur()}
                    />
                  )}
                />
              </IonCol>
            </IonRow>
          </IonGrid>
        ))}
    </IonGrid>
  );
}