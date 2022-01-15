import { IonButton, IonContent, IonGrid, IonLabel, IonModal, IonRow } from "@ionic/react";
import { useState } from "react";
import { MyTextInput } from "./MyTextInput";
import { MyTextArea } from "./MyTextArea";

export interface NoteModalProps {
    personIndex: number,
    noteIndex: number,
    formPrefix: string
  }

 export const NoteModal = (props: NoteModalProps) => {
    const {personIndex, noteIndex, formPrefix} = props;
    const noteFormPrefix = formPrefix + `.${personIndex}.note`;

    const [modalIsOpen, setIsOpen] = useState<boolean>(false);

    function closeModal() {
      setIsOpen(false);
    }

    return (
      <div className="shadow-container">
        <IonButton id="trigger-button" onClick={() => setIsOpen(true)}>New Note</IonButton>
        <IonModal
          trigger="trigger-button"
          isOpen={modalIsOpen}
        >
          <IonContent>
            <IonGrid>
              <IonRow>
                <MyTextInput index={noteIndex} placeholder="Note Label"
                              objectType={noteFormPrefix} fieldName="label"
                              required={false} onChange={()=>{}} watched={true}/>
              </IonRow>
              <IonRow>
                <MyTextArea index={noteIndex} placeholder="Note Message..."
                              objectType={noteFormPrefix} fieldName="message"/>
              </IonRow>
              <IonRow>
                <IonButton onClick={closeModal}>Close</IonButton>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonModal>
      </div>
    );
  }