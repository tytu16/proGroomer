import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel } from "@ionic/react";

interface AccordionHeaderProps{
    fieldArrayIndex: number,
    primaryIndex: number,
    handleDelete: (i: number) => void,
}

const AccordionHeader: React.FC<AccordionHeaderProps> = (props) => {
    const {fieldArrayIndex, primaryIndex, handleDelete} = props;
    return (
        <IonItemSliding className={primaryIndex == fieldArrayIndex ? 'accordion-header primary' : 'accordion-header' }>
        {(fieldArrayIndex == primaryIndex) ? (
            <IonItemOptions side="start"><IonItemOption onClick={() => {alert('Can\'t delete primary contact.')}} color="primary" expandable>
                Primary
            </IonItemOption></IonItemOptions>
        ) : (
            <IonItemOptions side={"start"}><IonItemOption onClick={() => handleDelete(fieldArrayIndex)} color="danger" expandable>
                Delete
            </IonItemOption></IonItemOptions>
        )}
        {props.children}
        {(fieldArrayIndex == primaryIndex) ? (
            <IonItemOptions side="end"><IonItemOption onClick={() => {alert('Can\'t delete primary contact.')}} color="primary" expandable>
                Primary
            </IonItemOption></IonItemOptions>
        ) : (
            <IonItemOptions side={"end"}><IonItemOption onClick={() => handleDelete(fieldArrayIndex)} color="danger" expandable>
                Delete
            </IonItemOption></IonItemOptions>
        )}
    </IonItemSliding>
    );
}

export default AccordionHeader;