export interface TextFieldPropInterface {
    placeholder: string,
    label: string,
    objectType: string,
    fieldName: string,
    required: boolean
}

export const InitFamilyQuestionState = {
    familyName: "",
    addressOne: "",
    addressTwo: "",
    addressCity: "",
    addressZip: "",
    human: [{
        firstName: "",
        lastName: "",
        email: ""
    }]
  }

export const InitHumanQuestionState = {
    firstName: "",
    lastName: "",
    email: ""
}

export const FamilyQuestionFields = [
    {
        placeholder: "Family Name",
        label: "Family Name", 
        objectType: "family",
        fieldName: "familyName",
        required: true
    },
    {
        placeholder: "123 Some St",
        label: "Address One", 
        objectType: "family",
        fieldName: "addressOne",
        required: true
    },
    {
        placeholder: "Apt 321",
        label: "Address Two", 
        objectType: "family",
        fieldName: "addressTwo",
        required: false
    },
    {
        placeholder: "City",
        label: "City", 
        objectType: "family",
        fieldName: "addressCity",
        required: true
    },
    {
        placeholder: "State",
        label: "State",
        objectType: "family",
        fieldName: "addressState",
        required: false
    },
    {
        placeholder: "12345",
        label: "Zipcode", 
        objectType: "family",
        fieldName: "addressZip",
        required: true
    },
]

export const HumanQuestionFields = [
    {
        placeholder: "First Name",
        label: "First Name", 
        objectType: "human",
        fieldName: "firstName",
        required: true
    },
    {
        placeholder: "Last Name",
        label: "Last Name", 
        objectType: "family.0.human",
        fieldName: "lastName",
        required: true
    },
    {
        placeholder: "Email Address",
        label: "Email", 
        objectType: "family.0.human",
        fieldName: "email",
        required: true
    },
]