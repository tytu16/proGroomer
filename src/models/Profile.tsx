import {AccountInfo} from "./AccountInfo"
import { PersonInfo } from "./PersonInfo";

export class Profile {
    private _id: string;
    private _isPaid: boolean;
    private _personalInfo: PersonInfo;
    private _accounts: Array<AccountInfo>

    constructor(data: any){
        if(!data){
            data = {};
        }
        this._id = data.id ? data.id : '0';
        this._isPaid = data.isPaid ? data.isPaid : true;
        this._personalInfo = data.personalInfo ? data.personalInfo : new PersonInfo({});
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

    get id(): string{
        return this._id;
    }
    set id(id: string){
        this._id = id;
    }

    get isPaid(): boolean{
        return this._isPaid;
    }
    set isPaid(isPaid: boolean){
        this._isPaid = isPaid;
    }

    get personalInfo(): PersonInfo {
        return this._personalInfo;
    }
    set personalInfo(personalInfo: PersonInfo){
        this._personalInfo = personalInfo;
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