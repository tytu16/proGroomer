import { IonInput, IonLabel } from "@ionic/react";
import "./InputStyling.scss";

interface CustomInputProps {
    register: any,
    error: any,
    name: string,
    handleChange?: Function,
    watched?: boolean,
    required?: boolean,
    type?:string,
    maxLength?: number | undefined,
    placeholder?: string
}

const CustomInput = (props: CustomInputProps) => {
    const {register, handleChange, error, watched, placeholder, name, type, required, maxLength} = props;
    const fieldType = (type && type != '') ? type : "text"; 

    return (
        <div className="field">
            <IonInput className="customInput" { ...register(name, { required: required })} 
                type={fieldType} placeholder={placeholder} maxlength={maxLength} 
                onIonChange={(e) => {
                    if(watched && handleChange){handleChange(e);}
                  }}/>
            <IonLabel className="fieldLabel">
                {error && <p className="animate__animated animate__bounceIn">{ name + ' is required' }</p> }
            </IonLabel>
        </div>
    );
};

export default CustomInput;