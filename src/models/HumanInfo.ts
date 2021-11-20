export class HumanInfo {
    private _id: number;
    private _firstName: string;
    private _lastName: string;
    private _email: string;

    constructor(data: any){
        this._id = data.id;
        this._firstName = data.firstName;
        this._lastName  = data.lastName;
        this._email = data.email;
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

    get fullName(): string {
        return this._firstName + " " + this._lastName;
    }

    get email(): string {
        return this._email;
    }

    set email(email: string){
        this._email = email;
    }

    isEqualWithoutId (other: HumanInfo) {
        return (this._firstName == other.firstName &&
                this._lastName == other.lastName &&
                this._email == other.email);
    }
}