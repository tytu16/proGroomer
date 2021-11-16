export default class BaseFamily {
    private _id: number = 0;
    private _familyName: string = "";

    constructor(data: any){
        this.id = data?.id;
        this.familyName = data?.familyName;
    }

    get id(): number{
        return this._id;
    }

    set id(id: number) {
        this._id = id;
    }

    get familyName(): string{
        return this._familyName;
    }

    set familyName(familyName: string) {
        this._familyName = familyName;
    }

}