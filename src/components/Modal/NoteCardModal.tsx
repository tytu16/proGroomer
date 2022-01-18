import { IonItem,IonInput, IonGrid, IonRow, IonCol, IonButton, IonList } from '@ionic/react';
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

    const handleSave = () => {
        console.log('in note card modal');
        const data = watch(`${noteFormPrefix}.${0}.label`);
        append({label: "", message: ""});
        console.log(data);
        let newNoteLabels = noteLabels.slice().concat(data);
        console.log(`newNoteLabels: ${newNoteLabels}`);
        onSave(data);
    }

    return (
        <IonList ref={IonListRef}>
            <p>Field length: {fields.length}</p>
            {fields.map((field, noteIndex) => (<div key={field.id}>
                <ModalInput show={noteIndex == activeModal} setShow={setActiveModal} title={`New Note for ${label}`} onSave={handleSave}>
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