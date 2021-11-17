import {IonPage, IonRouterOutlet } from '@ionic/react';
import React from 'react';
import './FamiliesTab.css';

import { FamiliesState } from '../../interfaces/FamilyInterface';
import FamilyList from '../FamilyList/FamilyList';
import { Route } from 'react-router';
import CreateFamily from '../CreateFamily/CreateFamily';
import { FamilyInfo } from '../../models/FamilyInfo';
import FamilyDetails from '../FamilyDetails/FamilyDetails';
import FamilyDetail from '../FamilyDetails/FamilyDetails';

export interface FamiliesTabProps{
  families: Array<FamilyInfo>,
  currentIndex: number
  onNewFamily: (family: string) => void,
  onCreateFamily: (family: FamilyInfo) => void
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
            <Route exact path="/families/details:id" render={({match}) => (
              <FamilyDetail family={families.find( f => ':'+f.id.toString == match.params.id) || new FamilyInfo({})}
              />
            )}
            />
          </Route>
        </IonRouterOutlet>
      </IonPage>
    );
  }
}