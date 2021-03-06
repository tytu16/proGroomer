export const accountResponse = [
    {
        id: 1,
        accountName: "The Three Stooges",
        people: [
            {
                id: 1,
                firstName: "Larry",
                lastName: "Stooge"
            },
            {
                id: 2,
                firstName: "Harry",
                lastName: "Stooge"
            },
            {
                id: 3,
                firstName: "Mo",
                lastName: "Stooge",
            }
        ],
        pets: [
            {
                id: 1,
                name: "Barkins",
                breed: "Mutt",
                sex: "male"
            },
            {
                id: 2,
                name: "Stumpy",
                breed: "Bulldog",
                sex: "male"
            },
            {
                id: 3,
                name: "Boomer",
                breed: "yorky",
                sex: "female"
            }
        ]
    },
    {
        id: 2,
        accountName: "The Addams Family",
        people: [
            {
                id: 1,
                firstName: "Morticia",
                lastName: "Addams"
            },
            {
                id: 2,
                firstName: "Gomez",
                lastName: "Addams"
            },
            {
                id: 3,
                firstName: "Wednesday",
                lastName: "Addams"
            },
            {
                id: 4,
                firstName: "Pugsley",
                lastName: "Addams"
            }
        ],
        pets: [
            {
                id: 1,
                name: "Cousin Itt",
                breed: "Komondor",
                sex: "unknown"
            },
            {
                id: 2,
                name: "kitty kat",
                breed: "lion",
                sex: "female"
            },
            {
                id: 3,
                name: "snappy",
                breed: "alligator",
                sex: "male"
            }
        ]
    }
]

export const groomerResponse = {
    id: 1,
    firstName: "Lenn",
    lastName: "MacAnnaly",
    clients: accountResponse
}

export const emptyAccount = []