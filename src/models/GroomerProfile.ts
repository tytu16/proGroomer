import { FamilyInfo } from "./FamilyInfo";

export class GroomerProfile {
    private _id: string;
    private _firstName: string;
    private _lastName: string;
    private _clients: Array<FamilyInfo>;

    constructor(data: any){
        this._id = data.id;
        this._firstName = data.firstName;
        this._lastName = data.lastName;
        this._clients = data.clients.length > 0 ? data.clients : new Array<FamilyInfo>();
    }

    get id(): string{
        return this._id;
    }
    set id(id: string) {
        this._id = id;
    }

    get firstName(): string{
        return this._firstName;
    }
    set firstName(firstName: string){
        this._firstName = firstName;
    }

    get lastName():string {
        return this._lastName;
    }
    set lastName(lastName: string){
        this._lastName = lastName;
    }

    get clients(): Array<FamilyInfo> {
        return this._clients;
    }
    set clients(clients: Array<FamilyInfo>) {
        this._clients = clients;
    }

    addClient(client: FamilyInfo){
        if(this._clients == null){
            this._clients = [client];
        } else {
            this._clients.push(client);
        }
    }    

}