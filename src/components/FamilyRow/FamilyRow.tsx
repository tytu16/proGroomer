import { IonButton } from '@ionic/react';
import { FamilyInfo } from '../../models/FamilyInfo';
import './FamilyRow.css';

interface FamilyRowProps {
  family: FamilyInfo;
  text: string;
}

const FamilyRow: React.FC<FamilyRowProps> = ({ family, text }) => {
  return (
    <div>
      <h1>
        <IonButton routerLink={"/families/details:"+family.id}>
          {text} - <strong>{family.familyName}</strong>
        </IonButton>
      </h1>
    </div>
  );
};

export default FamilyRow;
