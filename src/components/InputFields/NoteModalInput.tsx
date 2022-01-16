import { IonButton, IonCol, IonContent, IonGrid, IonLabel, IonModal, IonRow } from "@ionic/react";
import { useState } from "react";
import { MyTextInput } from "./MyTextInput";
import { MyTextArea } from "./MyTextArea";

import "./InputStyling.css";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Note } from "../../models/Note";
import { InitNoteQuestionState } from "../../pages/CreateFamily/CreateFamilyQuestions/QuestionObjects";

export interface NoteModalProps {
    personIndex: number,
    formPrefix: string
  }

 export const NoteModal = (props: NoteModalProps) => {
    const {personIndex, formPrefix} = props;

    const {handleSubmit, watch, control} = useFormContext();
    
    const noteFormPrefix = formPrefix + `.${personIndex}.note`;
    const { fields, append, remove} = useFieldArray({
        control,
        name: noteFormPrefix,
    });

    console.log(`modal name: ${noteFormPrefix}`);
    const [activeModalIndex, setActiveModalIndex] = useState<number>(-1);
    const [notes, setNotes] = useState<any>([]);

    const renderModal = (noteIndex: number) => {
      console.log(`rendering modal: ${noteIndex}`);
      const shouldShow = notes.length > noteIndex && notes[noteIndex].message != "";
      const noteLabel = (shouldShow && notes[noteIndex].label != "") ? notes[noteIndex].label : `Note ${noteIndex}`;
      return (<>
        <IonLabel onClick={() => openModal(noteIndex)}>{noteLabel}</IonLabel>
        <IonModal trigger="new-note-button"
           isOpen={noteIndex == activeModalIndex}>
          <IonContent>
            <IonGrid>
              <IonRow>
                <MyTextInput index={noteIndex} placeholder="Note Label"
                              objectType={noteFormPrefix} fieldName="label"
                              required={false} onChange={()=>{}} watched={true}/>
              </IonRow>
              <IonRow>
                <MyTextArea index={notes.length} placeholder="Note Message..."
                              objectType={noteFormPrefix} fieldName="message"/>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton onClick={() => {
                    handleSubmit(closeModal);
                  }}>Save Note</IonButton>
                </IonCol>
                <IonCol>
                  <IonButton onClick={closeModal}>Cancel</IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonModal>
      </>);
    }
    

    const closeModal = (data: any) => {
      console.log('in modal');
      setActiveModalIndex(-1);
      if(data){
        console.log(data);
        append(InitNoteQuestionState());
      }
    }

    const openModal = (noteIndex: number) => {
      console.log(noteIndex);
      setActiveModalIndex(noteIndex);
    }

    return (
      <IonGrid className="shadow-container">
        <IonRow>
          <IonButton id="new-note-button" onClick={() => openModal(0)}>New Note</IonButton>
        </IonRow>
        {renderModal(0)}
        <IonRow>
            {fields.map((item, noteIndex) => {
              <p>BeepBoop</p>
              renderModal(noteIndex)
            })}
        </IonRow>
      </IonGrid>
    );
  }