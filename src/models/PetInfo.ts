import { Note } from "./Note";

export class PetInfo{
    private _id: number ;
    private _name: string ;
    private _breed: string ;
    private _maleFemale: string ;
    private _weight: string;
    private _wUnits: string;
    private _ageYr: string;
    private _ageMn: string;
    private _dateEntered: string;
    private _notes: Array<Note>;

    
    constructor(data: any){
        this._id = data.id ? data.id : '0';
        this._name = data.name ? data.name : '';
        this._breed = data.breed ? data.breed : '';
        this._maleFemale = data.maleFemale ? data.maleFemale : '';
        this._weight = data.weight ? data.weight : '';
        this._wUnits = data.wUnits ? data.wUnits : '';
        this._ageYr = data.ageYr ? data.ageYr : '';
        this._ageMn = data.ageMn ? data.ageMn : '';
        if(this._ageMn != '' || this.ageYr != ''){
            this._dateEntered = new Date().toLocaleDateString("en-US");;
        } else {
            this._dateEntered = '';
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

    get maleFemale() {
        return this._maleFemale;
    }
    set maleFemale(maleFemale: string){
        this._maleFemale = maleFemale;
    }

    get weight() {
        return this._weight;
    }
    set weight(weight: string){
        this._weight = weight;
    }

    get wUnits(){
        return this._wUnits;
    }
    set wUnits(wUnits: string){
        this._wUnits = wUnits
    }

    get ageYr(){
        return this._ageYr;
    }
    set ageYr(ageYr: string){
        this._ageYr = ageYr;
    }

    get ageMn(){
        return this._ageMn;
    }
    set ageMn(ageMn: string){
        this._ageMn = ageMn;
    }

    get currentAge(): string{
        //Todo: math using date entered to update
        let yr = "";
        if (this.ageYr === '1'){
            yr = `${this.ageYr} yr`;
        } else if(this.ageYr != '0') {
            yr = `${this.ageYr} yrs`;
        }

        let mn = "";
        if (this.ageMn === '1'){
            mn = `${this.ageMn} month`;
        } else if(this.ageMn != '0'){
            mn = `${this.ageMn} months`;
        }

        let age = "";
        if(yr!='' && mn!=''){
            age = yr + ' and ' + mn + ' old';
        } else if(yr!=''){
            age = yr + ' old';
        } else {
            age = mn + ' old';
        }
    
        return age; 
    }

    get notes(){
        return this._notes;
    }
    set notes(notes: Array<Note>){
        this._notes = notes;
    }

    addNote(note: Note){
        this._notes = [...this._notes, note];
    }

    isEqualWithoutId(other: PetInfo) {
        return this._name == other.name &&
            this.breed == other.breed &&
            this.maleFemale == other.maleFemale
    }
}