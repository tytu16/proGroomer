export const humanFields = [
    {
      label: "First name",
      required: true,
      requiredOptions: {
        maxLength: 64
      },
      props: {
        name: "firstname",
        // type: "text" ,
        // inputmode: "text",
        placeholder: "Human's first name"
      }
    },
    {
      label: "Last Name",
      required: true,
      requiredOptions: {
        maxLength: 64
      },
      props: {
        name: "lastname",
        // type: "text",
        // inputmode: "text",
        placeholder: "Human's last name"
      }
    },
    {
      label: "Email Address",
      requiredOptions: {
        maxLength: 64
      },
      props: {
        name: "emailAddress",
        // type: "text",
        // inputmode: "text",
        placeholder: "Human's Email Address"
      }
    },
    {
      label: "Phone Number",
      requiredOptions: {
        maxLength: 64
      },
      props: {
        name: "phoneNumber",
        // type: "number",
        // inputmode: "numeric",
        placeholder: "Human's Phone Number"
      }
    },
    {
      label: "AddressOne",
      require: true,
      requiredOptions: {
        maxLength: 64
      },
      props: {
        name: "addressOne",
        // type: "text",
        // inputmode: "text",
        placeholder: "123 Some St"
      }
    },
    {
      label: "AddressTwo",
      requiredOptions: {
        maxLength: 64
      },
      props: {
        name: "addressTwo",
        // type: "text",
        // inputmode: "text",
        placeholder: "Apt #"
      }
    },
    {
      label: "AddressCity",
      requiredOptions: {
        maxLength: 64
      },
      props: {
        name: "addressCity",
        // type: "text",
        // inputmode: "text",
        placeholder: "City"
      }
    },
    {
      label: "AddressState",
      requiredOptions: {
        maxLength: 64
      },
      props: {
        name: "addressState",
        // type: "text",
        // inputmode: "text",
        placeholder: "State"
      }
    },
    {
      label: "Address Zip",
      requiredOptions: {
        maxLength: 64
      },
      props: {
        name: "addressZip",
        // type: "text",
        // inputmode: "text",
        placeholder: "Zip Code"
      }
    }
  ];