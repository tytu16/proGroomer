import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { personAdd } from 'ionicons/icons';
import React from 'react';
import './FamilyList.css';

import { FamiliesProps } from '../../interfaces/FamilyInterface';
import FamilyRow from '../../components/FamilyRow/FamilyRow';
import { FamilyInfo } from '../../models/FamilyInfo';
import FamilyTabEmptyState from '../../components/FamilyTabEmptyState';


export default class FamilyList extends React.Component<FamiliesProps> {
  
  constructor(props: FamiliesProps) {
    super(props);
    this.state = {
      families: props.families
    }
  }

  render() {
    const { onNewFamily, families } = this.props;
    const familyText = "Created family ";
    let familiesToDisplay = families.length > 0;

    return (
      <IonPage>iuo89uk
        <IonHeader>
          <IonToolbar>
            <IonTitle>Families</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Families</IonTitle>
            </IonToolbar>
          </IonHeader>
          {
            familiesToDisplay ? (
              <>{
                families.map(( family: FamilyInfo ) => {
                    return (
                        <FamilyRow key={family.id} family={family} text={familyText}/>
                    );
                })
                }</>
            ) : (
              <>
                <FamilyTabEmptyState />
              </>
            )
          }
          <IonFab vertical="bottom" horizontal="center" slot="fixed"  >
            <IonFabButton routerLink="/families/createFamily">
              <IonIcon icon={personAdd}></IonIcon>
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    );
  }
}