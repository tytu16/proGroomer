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
import CreateFamily from './pages/CreateFamily/CreateFamily';
import { FamilyInfo } from './models/FamilyInfo';
import FamilyDetail from './pages/FamilyDetails/FamilyDetails';

interface AppState {
  families: Array<FamilyInfo>,
  topIndex: number
}

setupIonicReact();

export default class App extends React.Component<any,AppState> {

  constructor(props: any){
    super(props);
    this.state = {
      families: [],
      topIndex: 0
    }
  }

  onNewFamily = (familyName: string) => {
    let currentState: AppState = this.state;
    const newFamily = new FamilyInfo({
      id: currentState.topIndex + 1,
      familyName
    })
    currentState.families.push(newFamily);
    let newIndex = currentState.topIndex + 1
    this.setState({
      families: currentState.families,
      topIndex: newIndex
    });
  }

  onCreateFamily = (newFamily: FamilyInfo) => {
    console.log('creating family');
    let localState: AppState = this.state;

    localState.families.push(newFamily);
    let newIndex = localState.topIndex+1

    this.setState({
      families: localState.families,
      topIndex: newIndex,

    })
  }

  defaultFam = new FamilyInfo({
    familyName: "defaultFam",
    id: -1
  });

  render() {
    return (
      <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/families">
              <FamiliesTab currentIndex={this.state.topIndex} families={this.state.families} onCreateFamily={this.onCreateFamily} onNewFamily={this.onNewFamily} />
              <Route exact path="/families/createFamily" >
                <CreateFamily index={this.state.topIndex} onCreateFamily={this.onCreateFamily}/>
              </Route>
              <Route exact path="/families/details:id" render={({match}) => (
                <FamilyDetail family={this.state.families.find( f =>  ':'+f.id.toString() == match.params.id ) || this.defaultFam}/>
              )} />
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
