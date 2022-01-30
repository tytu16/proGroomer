export class Note {
    private _id: string;
    private _label: string;
    private _message: string;

    constructor(data: any){
        this._id = data.id ? data.id : "0";
        this._label = data.label ? data.label : "";
        this._message = data.message ? data.message : "";  
    }

    get id(){
        return this._id;
    }

    set id(value: string){
        this._id = value;
    }

    get label(){
        return this._label;
    }

    set label(value: string){
        this._label = value;
    }

    get message(){
        return this._message;
    }

    set message(value: string){
        this._message = value;
    }

    get hasMessage(): boolean {
        return (this?._message != '');
    }
}