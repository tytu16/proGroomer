import {IonPopover, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonFooter, IonButton, IonIcon} from '@ionic/react';
import { appendFileSync } from 'fs';
import {addCircleOutline} from 'ionicons/icons';

import "../InputFields/InputStyling.css"

interface ModalProps {
    title: string,
    setShow: Function,
    onSave: Function,
    onCancel: Function
}

const ModalInput: React.FC<ModalProps> = (props) => {
    var { setShow, title, onSave, onCancel } = props;

    return (
        <IonContent class="ion-text-center modal-content">
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>{title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="text-center">
                    {props.children}
                </IonCardContent>
            </IonCard>
            <IonFooter>
                <IonButton color="light" onClick={() => { onCancel(); setShow(-1); }}>Cancel</IonButton>
                <IonButton color="primary" onClick={() => { onSave(); setShow(-1); }}><IonIcon slot="start" icon={addCircleOutline} /> Save</IonButton>
            </IonFooter>
        </IonContent>
    );
};
export default ModalInput;