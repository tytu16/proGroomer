import {AccountInfo} from "./AccountInfo"
import { PersonInfo } from "./PersonInfo";

export class Profile extends PersonInfo {
    private _isPaid: boolean;
    private _accounts: Array<AccountInfo>

    constructor(data: any){
        if(!data){
            data = {};
        }
        super(data);
        this._isPaid = data.isPaid ? data.isPaid : true;
        if(data.accounts){
            let tempAccounts = Array<AccountInfo>();
            for(let account of data.accounts){
                tempAccounts = [...tempAccounts, new AccountInfo(account)];
            }
            this._accounts = tempAccounts;
        } else {
            this._accounts = new Array<AccountInfo>();
        }
    }

    get isPaid(): boolean{
        return this._isPaid;
    }
    set isPaid(isPaid: boolean){
        this._isPaid = isPaid;
    }
    
    get accounts(): Array<AccountInfo>{
        return this._accounts;
    }
    set accounts(accounts: Array<AccountInfo>){
        this._accounts = accounts;
    }
 
    addAccount(newAccount: AccountInfo){
        this._accounts = [...this._accounts, newAccount];
    }
    addAccounts(newAccount: Array<AccountInfo>){
        this._accounts = [...this._accounts, ...newAccount];
    }
}