import { IonInput, IonLabel } from "@ionic/react";
import "./InputStyling.scss";

interface CustomFieldProps {
    register: any,
    error: any,
    require: boolean,
    name: string,
    placeholder: string
}

const CustomField = (props: CustomFieldProps) => {
    const {register, error, placeholder, name} = props;

    return (
        
        <div className="field">
            <IonInput className="customInput" { ...register(name, { required: true })} placeholder={placeholder} />
            <IonLabel className="fieldLabel">
                {error && <p className="animate__animated animate__bounceIn">{ name + ' is required to login' }</p> }
            </IonLabel>
        </div>
    );
};

export default CustomField;