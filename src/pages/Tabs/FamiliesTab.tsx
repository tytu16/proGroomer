import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/react';
import { personAdd } from 'ionicons/icons';
import React from 'react';
import './FamiliesTab.css';

import { FamiliesState, FamiliesTabProps } from '../../interfaces/FamilyInterface';
import FamilyRow from '../../components/FamilyRow/FamilyRow';
import FamilyList from '../FamilyList/FamilyList';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router';
import CreateFamily from '../CreateFamily/CreateFamily';

export default class FamiliesTab extends React.Component<FamiliesTabProps,FamiliesState> {
  
  constructor(props: FamiliesTabProps) {
    super(props);
    this.state = {
      families: props.families
    }
  }

  render() {
    const { onNewFamily, families, onCreateFamily } = this.props;
    return (
      <IonPage>
          <IonRouterOutlet>
            <Route exact path="/families">
              <FamilyList families={families} onNewFamily={onNewFamily} />
            </Route>
            <Route exact path="/families/createFamily" >
              <CreateFamily onCreateFamily={onCreateFamily}/>
            </Route>
          </IonRouterOutlet>
      </IonPage>
    );
  }
}