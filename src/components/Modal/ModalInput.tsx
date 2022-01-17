import {IonPopover, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonFooter, IonButton, IonIcon} from '@ionic/react';
import {addCircleOutline} from 'ionicons/icons';

import "../InputFields/InputStyling.css"

interface ModalProps {
    title: string,
    show: boolean,
    setShow: Function,
    value: number | string,
    onSave: Function
}

const ModalInput: React.FC<ModalProps> = (props) => {
    var { show, setShow, title, value, onSave } = props;
    return (
    <IonPopover className="modal-popover" isOpen={show} size="cover" side="top" onDidDismiss={() => { setShow(false); }}>
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
                <IonButton color="light" onClick={() => { setShow(false); }}>Cancel</IonButton>
                <IonButton color="primary" onClick={() => { onSave(value); setShow(false); }}><IonIcon slot="start" icon={addCircleOutline} /> Save</IonButton>
            </IonFooter>

        </IonContent>
    </IonPopover>
);
};
export default ModalInput;