import {IonGrid, IonRow, IonCol} from "@ionic/react";

interface SlideWrapperProps {
    title: string,
    spacers?: boolean
}

const SlideWrapper: React.FC<SlideWrapperProps> = ({title, spacers=true, children}) => {
    return (
        <IonGrid class="slide-grid ion-justify-content-center ion-align-items-center ion-align-self-center">
        {spacers && <IonRow class="spacer"></IonRow>}
        <IonRow>
            <IonCol size="10" className="slide-content">
                <h1>{title}</h1>
                {children}
            </IonCol>
        </IonRow>
        {spacers && <IonRow class="spacer"></IonRow>}
        </IonGrid>
    );
}

export default SlideWrapper;