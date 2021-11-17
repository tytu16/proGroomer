import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { personAdd } from 'ionicons/icons';
import React from 'react';
import './FamilyList.css';

import { FamiliesState, FamiliesProps } from '../../interfaces/FamilyInterface';
import FamilyRow from '../../components/FamilyRow/FamilyRow';
import { FamilyInfo } from '../../models/FamilyInfo';

export default class FamilyList extends React.Component<FamiliesProps,FamiliesState> {
  
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
      <IonPage>
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
                }
              </>
            ) : (
              <>
                <h1> Looks like you don't have any families yet,</h1>
                <h2> Press the button below to get started.</h2>
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