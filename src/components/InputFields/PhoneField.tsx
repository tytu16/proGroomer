import { IonButton, IonCol, IonGrid, IonIcon, IonList, IonRow } from "@ionic/react";
import { removeCircleOutline, addCircleOutline } from "ionicons/icons";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import NumberFormat from "react-number-format";

import "./InputStyling.css";
import { MySelectList } from "./MySelectList";
import { PhoneTypeList } from "../../models/Enums/PhoneTypes";
import { VerticalCheckbox } from "./VerticalCheckbox";
import AccordionHeader from "../Accordion/AccordionHeader";
import { useRef, useState } from "react";
import AccordionWrapper from "../Accordion/AccordionWrapper";

export interface PhoneFieldProps {
  index: number,
  placeholder: string,
  label: string,
  objectType: string,
  fieldName: string
}

export const PhoneFieldInput = (props: PhoneFieldProps) => {
  const {index, placeholder, fieldName, objectType} = props;
  const formPrefix = objectType + `.${index}` + '.phone';
  const phoneRegex = /(^\(\d{3}\)\s\d{3}\s-\s\d{4})/g;

  const {control} = useFormContext();
  const { fields, append, remove} = useFieldArray({
      control,
      name: formPrefix,
  });

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [phoneNumbers, setPhoneNumbers] = useState<Array<string>>([]);
  const [numFilledPhones, setNumFilledPhones]  = useState<number>(0);
  const [phonesActive, setPhonesActive] = useState<boolean>(true);
  const IonListRef = useRef<any>(null);

  const addPhoneInput = (data: any) => {
    append({phoneNumber: "", phoneType: "", textable: false});
    const newPhoneNumbers = phoneNumbers.slice().concat("");
    setPhoneNumbers(newPhoneNumbers);
    setActiveIndex(phoneNumbers.length+1);
  };
  
  const handleDelete = (index: number) => {
    removePhoneInput(index);
    let newPhones = phoneNumbers.slice(0,index).concat(phoneNumbers.slice(index+1));
    setPhoneNumbers(newPhones);
    setNumFilledPhones(numFilledPhones-1);
    IonListRef.current.closeSlidingItems();
  }

  const handleAccordionChange = (index: number) => {
    if(index == activeIndex){
        setActiveIndex(-1);
    } else {
        setActiveIndex(index);
    }
  }

  const handleFieldChange = (phoneNumber: string, index: number) => {
    let newPhones = phoneNumbers.slice();
    console.log('new phoneNum: '+phoneNumber);
    if(newPhones[index]){
      console.log('old phoneNum: '+newPhones[index]);
      if(!newPhones[index].search(phoneRegex) && phoneNumber.search(phoneRegex)){
        console.log(`lowering numFilledPhones: ${numFilledPhones} -> ${numFilledPhones-1}`)
        setNumFilledPhones(numFilledPhones-1);
      } else if(newPhones[index].search(phoneRegex) && !phoneNumber.search(phoneRegex)){
        console.log(`raising numFilledPhones: ${numFilledPhones} -> ${numFilledPhones+1}`)
        setNumFilledPhones(numFilledPhones+1);
      }
    }
    newPhones[index] = phoneNumber;
    setPhoneNumbers(newPhones);
}

  const removePhoneInput = (index: number) => {
    remove(index);
    setNumFilledPhones(numFilledPhones-1);
  }

  // ToDo: Sides of layout uneven with rest of page
  return(<div className="shadow-container">
    <IonGrid className="ion-no-padding">
      <div onClick={()=>setPhonesActive(!phonesActive)}>
      <AccordionHeader fieldArrayIndex={0} disabled={true}
                      isPrimary={true} isActive={phonesActive}
                      handleDelete={()=>{}} handleAccordion={()=>{}} 
                      label={(numFilledPhones == 0) ? props.label : 
                        `${numFilledPhones} ` + ( numFilledPhones == 1 ? props.label : props.label+'s' )} >
        </AccordionHeader>
      </div>
        <IonList className={["accordion", (phonesActive ? "" : " collapsed")].join(" ")} ref={IonListRef}>
          <div className="question-content">
          {fields.map((field, fieldArrayIndex) => (
            <div className="phone-field-grid" key={field.id}>
              <AccordionHeader fieldArrayIndex={fieldArrayIndex} 
                isPrimary={false} isActive={activeIndex == fieldArrayIndex}
                handleDelete={handleDelete} handleAccordion={handleAccordionChange} label={
                  (fieldArrayIndex < phoneNumbers.length && phoneNumbers[fieldArrayIndex] != "") ? (
                    phoneNumbers[fieldArrayIndex]
                  ) : (
                    `Phone ${fieldArrayIndex+1}`
                  )
              }>
              </AccordionHeader>
              <AccordionWrapper  classNames={["accordion phone", 
                                                (activeIndex == fieldArrayIndex ? "" : " collapsed")].join(" ")}>
                <IonGrid className="" key={fieldArrayIndex}>
                  <IonRow>
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
                            onValueChange={(values) => {
                              const { formattedValue, value } = values;
                              handleFieldChange(formattedValue, fieldArrayIndex);
                            }}
                          />
                        )}
                      />
                    </IonCol>
                  </IonRow>
                  <IonRow class="nowrap">
                    {/* PhoneType */}
                    <IonCol size="6">
                      <MySelectList index={fieldArrayIndex} valueList={PhoneTypeList}
                                    placeholder="Type" label=""
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
                    <IonCol>
                      <IonButton className="phone-button" id="removePhoneButton" onClick={() => removePhoneInput(fieldArrayIndex)}>
                        <IonIcon icon={removeCircleOutline}></IonIcon>
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </AccordionWrapper>
            </div>
          ))}
          <IonRow><IonCol size="12">
            <IonButton className="phone-button" expand="block" id="addPhoneButton" onClick={addPhoneInput}>
              <IonIcon icon={addCircleOutline}></IonIcon><p>&nbsp;Add Phone</p>
            </IonButton>
          </IonCol></IonRow>
          </div>
        </IonList>
      </IonGrid>
    </div>);
}