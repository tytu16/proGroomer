import { IonList } from "@ionic/react";
interface AccordionWrapperProps{
    classNames: string,
    addBorder?: boolean
}

const AccordionWrapper:React.FC<AccordionWrapperProps> = (props) => {
    const {classNames, addBorder=true} = props;
    return (
    <IonList className={classNames} slot="content">
        <div className={addBorder ? "question-content" : ""}>
            {props.children}
        </div>
    </IonList>
    );
}

export default AccordionWrapper;