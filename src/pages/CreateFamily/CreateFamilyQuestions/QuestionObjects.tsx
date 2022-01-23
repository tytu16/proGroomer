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

export const InitFamilyQuestionState = () => {
    return ({
        familyName: "",
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

export const FamilyQuestionFields = [
    {
        placeholder: "Family Name",
        label: "Family Name", 
        objectType: "family",
        fieldName: "familyName",
        required: true,
        watched: true
    },
    {
        placeholder: "123 Some St",
        label: "Address One", 
        objectType: "family",
        fieldName: "addressOne",
        required: true,
        watched: false
    },
    {
        placeholder: "Apt 321",
        label: "Address Two", 
        objectType: "family",
        fieldName: "addressTwo",
        required: false,
        watched: false
    },
    {
        placeholder: "City",
        label: "City", 
        objectType: "family",
        fieldName: "addressCity",
        required: true,
        watched: false
    },
    {
        placeholder: "State",
        label: "State",
        objectType: "family",
        fieldName: "addressState",
        required: false,
        watched: false
    },
    {
        placeholder: "12345",
        label: "Zipcode", 
        objectType: "family",
        fieldName: "addressZip",
        required: true,
        watched: false
    },
    {
        placeholder: "*1234",
        label: "Garage Code", 
        objectType: "family",
        fieldName: "garageCd",
        required: true,
        watched: false
    },
    {
        placeholder: "Add a note",
        label: "Notes",
        objectType: "family",
        fieldName: "note",
        required: true,
        watched: true
    }
]

export const PeopleQuestionFields = [
    {
        placeholder: "",
        label: "Primary Contact?", 
        objectType: "family.0.person",
        fieldName: "isPrimary",
        required: true,
        watched: true
    },
    {
        placeholder: "First Name",
        label: "First Name", 
        objectType: "family.0.person",
        fieldName: "firstName",
        required: true,
        watched: true
    },
    {
        placeholder: "Last Name",
        label: "Last Name", 
        objectType: "family.0.person",
        fieldName: "lastName",
        required: true,
        watched: true
    },
    {
        placeholder: "Email Address",
        label: "Email", 
        objectType: "family.0.person",
        fieldName: "email",
        required: true,
        watched: false
    },
    {
        placeholder: "(XXX) XXX-XXXX",
        label: "Phone Number",
        objectType: "family.0.person.0.phone",
        fieldName: "phoneNumber",
        required: true,
        watched: false
    },
    {
        placeholder: "Add a note",
        label: "Notes",
        objectType: "family.0.person.0.note",
        fieldName: "note",
        required: true,
        watched: true
    }
]

export const PetQuestionFields = [
    {
        placeholder: "Name",
        label: "Name", 
        objectType: "family.0.pet",
        fieldName: "name",
        required: true,
        watched: true
    },
    {
        placeholder: "Breed",
        label: "Breed",
        objectType: "family.0.pet",
        fieldName: "breed",
        required: false,
        watched: true
    },
    {
        placeholder: "",
        label: "maleFemale",
        objectType: "family.0.pet",
        fieldName: "maleFemale",
        required: false,
        watched: false
    },
    {
        placeholder: "Age",
        label: "Age",
        objectType: "family.0.pet",
        fieldName: "age",
        required: false,
        watched: false
    },
    {
        placeholder: "Weight",
        label: "Weight",
        objectType: "family.0.pet",
        fieldName: "weight",
        required: false,
        watched: false
    },
    {
        placeholder: "Add a note",
        label: "Notes",
        objectType: "family.0.pet.0.note",
        fieldName: "note",
        required: true,
        watched: true
    }
] 