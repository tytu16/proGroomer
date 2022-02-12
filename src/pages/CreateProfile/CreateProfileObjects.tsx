export const emptyProfile = () => {
    return ({
        id: "0",
        firstName: "",
        lastName: "",
        email: "",
        phone: {
            phoneNumber: "",
            phoneType: "",
            textable: false
        }
    });
}