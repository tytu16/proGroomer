import { IonButton, IonContent, IonList} from "@ionic/react";

import './CreateAccount.scss'; 
import { AccountInfo } from "../../models/AccountInfo";
import CreateAccountSlideWrapper from "./CreateAccountQuestions/CreateAccountSlideWrapper"
import { useFieldArray, useForm, FormProvider } from "react-hook-form";

import { InitAccountQuestionState } from "./CreateAccountQuestions/QuestionObjects";
import { useRef, useState } from "react";
import AccordionWrapper from "../../components/Accordion/AccordionWrapper";
import AccordionHeader from "../../components/Accordion/AccordionHeader";
import { useHistory } from "react-router";

export interface CreateAccountProps {
    onCreateAccount: (account: AccountInfo) => void,
    index: number
}

export interface CreateAccountState {
    accountInProgress: AccountInfo
}

const CreateAccount = (props: CreateAccountProps) => {

  const IonContentRef = useRef<any>(null);
  const IonListRef = useRef<any>(null);
  const history = useHistory();
  const methods = useForm({
    defaultValues: {account: [InitAccountQuestionState()]}
  });
  const control = methods.control;
  const watch   = methods.watch;
  const { fields, append, remove} = useFieldArray({
    control,
    name: "account",
  });

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [accountNames, setAccountNames] = useState<string[]>([]);

  const saveAccountInfo = (newAccount: AccountInfo) => {
      // if(!this.state.accountInProgress.baseAccountEqual(newAccount)){
      //     newAccount.id = this.props.index.toString();
      //     this.setState({accountInProgress: newAccount});
      //     console.log('added account info, now to personInfo');
      //     console.log(newAccount);
      // } else {
      //     console.log('data is same, moving forward without saving');
      // }
  }

  const submitAccount = (index: number) => {
      console.log('in Create Account submit function');
      console.log(`submitting account ${index}`);
      let submitData = watch(`account.${index}`);
      console.log(submitData);
      history.goBack();
  }

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
                        saveAccountInfo={saveAccountInfo} toTop={toTop}
                        submitAccount={submitAccount} handleAccountNames={handleAccountNames}/>
                    </AccordionWrapper>
                  </div>
                ))}
                <IonButton type="button" onClick={() => {
                  append(InitAccountQuestionState())
                }}>append</IonButton>
              </form>
            </FormProvider>
          </IonList>
      </IonContent>
  );
    
}

export default CreateAccount;