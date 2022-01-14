export class PhoneInfo {
    private _id: string;
    private _phoneNumber: string;
    private _phoneType: string;
    private _textable: boolean;

    constructor(data: any){
        this._id = data.id ? data.id : '0';
        this._phoneNumber = data.phoneNumber ? data.phoneNumber : "";
        this._phoneType = data.phoneType ? data.phoneType : "";
        this._textable = data.textable ? data.textable : false;
    }

    get id(){
        return this._id;
    }

    set id(value: string){
        this._id = value;
    }
    
    get phoneNumber(){
        return this._phoneNumber;
    }

    set phoneNumber(value: string){
        this._phoneNumber = value;
    }

    get phoneType(){
        return this._phoneType;
    }

    set phoneType(value: string){
        this._phoneType = value;
    }

    get textable(){
        return this._textable;
    }

    set textable(value: boolean){
        this._textable = value;
    }
}