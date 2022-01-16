import {IonGrid, IonRow, IonCol} from "@ionic/react";

interface SlideWrapperProps {
    title: string
}

const SlideWrapper: React.FC<SlideWrapperProps> = (props) => {
    
    return (
        <IonGrid class="slide-grid ion-justify-content-center ion-align-items-center ion-align-self-center">
        <IonRow class="spacer"></IonRow>
        <IonRow>
            <IonCol size="10" className="slide-content">
                <h1>{props.title}</h1>
                {props.children}
            </IonCol>
        </IonRow>
        <IonRow class="spacer"></IonRow>
        </IonGrid>
    );
}

export default SlideWrapper;