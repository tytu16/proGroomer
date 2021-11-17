import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { calendarOutline } from 'ionicons/icons';
import './CalendarsTab.css';
import { useFamilyData } from '../../hooks/useFamilyData';
import React from 'react';

import { FamiliesProps, FamiliesState } from '../../interfaces/FamilyInterface';
import FamilyRow from '../../components/FamilyRow/FamilyRow';

export default class CalendarsTab extends React.Component<FamiliesProps,FamiliesState> {

  constructor(props: FamiliesProps) {
    super(props);
    this.state = {
      families: props.families
    }
  }

  render(){
    const { onNewFamily, families } = this.props;
    const calendarText = "Displaying calendar ";
    const familiesToDisplay = families.length > 0;
    console.log(families);

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Calendars</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Calendars</IonTitle>
            </IonToolbar>
          </IonHeader>
          {
            familiesToDisplay ? (
              <>
                {
                  families.map(( family ) => {
                    return (
                      <FamilyRow key={family.id} family={family} text={calendarText}/>
                  );})
                }
              </>
            ) : (
              <>
                <h1> Looks like you don't have any Calendars yet,</h1>
                <h2> Press the button below to get started.</h2>
              </>
            )
          }
          <IonFab vertical="bottom" horizontal="center" slot="fixed">
            <IonFabButton onClick={() => {onNewFamily("familyCal-"+families.length+1)}}>
              <IonIcon icon={calendarOutline}></IonIcon>
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    );
  };
}