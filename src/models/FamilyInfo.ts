import { PersonInfo } from "./PersonInfo";
import { PetInfo } from "./PetInfo";
import { Note } from "./Note";

export class FamilyInfo {
    private _id: string;
    private _familyName: string;
    private _addrOne: string;
    private _addrTwo: string;
    private _addrCity: string;
    private _addrState: string;
    private _addrZip: string;
    private _garageCd: string;
    private _people: PersonInfo[];
    private _pets: PetInfo[];
    private _notes: Note[];

    constructor(data: any){
        this._id = data.id ? data.id : "0" ;
        this._familyName = data.familyName ? data.familyName : "";
        this._people = data.people ? data.people : new Array<PersonInfo>() ;
        this._pets = data.pets ? data.pets : new Array<PetInfo>();
        this._notes = data.notes ? data.notes : new Array<Note>();  
        this._addrOne =  data.addrOne ? data.addrOne : "";
        this._addrTwo = data.addrTwo ? data.addrTwo : "";
        this._addrCity = data.addrCity ? data.addrCity : "";
        this._addrState = data.addrState ? data.addrState : "";
        this._addrZip = data.addrZip ? data.addrZip : "";
        this._garageCd = data.garageCd ? data.garageCd : "";
    }

    get addrOne(){
        return this._addrOne
    }

    set addrOne(addrOne: string){
        this._addrOne = addrOne;
    }

    get addrTwo(){
        return this._addrTwo
    }

    set addrTwo(addrTwo: string){
        this._addrTwo = addrTwo;
    }

    get addrCity(){
        return this._addrCity
    }

    set addrCity(addrCity: string){
        this._addrCity = addrCity;
    }

    get addrState(){
        return this._addrState;
    }

    set addrState(addrState: string){
        this._addrState = addrState;
    }

    get addrZip(){
        return this._addrZip;
    }

    set addrZip(addrZip: string){
        this._addrZip = addrZip; 
    }

    get fullAddress(): string{
        let fullAddress = this._addrOne;
        fullAddress += (this._addrTwo != "") ? " - " + this._addrTwo + ", " : ", ";
        fullAddress += this._addrCity + " " + this._addrState + ", " + this._addrZip;
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

    get familyName(): string{
        return this._familyName;
    }
    set(familyName: string){
        this._familyName = familyName;
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

    baseFamilyEqual(other: FamilyInfo){
        return this._familyName == other.familyName &&
                this.addrOne == other.addrOne &&
                this.addrTwo == other.addrTwo &&
                this.addrCity == other.addrCity &&
                this.addrState == other.addrState &&
                this.addrZip == other.addrZip
    }
}