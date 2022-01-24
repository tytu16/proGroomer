import {IonItem, IonLabel, IonCard, IonCardContent, IonList} from "@ionic/react";

interface SummaryAccordionProps {
    isActive: boolean,
    label: string
}

const SummaryAccordion:React.FC<SummaryAccordionProps> = (props) => {
    const {isActive, label} = props;
    return (
        <IonList slot="content" className={["accordion", (isActive ? "" : "collapsed")].join(" ")}>
            <div className="question-content">
            <IonCard>
                <IonCardContent>
                    <IonItem slot="content" mode='md' lines="none">
                        <IonLabel>{label}</IonLabel>
                    </IonItem>
                </IonCardContent>
            </IonCard>
            </div>
        </IonList>
    );
}

export default SummaryAccordion;