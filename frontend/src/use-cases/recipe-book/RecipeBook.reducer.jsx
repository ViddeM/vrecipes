const mockBook = {
    name: "LPs lilla spritlista",
    author: "Eric Carlsson",
    uploadedBy: {
        name: "Vidar Magnusson"
    },
    recipes: [
        {
            name: "Some recipe",
            uniqueName: "some_unique_name",
            author: "Vidar Magnusson"
        },
        {
            name: "Some recipe 2",
            uniqueName: "some_unique_name_2",
            author: "Pelle"
        },
        {
            name: "Some recipe 3",
            uniqueName: "some_unique_name_3",
            author: "Kalle"
        },
        {
            name: "Some recipe with long name lol qasdasdasd 123123123 asddsjghdfsiugaluigadfiugfdluigd" ,
            uniqueName: "some_unique_name_4",
            author: "Ada lasd aga e a  ggggg 333 scvcvx  qq"
        }
    ]
}

const initialState = {
    book: mockBook
}

export function book(state = initialState, action) {
    switch (action.type) {
        default:
            return state
    }
}