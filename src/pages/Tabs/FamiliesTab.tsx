import {IonPage, IonRouterOutlet } from '@ionic/react';
import React from 'react';
import './FamiliesTab.css';

import { FamiliesState } from '../../interfaces/FamilyInterface';
import FamilyList from '../FamilyList/FamilyList';
import { Route } from 'react-router';
import CreateFamily from '../CreateFamily/CreateFamily';
import BaseFamily from '../../models/baseFamily';

export interface FamiliesTabProps{
  families: Array<BaseFamily>,
  currentIndex: number
  onNewFamily: (family: string) => void,
  onCreateFamily: (family: BaseFamily) => void
}

export default class FamiliesTab extends React.Component<FamiliesTabProps,FamiliesState> {
  
  constructor(props: FamiliesTabProps) {
    super(props);
    this.state = {
      families: props.families
    }
  }

  render() {
    const { onNewFamily, families, currentIndex, onCreateFamily } = this.props;
    return (
      <IonPage>
          <IonRouterOutlet>
            <Route exact path="/families">
              <FamilyList families={families} onNewFamily={onNewFamily} />
              <Route exact path="/families/createFamily" >
                <CreateFamily index={currentIndex} onCreateFamily={onCreateFamily}/>
              </Route>
            </Route>
          </IonRouterOutlet>
      </IonPage>
    );
  }
}