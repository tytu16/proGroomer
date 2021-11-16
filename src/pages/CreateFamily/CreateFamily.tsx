import { IonCol, IonGrid, IonRow } from "@ionic/react";
import React from "react";
import BaseFamily from "../../models/baseFamily";

export interface CreateFamilyProps {
    onCreateFamily: (family: BaseFamily) => void
}

export interface CreateFamilyState {
    familyName: string
}

export default class CreateFamily extends React.Component<CreateFamilyProps, CreateFamilyState> {

    constructor(props: any) {
        super(props);

        this.state = {
            familyName: "familyName"
        }
    }
    render(){
        const { onCreateFamily } = this.props;
        console.log("create family render");
        return (
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <h1>Creating a Family</h1>
                        <p>creating la fambam</p>
                    </IonCol>
                </IonRow>
            </IonGrid>
        );
    }
}