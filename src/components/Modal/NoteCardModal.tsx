import { IonItem,IonInput, IonGrid, IonRow, IonCol, IonButton, IonList, IonLabel } from '@ionic/react';
import { useRef, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { MyTextArea } from '../InputFields/MyTextArea';
import { MyTextInput } from '../InputFields/MyTextInput';
import ModalInput from './ModalInput';

interface InputProps {
    onSave: Function,
    setActiveModal: Function,
    activeModal: number,
    personIndex: number,
    label: string
    formPrefix: string
}
const NoteCardModal: React.FC<InputProps> = ({activeModal, setActiveModal, personIndex, label, formPrefix, onSave}) => {
    const noteFormPrefix = formPrefix + `.${personIndex}.note`;
    const {watch, control} = useFormContext();

    const { fields, append, remove} = useFieldArray({
        control,
        name: noteFormPrefix,
    });
    const IonListRef = useRef<any>(null);
    console.log(noteFormPrefix);
  
    const [noteLabels, setNoteLabels] = useState<Array<string>>([]);

    const handleSave = (index: number) => {
        console.log('in note card modal');
        const data = watch(`${noteFormPrefix}.${index}.label`);
        console.log('')
        append({label: "", message: ""});
        let newNoteLabels = noteLabels.slice().concat(data);
        setNoteLabels(newNoteLabels);
        onSave(data);
    }

    return (
        <IonList ref={IonListRef}>
            {fields.map((field, noteIndex) => (<div key={field.id}>
                {(true) ? (
                    <IonLabel onClick={()=>setActiveModal(noteIndex)}>{noteLabels[noteIndex]}</IonLabel>
                ) : (
                    <></>
                )}
                <ModalInput show={noteIndex == activeModal} setShow={setActiveModal} title={`New Note for ${label}`} onSave={()=>handleSave(noteIndex)}>
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
    );
}
export default NoteCardModal;