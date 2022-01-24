import {IonItem, IonIcon, IonLabel, IonCard, IonCardContent} from "@ionic/react";
import { arrowDownCircleOutline } from "ionicons/icons";

interface SummaryHeaderProps {
    isActive: boolean,
    label: string,
    setIsActive: Function
}

const SummaryHeader:React.FC<SummaryHeaderProps> = (props) => {
    const {isActive, setIsActive, label} = props;
    return (
        <IonCard>
            <IonCardContent>
            <IonItem onClick={() => setIsActive(!isActive)} slot="header" mode='md' lines="none">
                <IonLabel>{label}</IonLabel>
                <IonIcon className={(isActive ? "active icon float-right" : "icon float-right")} size="large"
                    icon={arrowDownCircleOutline}>
                </IonIcon>
            </IonItem>
            </IonCardContent>
        </IonCard>
    );
}

export default SummaryHeader;