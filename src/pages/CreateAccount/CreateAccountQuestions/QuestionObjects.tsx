export interface TextFieldPropInterface {
    placeholder: any,
    label: string,
    objectType: string,
    fieldName: string,
    required: boolean,
    watched: boolean
}

export const InitNoteQuestionState = () => {
    return {id:0, label: "", message: ""};
}

export const InitPetQuestionState = () => {
    return({
        name: "",
        breed: "",
        ageYr: "0",
        ageMn: "0",
        weight: "0",
        wUnits: "",
        note: [InitNoteQuestionState()]
    })
}

export const InitPhoneNumbers = () => {
    return {phoneNumber: "", phoneType: "", textable: false};
}

export const InitPrimaryPersonQuestionState = () => {
    return ({
        isPrimary: true,
        firstName: "",
        lastName: "",
        email: "",
        phone: [InitPhoneNumbers()],
        note: [InitNoteQuestionState()]
    })
}

export const InitPersonQuestionState = () => {
    return ({
        isPrimary: false,
        firstName: "",
        lastName: "",
        email: "",
        phone: [InitPhoneNumbers()],
        note: [InitNoteQuestionState()]
    });
}

export const InitAccountQuestionState = () => {
    return ({
        accountName: "",
        addressOne: "",
        addressTwo: "",
        addressCity: "",
        addressZip: "",
        garageCd: "",
        person: [InitPrimaryPersonQuestionState()],
        pet: [InitPetQuestionState()],
        note: [InitNoteQuestionState()]
    });
}

export const AccountQuestionFields = [
    {
        placeholder: "Account Name",
        label: "Account Name", 
        objectType: "account",
        fieldName: "accountName",
        required: true,
        watched: true
    },
    {
        placeholder: "123 Some St",
        label: "Address One", 
        objectType: "account",
        fieldName: "addressOne",
        required: true,
        watched: false
    },
    {
        placeholder: "Apt 321",
        label: "Address Two", 
        objectType: "account",
        fieldName: "addressTwo",
        required: false,
        watched: false
    },
    {
        placeholder: "City",
        label: "City", 
        objectType: "account",
        fieldName: "addressCity",
        required: true,
        watched: false
    },
    {
        placeholder: "State",
        label: "State",
        objectType: "account",
        fieldName: "addressState",
        required: false,
        watched: false
    },
    {
        placeholder: "12345",
        label: "Zipcode", 
        objectType: "account",
        fieldName: "addressZip",
        required: true,
        watched: false
    },
    {
        placeholder: "*1234",
        label: "Garage Code", 
        objectType: "account",
        fieldName: "garageCd",
        required: true,
        watched: false
    },
    {
        placeholder: "Add a note",
        label: "Notes",
        objectType: "account",
        fieldName: "note",
        required: true,
        watched: true
    }
]

export const PeopleQuestionFields = [
    {
        placeholder: "",
        label: "Primary Contact?", 
        objectType: "account.0.person",
        fieldName: "isPrimary",
        required: true,
        watched: true
    },
    {
        placeholder: "First Name",
        label: "First Name", 
        objectType: "account.0.person",
        fieldName: "firstName",
        required: true,
        watched: true
    },
    {
        placeholder: "Last Name",
        label: "Last Name", 
        objectType: "account.0.person",
        fieldName: "lastName",
        required: true,
        watched: true
    },
    {
        placeholder: "Email Address",
        label: "Email", 
        objectType: "account.0.person",
        fieldName: "email",
        required: true,
        watched: false
    },
    {
        placeholder: "(XXX) XXX-XXXX",
        label: "Phone Number",
        objectType: "account.0.person.0.phone",
        fieldName: "phoneNumber",
        required: true,
        watched: false
    },
    {
        placeholder: "Add a note",
        label: "Notes",
        objectType: "account.0.person.0.note",
        fieldName: "note",
        required: true,
        watched: true
    }
]

export const PetQuestionFields = [
    {
        placeholder: "Name",
        label: "Name", 
        objectType: "account.0.pet",
        fieldName: "name",
        required: true,
        watched: true
    },
    {
        placeholder: "Breed",
        label: "Breed",
        objectType: "account.0.pet",
        fieldName: "breed",
        required: false,
        watched: true
    },
    {
        placeholder: "",
        label: "maleFemale",
        objectType: "account.0.pet",
        fieldName: "maleFemale",
        required: false,
        watched: false
    },
    {
        placeholder: "Age",
        label: "Age",
        objectType: "account.0.pet",
        fieldName: "age",
        required: false,
        watched: false
    },
    {
        placeholder: "Weight",
        label: "Weight",
        objectType: "account.0.pet",
        fieldName: "weight",
        required: false,
        watched: false
    },
    {
        placeholder: "Add a note",
        label: "Notes",
        objectType: "account.0.pet.0.note",
        fieldName: "note",
        required: true,
        watched: true
    }
] 

export const AutoFillNote = () => {
    return {label: "Note Label", message: "Note Message"};
}

export const AutoFillPet = () => {
    return({
        name: "PetName",
        breed: "PetBreed",
        maleFemale: "Male",
        ageYr: "1",
        ageMn: "4",
        weight: "14",
        wUnits: "LB",
        note: [AutoFillNote()]
    })
}

export const AutoFillPhoneNumbers = () => {
    return {phoneNumber: "5732752610", phoneType: "CL", textable: true};
}

export const AutoFillPrimaryPerson = () => {
    return ({
        isPrimary: true,
        firstName: "Primary",
        lastName: "Person",
        email: "important@gmail.com",
        phone: [AutoFillPhoneNumbers()],
        note: [AutoFillNote()]
    })
}

export const AutoFillPerson = () => {
    return ({
        isPrimary: false,
        firstName: "Secondary",
        lastName: "Person",
        email: "sad_rawr@msn.com",
        phone: [AutoFillPhoneNumbers()],
        note: [AutoFillNote()]
    });
}

export const AutoFillAccount = () => {
    return ({
        accountName: "Account Name",
        addressOne: "Address One",
        addressTwo: "",
        addressCity: "Address City",
        addressState: "MO",
        addressZip: "65203",
        garageCd: "",
        person: [AutoFillPrimaryPerson()],
        pet: [AutoFillPet()],
        note: [AutoFillNote()]
    });
}


export const AccountFieldNames = () => {
    return Object.keys(AutoFillAccount());
}

export const PeopleFieldNames = () => {
    return Object.keys(AutoFillPerson());
}

export const PetFieldNames = () => {
    return Object.keys(AutoFillPet());
}