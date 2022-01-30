import { PersonInfo } from "./PersonInfo";
import { PetInfo } from "./PetInfo";
import { Note } from "./Note";

export class AccountInfo {
    private _id: string;
    private _accountName: string;
    private _addressOne: string;
    private _addressTwo: string;
    private _addressCity: string;
    private _addressState: string;
    private _addressZip: string;
    private _garageCd: string;
    private _people: Array<PersonInfo>;
    private _pets: Array<PetInfo>;
    private _notes: Array<Note>;

    constructor(data: any){
        this._id = data.id ? data.id : "0" ;
        this._accountName = data.accountName ? data.accountName : "";
        this._addressOne =  data.addressOne ? data.addressOne : "";
        this._addressTwo = data.addressTwo ? data.addressTwo : "";
        this._addressCity = data.addressCity ? data.addressCity : "";
        this._addressState = data.addressState ? data.addressState : "";
        this._addressZip = data.addressZip ? data.addressZip : "";
        this._garageCd = data.garageCd ? data.garageCd : "";

        if(data.person){
            let newPeople = Array<PersonInfo>();
            for(let person of data.person){
                newPeople = [...newPeople, new PersonInfo(person)];
            }
            this._people = [...newPeople];
        } else {
            this._people = new Array<PersonInfo>() ;
        }
        
        if(data.pet){
            let newPets = Array<PetInfo>();
            for(let pet of data.pet){
                newPets = [...newPets, new PetInfo(pet)];
            }
            this._pets = newPets;
        } else {
            this._pets = new Array<PetInfo>();
        }
        
        if(data.note){
            let newNotes = new Array<Note>();
            for(let note of data.note) {
                newNotes = [...newNotes, new Note(note)];
            }
            this._notes = newNotes;
        } else {
            this._notes = new Array<Note>();
        }
    }

    get addressOne(){
        return this._addressOne
    }

    set addressOne(addressOne: string){
        this._addressOne = addressOne;
    }

    get addressTwo(){
        return this._addressTwo
    }

    set addressTwo(addressTwo: string){
        this._addressTwo = addressTwo;
    }

    get addressCity(){
        return this._addressCity
    }

    set addressCity(addressCity: string){
        this._addressCity = addressCity;
    }

    get addressState(){
        return this._addressState;
    }

    set addressState(addressState: string){
        this._addressState = addressState;
    }

    get addressZip(){
        return this._addressZip;
    }

    set addressZip(addressZip: string){
        this._addressZip = addressZip; 
    }

    get fullAddress(): string{
        let fullAddress = this._addressOne;
        fullAddress += (this._addressTwo != "") ? " - " + this._addressTwo + ", " : ", ";
        fullAddress += this._addressCity + " " + this._addressState + ", " + this._addressZip;
        return fullAddress;
    }

    get garageCd(): string{
        return this._garageCd;
    }

    set garageCd(code: string){
        this._garageCd = code;
    }

    get id(): string{
        return this._id;
    }
    set id(id: string){
        this._id = id;
    }

    get accountName(): string{
        return this._accountName;
    }
    set(accountName: string){
        this._accountName = accountName;
    }

    get people(): PersonInfo[]{
        return this._people;
    }
    set people(people: PersonInfo[]){
        this._people = people;
    }

    get pets(): PetInfo[]{
        return this._pets;
    }
    set pets(pets: PetInfo[]){
        this._pets = pets;
    }

    get notes(): Note[]{
        return this._notes;
    }

    set notes(notes: Note[]){
        this._notes = notes;
    }

    addPerson(person: PersonInfo){
        this._people.push(person);
    }

    addPet(pet: PetInfo){
        this._pets.push(pet);
    }

    addNote(note: Note){
        this._notes.push(note);
    }

    baseAccountEqual(other: AccountInfo){
        return this._accountName == other.accountName &&
                this._addressOne == other.addressOne &&
                this._addressTwo == other.addressTwo &&
                this._addressCity == other.addressCity &&
                this._addressState == other.addressState &&
                this._addressZip == other.addressZip
    }
}