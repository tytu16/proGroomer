import { Redirect, Route } from 'react-router-dom';

import * as _ from 'lodash';
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
import AccountsTab from './pages/Tabs/AccountsTab';
import CalendarsTab from './pages/Tabs/CalendarsTab';
import PaymentsTab from './pages/Tabs/PaymentsTab';
import {DoLogin} from './services/ApiService';

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
import { useState } from 'react';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import { AccountInfo } from './models/AccountInfo';
import { Profile } from './models/Profile';
import AccountDetail from './pages/AccountDetails/AccountDetails';
import useAuthToken from './hooks/useAuthToken';
import LoginPage from './pages/Login/LoginPage';

interface AppState {
  profile: Profile,
  topIndex: number
}

setupIonicReact();
function App () {
  const [appState, setAppState] = useState<AppState>({profile: new Profile({}),topIndex:0});
  const [token, setToken] = useState<string>("");
  const useLogin = true; 
  const onNewAccount = (accountName: string) => {
    // let currentState: AppState = _.cloneDeep(appState);
    // const newAccount = new AccountInfo({
    //   id: currentState.topIndex + 1,
    //   accountName
    // })
    // currentState.accounts.push(newAccount);
    // let newIndex = currentState.topIndex + 1
    // setAppState({
    //   accounts: currentState.accounts,
    //   topIndex: currentState.topIndex+1
    // });
  }

  const createAccounts = (newAccounts: any) => {
    let localState: AppState = _.cloneDeep(appState);
    let newAccountInfos = Array<AccountInfo>();
    for(let account of newAccounts.account){
      let newAccountInfo = new AccountInfo(account);
      newAccountInfos.push(newAccountInfo)
    }

    localState.profile.addAccounts(newAccountInfos);
    let newIndex = localState.topIndex+1

    setAppState({
      profile: localState.profile,
      topIndex: newIndex,
    })
  }

  const defaultAccount = new AccountInfo({
    accountName: "defaultAccount",
    id: -1
  });


  const logProfileIn = (data: any) => {
    const profile = new Profile(data);
    console.log('new profile');
    console.log(profile);
    setAppState({
      profile: profile,
      topIndex: profile.accounts.length
    })
    setToken('thuperThecretToken');
  }

  const onLogin = async (data: any) => {
    DoLogin(data.email,data.password).then((data) => {
      console.log('in app');
      console.log(data);
      logProfileIn(data);
    } )
  }

  return (
      <IonApp>
      <IonReactRouter>
        {((!token || token == '') && useLogin) ? (<LoginPage onLogin={onLogin} ></LoginPage>) : (
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/accounts">
                <AccountsTab currentIndex={appState.topIndex} accounts={appState.profile.accounts} createAccounts={createAccounts} onNewAccount={onNewAccount} />
                <Route exact path="/accounts/createAccounts" >
                  <CreateAccount index={appState.topIndex} createAccounts={createAccounts}/>
                </Route>
                <Route exact path="/accounts/details:id" render={({match}) => (
                  <AccountDetail account={appState.profile.accounts.find( a =>  ':'+a.id.toString() == match.params.id ) || defaultAccount}/>
                )} />
              </Route>
  
              <Route exact path="/calendars">
                <CalendarsTab accounts={appState.profile.accounts} onNewAccount={onNewAccount} />
              </Route>
              
              <Route path="/payments">
                <PaymentsTab accounts={appState.profile.accounts}  onNewAccount={onNewAccount}/>
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
          )} 
      </IonReactRouter>
    </IonApp>
    );
}

export default App;
