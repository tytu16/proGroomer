import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel } from "@ionic/react";
import { arrowDownCircleOutline, arrowDownCircle } from 'ionicons/icons';

import "../InputFields/InputStyling.scss";  

interface AccordionHeaderProps{
    fieldArrayIndex: number,
    isPrimary: boolean,
    isActive: boolean,
    label?: string,
    disabled?: boolean,
    labelClass?: string,
    handleDelete: (i: number) => void,
    handleAccordion: (i: number) => void
}

const AccordionHeader: React.FC<AccordionHeaderProps> = (props) => {
    const {fieldArrayIndex, isPrimary, isActive, label="", handleDelete, handleAccordion, labelClass, disabled=false} = props;
    return (
        <IonItemSliding disabled={disabled} className={isPrimary ? 'accordion-header primary' : 'accordion-header' }>
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
                {label != "" ? (
                    <IonLabel>
                        {labelClass == "bold-header" ? (<h1 className={labelClass}>{label}</h1>) : (label) }
                    </IonLabel>
                ) : (
                    props.children
                )}
                <IonIcon className={[(isActive ? "active icon float-right" : "icon float-right"),
                    isPrimary ? "primary" : ""].join(" ")} size="large"
                    icon={isPrimary ? arrowDownCircle : arrowDownCircleOutline}>
                </IonIcon>
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

export default AccordionHeader;