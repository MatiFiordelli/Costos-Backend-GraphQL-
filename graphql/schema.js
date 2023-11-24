export const typeDefs = `
    type Ingredient{
        ingredient: String
        trademark: String
        price: Float
        measurement_unit: String
        category: String
        last_modification: String
        autor: String
        _id: ID
    }

    type Recipe{
        _id: ID
        autor: String
        name: String
        last_modification: String
        category: String
    }

    type Query{
        allIngredients(page: Int, amount: Int): [Ingredient]
        allRecipes(page: Int, amount: Int): [Recipe]
        findIngredients(name: String, page: Int, amount: Int): [Ingredient]
        findRecipes(name: String, page: Int, amount: Int): [Recipe]
    }
`