import { Redirect, Route } from 'react-router-dom';
import {
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
import FamiliesTab from './pages/Tabs/FamiliesTab';
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
import './theme/variables.css';
import React from 'react';
import BaseFamily from './models/baseFamily';
import CreateFamily from './pages/CreateFamily/CreateFamily';

interface AppState {
  families: Array<BaseFamily>,
  maxFamilyIndex: number
}

export default class App extends React.Component<any,AppState> {

  constructor(props: any){
    super(props);
    this.state = {
      families: [],
      maxFamilyIndex: 0
    }
  }

  onNewFamily = (familyName: string) => {
    let currentState: AppState = this.state;
    const newFamily = new BaseFamily({
      id: currentState.maxFamilyIndex + 1,
      familyName
    })
    currentState.families.push(newFamily);
    let newIndex = currentState.maxFamilyIndex + 1
    this.setState({
      families: currentState.families,
      maxFamilyIndex: newIndex
    });
  }

  onCreateFamily = (newFamily: BaseFamily) => {
    console.log('creating family');
  }

  render() {
    return (
      <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/families">
              <FamiliesTab families={this.state.families} onCreateFamily={this.onCreateFamily} onNewFamily={this.onNewFamily} />
              <Route exact path="/families/createFamily" >
                <CreateFamily onCreateFamily={this.onCreateFamily}/>
              </Route>
            </Route>

            <Route exact path="/calendars">
              <CalendarsTab families={this.state.families} onNewFamily={this.onNewFamily} />
            </Route>
            
            <Route path="/payments">
              <PaymentsTab families={this.state.families}  onNewFamily={this.onNewFamily}/>
            </Route>
            <Route exact path="/">
              <Redirect to="/families" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="Families" href="/families">
              <IonIcon icon={people} />
              <IonLabel>Families</IonLabel>
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
