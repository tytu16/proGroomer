import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { walletSharp } from 'ionicons/icons'; 
import React from 'react';
import './PaymentsTab.scss';

import { AccountsProps, AccountsState } from '../../models/interfaces/AccountInterface';
import AccountRow from '../../components/AccountRow/AccountRow';

export default class PaymentsTab extends React.Component<AccountsProps, AccountsState> {

  constructor(props: AccountsProps){
    super(props);
    this.state = {
      accounts: props.accounts
    }
  }

  render(){

    const {accounts, onNewAccount} = this.props;
    const paymentText = "Displaying payment ";
    let accountsToDisplay = accounts.length > 0;

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
            accountsToDisplay ? (
              <>
                {
                  accounts.map(( account ) => {
                    return (
                      <AccountRow key={account.id} account={account} text={paymentText}/>
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
            <IonFabButton onClick={() => {onNewAccount("accountPay"+accounts.length+1)}}>
              <IonIcon icon={walletSharp}></IonIcon>
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    );
  };
}