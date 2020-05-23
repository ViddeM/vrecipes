const initialState = {
    recipes: [
        {
            name: "ChokladBollar",
            image: "/static/images/chokladbollar.jpg",
            author: "Vidar"
        },
        {
            name: "Sphagetti & Köttfärssås",
            image: "/static/images/temp_image.jpg",
            author: "Eric"
        },
        {
            name: "Ungsbakad lax",
            author: "Jacob"
        }
    ]
}


export function searchList(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
