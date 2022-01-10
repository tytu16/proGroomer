import { HumanInfo } from "./HumanInfo";
import { PetInfo } from "./PetInfo";

export class FamilyInfo {
    private _id: string;
    private _familyName: string;
    private _addrOne: string;
    private _addrTwo: string;
    private _addrCity: string;
    private _addrState: string;
    private _addrZip: string;
    private _garageCd: string;
    private _humans: HumanInfo[];
    private _pets: PetInfo[];

    constructor(data: any){
        this._id = data.id;
        this._familyName = data.familyName;
        this._humans = data.humans ? data.humans : new Array<HumanInfo>() ;
        this._pets = data.pets ? data.pets : new Array<PetInfo>();
        this._addrOne =  data.addrOne;
        this._addrTwo = data.addrTwo;
        this._addrCity = data.addrCity;
        this._addrState = data.addrState;
        this._addrZip = data.addrZip;
        this._garageCd = data.garageCd
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

    get humans(): HumanInfo[]{
        return this._humans;
    }
    set humans(humans: HumanInfo[]){
        this._humans = humans;
    }

    get pets(): PetInfo[]{
        return this._pets;
    }
    set pets(pets: PetInfo[]){
        this._pets = pets;
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