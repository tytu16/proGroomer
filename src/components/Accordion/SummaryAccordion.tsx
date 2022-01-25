import {IonItem, IonLabel, IonCard, IonCardContent, IonList} from "@ionic/react";

interface SummaryAccordionProps {
    isActive: boolean,
    fields: Array<string>
}

const SummaryAccordion:React.FC<SummaryAccordionProps> = (props) => {
    const {isActive, fields} = props;
    return (
        <IonList slot="content" className={["accordion", (isActive ? "" : "collapsed")].join(" ")}>
            <div className="question-content">
            <IonCard>
                <IonCardContent>
                    {
                        fields.map((f, fieldIndex) => {
                            return(<IonItem key={fieldIndex} slot="content" mode='md' lines="none">
                                <IonLabel>{f}</IonLabel>
                            </IonItem>);
                        })
                    }
                    
                </IonCardContent>
            </IonCard>
            </div>
        </IonList>
    );
}

export default SummaryAccordion;