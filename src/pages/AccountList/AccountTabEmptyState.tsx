import { IonButton, IonGrid, IonRow, IonCol, IonHeader, IonText } from "@ionic/react";
import { useHistory } from "react-router";
import "../CreateAccount/CreateAccount.scss";

const AccountTabEmptyState = () => {

    const history = useHistory();

const getStarted = () => {
    history.push("/accounts/createAccounts");
}

	return (
        <IonGrid class="slide-grid ion-justify-content-center ion-align-items-center ion-align-self-center">
            <IonRow class="spacer"></IonRow>
                <IonRow>
                    <IonCol size="10" className="slide-content">
                        <IonHeader><h1 className="ion-text-center">Hello!</h1></IonHeader>
                        <IonText>
                            <h2 className="ion-text-center">Looks like you haven't saved any accounts.</h2>
                        </IonText>
                        <IonButton onClick={getStarted} expand="block" fill="outline">Get Started! &rarr;</IonButton>
                    </IonCol>
                </IonRow>
            <IonRow class="spacer"></IonRow>
        </IonGrid>
	);
}

export default AccountTabEmptyState;