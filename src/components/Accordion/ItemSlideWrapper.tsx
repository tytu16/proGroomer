import {IonItem, IonItemOption, IonItemOptions, IonItemSliding } from "@ionic/react";

import "../InputFields/InputStyling.scss";  

interface ItemSlideWrapperProps{
    fieldArrayIndex: number,
    isPrimary: boolean,
    handleDelete: (i: number) => void,
    handleAccordion: (i: number) => void
}

const ItemSlideWrapper: React.FC<ItemSlideWrapperProps> = (props) => {
    const {fieldArrayIndex, isPrimary, handleDelete, handleAccordion} = props;
    return (
        <IonItemSliding className={isPrimary ? 'accordion-header primary' : 'accordion-header' }>
            {(isPrimary) ? (
                <IonItemOptions side="start"><IonItemOption onClick={() => {alert('Can\'t delete primary contact.')}} color="primary" expandable>
                    Primary
                </IonItemOption></IonItemOptions>
            ) : (
                <IonItemOptions side={"start"}><IonItemOption onClick={() => handleDelete(fieldArrayIndex)} color="danger" expandable>
                    Delete
                </IonItemOption></IonItemOptions>
            )}
            <IonItem className={isPrimary ? 'primary' : '' }
                    onClick={() => handleAccordion(fieldArrayIndex)} slot="header" mode='md' lines="none"
                    fill={isPrimary ? 'solid': 'outline'}>
                {props.children}
            </IonItem>
            {(isPrimary) ? (
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

export default ItemSlideWrapper;