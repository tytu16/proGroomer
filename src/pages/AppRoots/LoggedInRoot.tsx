import { IonRouterOutlet, IonTabs } from "@ionic/react";
import { Route } from "react-router";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import AccountDetail from "../AccountDetails/AccountDetails";
import CreateAccount from "../CreateAccount/CreateAccount";
import AccountsTab from "../Tabs/AccountsTab";
import CalendarsTab from "../Tabs/CalendarsTab";
import PaymentsTab from "../Tabs/PaymentsTab";
import DashboardTab from "../Tabs/DashboardTab";
import { AuthLevel } from "../../models/Enums/AuthLevel";

interface LoggedInRootProps {
    accounts: any,
    
}

const LoggedInRootPage = () => {


    return (
        <IonTabs>
          <IonRouterOutlet>
            <ProtectedRoute authLevel={AuthLevel.LN} path="/accounts">
              <AccountsTab currentIndex={appState.topIndex} accounts={appState.profile.accounts} createAccounts={createAccounts} onNewAccount={onNewAccount} />
              <Route exact path="/accounts/createAccounts" >
                <CreateAccount index={appState.topIndex} createAccounts={createAccounts}/>
              </Route>
              <Route exact path="/accounts/details:id" render={({match}) => (
                <AccountDetail account={appState.profile.accounts.find( a =>  ':'+a.id.toString() == match.params.id ) || defaultAccount}/>
              )} />
            </ProtectedRoute> 


            <ProtectedRoute authLevel={AuthLevel.LN} path="/calendars">
              <CalendarsTab accounts={appState.profile.accounts} onNewAccount={onNewAccount} />
            </ProtectedRoute>
            
            <ProtectedRoute  authLevel={AuthLevel.LN} path="/payments">
              <PaymentsTab accounts={appState.profile.accounts}  onNewAccount={onNewAccount}/>
            </ProtectedRoute>
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
    );
}

export default LoggedInRootPage;