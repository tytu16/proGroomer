import { IonButton, IonContent, IonList} from "@ionic/react";

import './CreateAccount.scss'; 
import { AccountInfo } from "../../models/AccountInfo";
import CreateAccountSlideWrapper from "./CreateAccountQuestions/CreateAccountSlideWrapper"
import { useFieldArray, useForm, FormProvider } from "react-hook-form";

import { InitPrimaryAccountQuestionState, InitAccountQuestionState, AutoFillAccount } from "./CreateAccountQuestions/QuestionObjects";
import { useRef, useState } from "react";
import AccordionWrapper from "../../components/Accordion/AccordionWrapper";
import AccordionHeader from "../../components/Accordion/AccordionHeader";
import { useHistory } from "react-router";

export interface CreateAccountProps {
    createAccounts: (accounts: Array<any>) => void,
    index: number
}

export interface CreateAccountState {
    accountInProgress: AccountInfo
}

const CreateAccount = (props: CreateAccountProps) => {
  // Set this by hand for testing, autofills form
  const autoFill = false;

  const IonContentRef = useRef<any>(null);
  const IonListRef = useRef<any>(null);
  const history = useHistory();

  let defaultFormValues: any;
  if(autoFill){
    defaultFormValues = AutoFillAccount(); 
  } else {
    defaultFormValues = InitPrimaryAccountQuestionState();
  }
   
  const methods = useForm({
    defaultValues: {account: [defaultFormValues]}
  });
  const control = methods.control;
  const handleSubmit = methods.handleSubmit;
  const { fields, append, remove} = useFieldArray({
    control,
    name: "account",
  });

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [accountNames, setAccountNames] = useState<string[]>([]);

  const handleAccountNames = (name: string, index: number) => {
    // Account.0.person.0.firstName
    let newAccountNames = [...accountNames];
    newAccountNames[index] = name;
    setAccountNames(newAccountNames);
  }

  // Remove field from fieldArray, set all accordions as inactive, 
  // remove watchedField from state, IonListRef to reset ion-item positions 
  const handleDelete = (index: number) => {
    remove(index);
    setActiveIndex(-1);
    let newAccountNames = accountNames.slice(0,index).concat(accountNames.slice(index+1));
    setAccountNames(newAccountNames);
    IonListRef.current.closeSlidingItems();
  }

  // Sets the activeIndex to the clicked accordion
  // If currently active was clicked, close all accordions
  const handleAccordionChange = (index: number) => {
    if(index == activeIndex){
        setActiveIndex(-1);
    } else {
        setActiveIndex(index);
    }
  }

  const toTop = () => {
    IonContentRef.current.scrollToTop(300);
  }

  const submitAndRepeat = (data: any) => {
    //Do validation stuff
    console.log('submit and re[eat] - Create Account');
    setActiveIndex(accountNames.length+1);
    appendAccount();
    console.log(`changing active index in CreateAccount: ${accountNames.length+1}`);
  }

  const submitAndEnd = (data: any) => {
    //Do validation stuff
    console.log('submit and end - Create Account');
    console.log('CreateAccount Submit method');
    console.log(data);
    props.createAccounts(data);
    history.goBack();
  }

  const handleErrors = (e: any) => {
    console.log('arrr, der be errers');
    console.log(e);
  }
  
  const appendAccount = () => {
    console.log('appending');
    // Todo: Styling the header once submitted
    append(InitAccountQuestionState());
  }

  return (
      <IonContent ref={IonContentRef}>
          <IonList ref={IonListRef}>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(data => console.log(data))}>
                {fields.map((field, accountIndex) => (
                  <div key={field.id}>
                    <div className="account-header">
                    <AccordionHeader fieldArrayIndex={accountIndex} labelClass="bold-header"
                        isPrimary={false} isActive={activeIndex == accountIndex}
                        handleDelete={handleDelete} handleAccordion={handleAccordionChange} 
                        label={(accountIndex < accountNames.length && accountNames[accountIndex] != '') ? (
                            accountNames[accountIndex]
                        ) : (
                            'Account ' + (accountIndex+1)
                        )}
                    /></div>
                    <AccordionWrapper addBorder={false} classNames={activeIndex == accountIndex ? "accordion" : "accordion collapsed"}>
                      <CreateAccountSlideWrapper accountNames={accountNames} index={accountIndex}
                        toTop={toTop} submitAndRepeat={handleSubmit(submitAndRepeat, handleErrors)} submitAndEnd={handleSubmit(submitAndEnd,handleErrors)}
                        handleAccountNames={handleAccountNames}/>
                    </AccordionWrapper>
                  </div>
                ))}
                <IonButton type="button" onClick={appendAccount}>append</IonButton>
              </form>
            </FormProvider>
          </IonList>
      </IonContent>
  );
    
}

export default CreateAccount;