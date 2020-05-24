const mockRecipe = {
    name: "Chokladbollar",
    imageSrc: "/static/images/chokladbollar.jpg",
    description: " Dessa chokladbollar får en liten karamellsmak av att smöret först får puttra. Rulla chokladbollarna i kokos eller pärlsocker, det som du själv föredrar. ",
    steps: [
        {
            number: 1,
            description: "Smält smöret"
        },
        {
            number: 2,
            description: "Rör ihop socker, vaniljsocker, kakao, havregryn, kaffe och smöret. Ställ in i kylskåp så att smeten stelnar lite, ca 1 timme."
        }, {
            number: 3,
            description: "Forma bollar. Rulla i pärlsocker (gärna mångfärgat), kokos eller annan garnering. "
        }
    ],
    ingredients: [
        {
            name: "smör",
            amount: "100",
            unit: "g"
        },
        {
            name: "socker",
            amount: "1",
            unit: "dl"
        },
        {
            name: "vaniljsocker",
            amount: "1",
            unit: "msk"
        },
        {
            name: "havregryn",
            amount: "3",
            unit: "dl"
        },
        {
            name: "kallt starkt kaffe",
            amount: "3",
            unit: "msk"
        },
        {
            name: "pärlsocker eller annan garnering",
            amount: "",
            unit: ""
        }
    ],
    estimatedTime: 90,
    ovenTemperature: 200
}

const initialState = {
    recipe: mockRecipe
}

export function recipe(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
