import { IonItem,IonInput, IonGrid, IonRow, IonCol, IonButton, IonList, IonLabel } from '@ionic/react';
import { useRef, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { MyTextArea } from '../InputFields/MyTextArea';
import { MyTextInput } from '../InputFields/MyTextInput';
import ModalInput from './ModalInput';
import * as _ from "lodash";

interface InputProps {
    onSave: Function,
    setActiveModal: Function,
    activeModal: number,
    personIndex: number,
    label: string
    formPrefix: string
}

interface Note{
    label: string,
    message: string
}

const NoteCardModal: React.FC<InputProps> = ({activeModal, setActiveModal, personIndex, label, formPrefix, onSave}) => {
    const noteFormPrefix = formPrefix + `.${personIndex}.note`;
    const {watch, control, setValue} = useFormContext();

    const { fields, append, remove} = useFieldArray({
        control,
        name: noteFormPrefix,
    });
    const IonListRef = useRef<any>(null);
    console.log(noteFormPrefix);
  
    const [notes, setNotes] = useState<Array<Note>>([]);

    const handleSave = (index: number) => {
        console.log('in note card modal');
        const data = _.cloneDeep(watch(`${noteFormPrefix}.${index}`));
        console.log('adding data:');
        console.log(data);
        let newNotes = notes.slice();
        if(index < newNotes.length){
            newNotes[index] = data;
        } else {
            newNotes = newNotes.concat(data);
            append({label: "", message: ""});
        }
        setNotes(newNotes);
        onSave(data);
    }

    const handleCancel = (index: number) => {
        let fieldName = `${noteFormPrefix}.${index}`;
        setValue(fieldName, _.cloneDeep(notes[index]));
    }

    return (
        <IonRow>
            <IonCol>
                <IonLabel className="large-header" >Notes for {label}</IonLabel>
            </IonCol>
            <IonCol>
                <IonButton onClick={()=>setActiveModal(fields.length-1)}>Add Note</IonButton>
            </IonCol>
            <IonList ref={IonListRef}>
                {fields.map((field, noteIndex) => (<div key={field.id}>
                    <IonLabel onClick={()=>setActiveModal(noteIndex)}>{notes[noteIndex]?.label}</IonLabel>
                    <ModalInput show={noteIndex == activeModal} setShow={setActiveModal} title={`Note ${noteIndex+1} for ${label}`} 
                        onCancel={()=>handleCancel(noteIndex)} onSave={()=>handleSave(noteIndex)}>
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
                        </IonGrid>
                    </ModalInput>
                    </div>))}
            </IonList>
        </IonRow>
    );
}
export default NoteCardModal;