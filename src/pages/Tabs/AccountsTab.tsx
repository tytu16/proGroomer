import {IonPage, IonRouterOutlet } from '@ionic/react';
import React from 'react';
import './AccountsTab.scss';

import AccountList from '../AccountList/AccountList';
import { Route } from 'react-router';
import CreateAccount from '../CreateAccount/CreateAccount';
import { AccountInfo } from '../../models/AccountInfo';
import AccountDetail from '../AccountDetails/AccountDetails';

export interface AccountsTabProps{
  accounts: Array<AccountInfo>,
  currentIndex: number
  onNewAccount: (account: string) => void,
  createAccounts: (accounts: any) => void
}

export interface AccountsProps {
    accounts: Array<AccountInfo>,
    onNewAccount: (account: string) => void,
}


export interface AccountsState {
    accounts: Array<AccountInfo>;
}

export default class AccountsTab extends React.Component<AccountsTabProps,AccountsState> {
  
  constructor(props: AccountsTabProps) {
    super(props);
    this.state = {
      accounts: props.accounts
    }
  }

  render() {
    const { onNewAccount, accounts, currentIndex, createAccounts } = this.props;
    return (
      <IonPage>
        <IonRouterOutlet>
          <Route exact path="/accounts">
            <AccountList accounts={accounts} onNewAccount={onNewAccount} />
            <Route exact path="/accounts/createAccounts" >
              <CreateAccount index={currentIndex} createAccounts={createAccounts}/>
            </Route>
            <Route exact path="/accounts/details:id" render={({match}) => (
              <AccountDetail account={accounts.find( a => ':'+a.id.toString() == match.params.id) || new AccountInfo({})} />
            )}
            />
          </Route>
        </IonRouterOutlet>
      </IonPage>
    );
  }
}