export class HumanInfo {
    private _id: number;
    private _firstName: string;
    private _lastName: string;

    constructor(data: any){
        this._id = data.id;
        this._firstName = data.firstName;
        this._lastName  = data.lastName;
    }

    get id(): number{
        return this._id;
    }
    set id(id: number){
        this._id = id;
    }

    get firstName(): string{
        return this._firstName;
    }
    set firstName(firstName: string){
        this._firstName = firstName;
    }

    get lastName(): string{
        return this._lastName;
    }
    set lastName(lastName: string){
        this._lastName = lastName;
    }
}