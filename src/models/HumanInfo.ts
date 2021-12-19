interface PhoneNumberFieldInterface{
    value: string
}

export class HumanInfo {
    private _id: string;
    private _firstName: string;
    private _lastName: string;
    private _email: string;
    private _phoneNumbers: Array<string>;

    constructor(data: any){
        this._id = data.id;
        this._firstName = data.firstName;
        this._lastName  = data.lastName;
        this._email = data.email;
        this._phoneNumbers = new Array<string>();
        console.log('le data')
        console.log(data);

        if(data.phoneNumbers != null && data.phoneNumbers.length > 0){
            for(let pn of data.phoneNumbers){
                this._phoneNumbers.push(pn.value);
            }
        }
    }

    get id(): string{
        return this._id;
    }
    set id(id: string){
        this._id = id;
    }

    get firstName(): string{
        return this._firstName;
    }
    set firstName(firstName: string){
        this._firstName = firstName;
    }

    get lastName(): string{
        return this._lastName;
    }
    set lastName(lastName: string){
        this._lastName = lastName;
    }

    get fullName(): string {
        return this._firstName + " " + this._lastName;
    }

    get email(): string {
        return this._email;
    }

    set email(email: string){
        this._email = email;
    }

    get phoneNumbers(): Array<string>{
        return this._phoneNumbers;
    }

    set phoneNumbers(phoneNumbers: Array<string>){
        this._phoneNumbers = phoneNumbers;
    }

    addPhoneNumber(phoneNumber: string){
        this._phoneNumbers.push(phoneNumber);
    }

    isEqualWithoutId (other: HumanInfo) {
        const diff = other._phoneNumbers.filter(v => !this._phoneNumbers.includes(v))
        
        return (this._firstName == other.firstName &&
                this._lastName == other.lastName &&
                this._email == other.email && 
                diff.length == 0);
    }
}