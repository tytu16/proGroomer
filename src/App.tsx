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
import LoginPage from './pages/Login/LoginPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import {AuthLevel} from "./models/Enums/AuthLevel";

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
    console.log('in app onLogin');
    logProfileIn(data);
  }

  return (
      <IonApp>
      <IonReactRouter>
        { token ? <LoggedInRoot/> : <NotLoggedInRoot/> }
      </IonReactRouter>
    </IonApp>
    );
}

export default App;
