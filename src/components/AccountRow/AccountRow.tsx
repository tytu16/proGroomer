import { IonButton } from '@ionic/react';
import { AccountInfo } from '../../models/AccountInfo';
import './AccountRow.scss';

interface AccountRowProps {
  account: AccountInfo;
  text: string;
}

const AccountRow: React.FC<AccountRowProps> = ({ account, text }) => {
  return (
    <div>
      <h1>
        <IonButton routerLink={"/accounts/details:"+account.id}>
          {text} - <strong>{account.accountName}</strong>
        </IonButton>
      </h1>
    </div>
  );
};

export default AccountRow;
