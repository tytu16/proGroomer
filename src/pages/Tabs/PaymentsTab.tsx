import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { walletSharp } from 'ionicons/icons'; 
import React from 'react';
import './PaymentsTab.css';

import { FamiliesProps, FamiliesState } from '../../interfaces/FamilyInterface';
import FamilyRow from '../../components/FamilyRow/FamilyRow';

export default class PaymentsTab extends React.Component<FamiliesProps, FamiliesState> {

  constructor(props: FamiliesProps){
    super(props);
    this.state = {
      families: props.families
    }
  }

  render(){

    const {families, onNewFamily} = this.props;
    const paymentText = "Displaying payment ";
    let familiesToDisplay = families.length > 0;

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Payments</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Payments</IonTitle>
            </IonToolbar>
          </IonHeader>
          {
            familiesToDisplay ? (
              <>
                {
                  families.map(( family ) => {
                    return (
                      <FamilyRow family={family.familyName} text={paymentText}/>
                  );})
                }
              </>
            ) : (
              <>
                <h1> Looks like you don't have any Payments yet,</h1>
                <h2> Press the button below to get started.</h2>
              </>
            )
          }
          <IonFab horizontal="center" vertical="bottom" slot="fixed">
            <IonFabButton onClick={() => {onNewFamily("familyPay"+families.length+1)}}>
              <IonIcon icon={walletSharp}></IonIcon>
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    );
  };
}