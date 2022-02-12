import {IonItem, IonLabel} from "@ionic/react";
import {useForm} from "react-hook-form";

import {emptyProfile} from "./CreateProfileObjects";
interface CreateProfileProps {

}

export const CreateProfile = (props: CreateProfileProps) => {

    const {handleSubmit, register,} = useForm({
        defaultValues: {profile: emptyProfile()}
      });

    return (
        <IonItem>
            <IonLabel position="floating">First Name</IonLabel>
        </IonItem>
        
    );
}