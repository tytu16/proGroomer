import {PhoneInfo} from './PhoneInfo';

export class HumanInfo {
    private _id: string;
    private _isPrimary: boolean;
    private _firstName: string;
    private _lastName: string;
    private _email: string;
    private _phone: Array<PhoneInfo>;

    constructor(data: any, id=0){
        this._id = data.id ? data.id : "0";
        this._isPrimary = data.isPrimary ? data.isPrimary : false;
        this._firstName = data.firstName ? data.firstName : "";
        this._lastName  = data.lastName ? data.lastName : "";
        this._email = data.email ? data.email : "";
        this._phone = new Array<PhoneInfo>();

        if(data.phone != null && data.phone.length > 0){
            for(let pn of data.phone){
                this._phone.push(pn);
            }
        }
    }

    get id(): string{
        return this._id;
    }
    set id(id: string){
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

    get phones(): Array<PhoneInfo>{
        return this._phone;
    }

    set phones(phoneNumbers: Array<PhoneInfo>){
        this._phone = phoneNumbers;
    }

    get isPrimary(){
        return true;
    }

    set isPrimary(value: boolean){
        this._isPrimary = value;
    }

    addPhone(phoneNumber: PhoneInfo){
        this._phone.push(phoneNumber);
    }

    isEqualWithoutId (other: HumanInfo) {
        const diff = other._phone.filter(v => !this._phone.includes(v))
        
        return (this._firstName == other.firstName &&
                this._lastName == other.lastName &&
                this._email == other.email && 
                diff.length == 0);
    }
}