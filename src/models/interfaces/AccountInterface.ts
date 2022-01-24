import { AccountInfo } from "../AccountInfo";

export interface AccountsProps {
    accounts: Array<AccountInfo>,
    onNewAccount: (account: string) => void,
}


export interface AccountsState {
    accounts: Array<AccountInfo>;
}