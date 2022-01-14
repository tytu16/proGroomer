export class Note {
    private _id: string;
    private _noteLabel: string;
    private _noteMessage: string;

    constructor(data: any){
        this._id = data.id ? data.id : "0";
        this._noteLabel = data.noteLabel ? data.noteLabel : "";
        this._noteMessage = data.noteMessage ? data.noteMessage : "";  
    }

    get id(){
        return this._id;
    }

    set id(value: string){
        this._id = value;
    }

    get noteLabel(){
        return this._noteLabel;
    }

    set noteLabel(value: string){
        this._noteLabel = value;
    }

    get noteMessage(){
        return this._noteMessage;
    }

    set noteMessage(value: string){
        this._noteMessage = value;
    }
}