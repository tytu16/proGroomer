import { IonItem,IonInput } from '@ionic/react';
import { useState } from 'react';
import ModalInput from './ModalInput';

interface InputProps {
    onSave: Function,
    show: boolean,
    setShow: Function,
    defaultValue: number
}
const WeightInput: React.FC<InputProps> = ({show, setShow, defaultValue, onSave}) => {
    const [value, setValue] = useState<number>(defaultValue);

    return (
    <ModalInput show={show} setShow={setShow} title="Starting weight" value={value} onSave={onSave}>
        <IonItem>
            <IonInput value={value} onIonChange={e => setValue(parseFloat(e.detail.value!))}></IonInput>
        </IonItem>
    </ModalInput>
);
}
export default WeightInput;