import { HumanInfo } from "./HumanInfo";
import { PetInfo } from "./PetInfo";

export class FamilyInfo {
    private _id: number;
    private _familyName: string;
    private _humans: HumanInfo[];
    private _pets: PetInfo[];

    constructor(data: any){
        this._id = data.id;
        this._familyName = data.familyName;
        this._humans = data.humans;
        this._pets = data.pets;
    }

    get id(): number{
        return this._id;
    }
    set id(id: number){
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
}