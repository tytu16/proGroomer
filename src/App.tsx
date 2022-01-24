import { Redirect, Route } from 'react-router-dom';
import {
  setupIonicReact,
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { people, calendar, wallet } from 'ionicons/icons';
import AccountsTab from './pages/Tabs/AcccountsTab';
import CalendarsTab from './pages/Tabs/CalendarsTab';
import PaymentsTab from './pages/Tabs/PaymentsTab';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.scss';
import React from 'react';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import { AccountInfo } from './models/AccountInfo';
import AccountDetail from './pages/AccountDetails/AccountDetails';

interface AppState {
  accounts: Array<AccountInfo>,
  topIndex: number
}

setupIonicReact();

export default class App extends React.Component<any,AppState> {

  constructor(props: any){
    super(props);
    this.state = {
      accounts: [],
      topIndex: 0
    }
  }

  onNewAccount = (accountName: string) => {
    let currentState: AppState = this.state;
    const newAccount = new AccountInfo({
      id: currentState.topIndex + 1,
      accountName
    })
    currentState.accounts.push(newAccount);
    let newIndex = currentState.topIndex + 1
    this.setState({
      accounts: currentState.accounts,
      topIndex: newIndex
    });
  }

  onCreateAccount = (newAccount: AccountInfo) => {
    console.log('creating account');
    let localState: AppState = this.state;

    localState.accounts.push(newAccount);
    let newIndex = localState.topIndex+1

    this.setState({
      accounts: localState.accounts,
      topIndex: newIndex,

    })
  }

  defaultAccount = new AccountInfo({
    accountName: "defaultAccount",
    id: -1
  });

  render() {
    return (
      <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/accounts">
              <AccountsTab currentIndex={this.state.topIndex} accounts={this.state.accounts} onCreateAccount={this.onCreateAccount} onNewAccount={this.onNewAccount} />
              <Route exact path="/accounts/createAccounts" >
                <CreateAccount index={this.state.topIndex} onCreateAccount={this.onCreateAccount}/>
              </Route>
              <Route exact path="/accounts/details:id" render={({match}) => (
                <AccountDetail account={this.state.accounts.find( a =>  ':'+a.id.toString() == match.params.id ) || this.defaultAccount}/>
              )} />
            </Route>

            <Route exact path="/calendars">
              <CalendarsTab accounts={this.state.accounts} onNewAccount={this.onNewAccount} />
            </Route>
            
            <Route path="/payments">
              <PaymentsTab accounts={this.state.accounts}  onNewAccount={this.onNewAccount}/>
            </Route>
            <Route exact path="/">
              <Redirect to="/accounts" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="Accounts" href="/accounts">
              <IonIcon icon={people} />
              <IonLabel>Accounts</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Calendars" href="/calendars">
              <IonIcon icon={calendar} />
              <IonLabel>Calendars</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Payments" href="/payments">
              <IonIcon icon={wallet} />
              <IonLabel>Payments</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
    );
  }
}
