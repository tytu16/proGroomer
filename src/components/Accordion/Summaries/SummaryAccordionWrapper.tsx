import {IonCard, IonCardContent, IonList} from "@ionic/react";

interface SummaryAccordionWrapperProps {
    isActive: boolean
}

const SummaryAccordionWrapper:React.FC<SummaryAccordionWrapperProps> = (props) => {
    const {isActive} = props;
    return (
        <IonList slot="content" className={["accordion", (isActive ? "" : "collapsed")].join(" ")}>
            <div className="question-content">
            <IonCard>
                <IonCardContent>
                    {props.children}
                </IonCardContent>
            </IonCard>
            </div>
        </IonList>
    );
}

export default SummaryAccordionWrapper;