import { Note } from './Note';
import {PhoneInfo} from './PhoneInfo';

export class PersonInfo {
    private _id: string;
    private _isPrimary: boolean;
    private _firstName: string;
    private _lastName: string;
    private _email: string;
    private _phone: Array<PhoneInfo>;
    private _notes: Array<Note>;

    constructor(data: any, id=0){
        this._id = data.id ? data.id : "0";
        this._isPrimary = data.isPrimary ? data.isPrimary : false;
        this._firstName = data.firstName ? data.firstName : "";
        this._lastName  = data.lastName ? data.lastName : "";
        this._email = data.email ? data.email : "";

        if(data.phone){
            let newPhones = Array<PhoneInfo>();
            for(let pn of data.phone){
                newPhones = [...newPhones, new PhoneInfo(pn)];
            }
            this._phone = newPhones;
        } else {
            this._phone = new Array<PhoneInfo>();
        }

        if(data.note){
            let newNotes = new Array<Note>();
            for(let note of data.note) {
                if(note.label != '' || note.message != ''){
                    newNotes = [...newNotes, new Note(note)];
                }
            }
            this._notes = newNotes;
        } else {
            this._notes = new Array<Note>();
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

    isEqualWithoutId (other: PersonInfo) {
        const diff = other._phone.filter(v => !this._phone.includes(v))
        
        return (this._firstName == other.firstName &&
                this._lastName == other.lastName &&
                this._email == other.email && 
                diff.length == 0);
    }
}