import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { calendarOutline } from 'ionicons/icons';
import './CalendarsTab.scss';
import React from 'react';

import { AccountsProps, AccountsState } from '../../models/interfaces/AccountInterface';
import AccountRow from '../../components/AccountRow/AccountRow';

export default class CalendarsTab extends React.Component<AccountsProps,AccountsState> {

  constructor(props: AccountsProps) {
    super(props);
    this.state = {
      accounts: props.accounts
    }
  }

  render(){
    const { onNewAccount, accounts } = this.props;
    const calendarText = "Displaying calendar ";
    const accountsToDisplay = accounts.length > 0;
    console.log(accounts);

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Calendars</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Calendars</IonTitle>
            </IonToolbar>
          </IonHeader>
          {
            accountsToDisplay ? (
              <>
                {
                  accounts.map(( account ) => {
                    return (
                      <AccountRow key={account.id} account={account} text={calendarText}/>
                  );})
                }
              </>
            ) : (
              <>
                <h1> Looks like you don't have any Calendars yet,</h1>
                <h2> Press the button below to get started.</h2>
              </>
            )
          }
          <IonFab vertical="bottom" horizontal="center" slot="fixed">
            <IonFabButton onClick={() => {onNewAccount("accountCal-"+accounts.length+1)}}>
              <IonIcon icon={calendarOutline}></IonIcon>
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    );
  };
}