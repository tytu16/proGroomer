import { IonItem,IonInput, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';
import { useState } from 'react';
import { MyTextArea } from '../InputFields/MyTextArea';
import { MyTextInput } from '../InputFields/MyTextInput';
import ModalInput from './ModalInput';

interface InputProps {
    onSave: Function,
    show: boolean,
    setShow: Function,
    personIndex: number,
    formPrefix: string
}
const NoteCardModal: React.FC<InputProps> = ({show, setShow, personIndex, formPrefix, onSave}) => {
    const [value, setValue] = useState<string>("");
    const noteFormPrefix = formPrefix + `.${personIndex}.note`;

    return (
    <ModalInput show={show} setShow={setShow} title="New Note" value={value} onSave={onSave}>
        <IonGrid>
            <IonRow>
                <MyTextInput index={0} placeholder="Note Label"
                    objectType={noteFormPrefix} fieldName="label"
                    required={false} onChange={()=>{}} watched={true}/>
            </IonRow>
            <IonRow>
                <MyTextArea index={0} placeholder="Note Message..."
                    objectType={noteFormPrefix} fieldName="message"/>
            </IonRow>
        </IonGrid>
    </ModalInput>
    );
}
export default NoteCardModal;