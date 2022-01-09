export interface TextFieldPropInterface {
    placeholder: any,
    label: string,
    objectType: string,
    fieldName: string,
    required: boolean,
    watched: boolean
}

export const InitPetQuestionState = {
    id: 0,
    name: "",
    breed: "",
    sex: "",
    age: "-1"
}

export const InitHumanPhoneNumbers = {
    phoneNumber: ""
}

export const InitPrimaryHumanQuestionState = {
    id: 0,
    isPrimary: true,
    firstName: "",
    lastName: "",
    email: "",
    phone: [InitHumanPhoneNumbers]
}

export const InitHumanQuestionState = {
    id: 0,
    isPrimary: false,
    firstName: "",
    lastName: "",
    email: "",
    phone: [InitHumanPhoneNumbers]
}

export const InitFamilyQuestionState = {
    id: 0,
    familyName: "",
    addressOne: "",
    addressTwo: "",
    addressCity: "",
    addressZip: "",
    human: [InitPrimaryHumanQuestionState],
    pet: [InitPetQuestionState]
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
]

export const HumanQuestionFields = [
    {
        placeholder: "",
        label: "Primary Contact?", 
        objectType: "family.0.human",
        fieldName: "isPrimary",
        required: true,
        watched: true
    },
    {
        placeholder: "First Name",
        label: "First Name", 
        objectType: "family.0.human",
        fieldName: "firstName",
        required: true,
        watched: true
    },
    {
        placeholder: "Last Name",
        label: "Last Name", 
        objectType: "family.0.human",
        fieldName: "lastName",
        required: true,
        watched: true
    },
    {
        placeholder: "Email Address",
        label: "Email", 
        objectType: "family.0.human",
        fieldName: "email",
        required: true,
        watched: false
    },
    {
        placeholder: "(XXX) XXX-XXXX",
        label: "Phone Numbers",
        objectType: "family.0.human.0.phone",
        fieldName: "phoneNumber",
        required: true,
        watched: false
    },
]

export const PetQuestionFields = [
    {
        placeholder: "",
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
        label: "sex",
        objectType: "family.0.pet",
        fieldName: "sex",
        required: false,
        watched: false
    },
    {
        placeholder: "Age",
        label: "age",
        objectType: "family.0.pet",
        fieldName: "age",
        required: false,
        watched: false
    },
] 