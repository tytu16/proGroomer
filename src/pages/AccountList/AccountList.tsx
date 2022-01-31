import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { personAdd } from 'ionicons/icons';
import React from 'react';
import './AccountList.scss';

import { AccountsProps } from '../../models/interfaces/AccountInterface';
import AccountRow from '../../components/AccountRow/AccountRow';
import { AccountInfo } from '../../models/AccountInfo';
import AccountTabEmptyState from './AccountTabEmptyState';


export default class AccountList extends React.Component<AccountsProps> {
  
  constructor(props: AccountsProps) {
    super(props);
    this.state = {
      accounts: props.accounts
    }
  }

  render() {
    const { onNewAccount, accounts } = this.props;
    const accountText = "Created account ";
    let accountToDisplay = accounts.length > 0;

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Accounts</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Accounts</IonTitle>
            </IonToolbar>
          </IonHeader>
          {
            accountToDisplay ? (
              <>{
                accounts.map(( account: AccountInfo, accountIndex: number ) => {
                  return (
                      <AccountRow key={accountIndex} account={account} text={accountText}/>
                  );}
                )
              }</>
            ) : (
              <>
                <AccountTabEmptyState />
              </>
            )
          }
          <IonFab vertical="bottom" horizontal="center" slot="fixed"  >
            <IonFabButton routerLink="/accounts/createAccounts">
              <IonIcon icon={personAdd}></IonIcon>
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    );
  }
}