export class PetInfo{
    private _id: number ;
    private _name:string ;
    private _breed:string ;
    private _sex:string ;
    
    constructor(data: any){
        this._id = data.id;
        this._name = data.name;
        this._breed = data.breed;
        this._sex = data.sex;
    }

    get id(): number {
        return this._id;
    }
    set id(id: number){
        this._id = id;
    }
    get name(): string {
        return this._name;
    }

    set name(name: string){
        this._name = name;
    }
    get breed(): string {
        return this._breed;
    }

    set breed(breed: string){
        this._breed = breed;
    }
    get sex() {
        return this._sex;
    }
    set sex(sex: string){
        this._sex = sex;
    }

    isEqualWithoutId(other: PetInfo) {
        return this._name == other.name &&
            this.breed == other.breed &&
            this.sex == other.sex
    }
}