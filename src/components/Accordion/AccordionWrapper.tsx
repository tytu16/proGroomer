import { IonList } from "@ionic/react";

interface AccordionWrapperProps{
    classNames: string
}

const AccordionWrapper:React.FC<AccordionWrapperProps> = (props) => {
    const {classNames} = props;
    return (
    <IonList className={classNames} slot="content">
        <div className="question-content">
            {props.children}
        </div>
    </IonList>
    );
}

export default AccordionWrapper;