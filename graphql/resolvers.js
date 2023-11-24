import 'dotenv/config'
import jwt from 'jsonwebtoken'
import GetData from "../getData.js"
import { argsControl, findMatches } from "./functions/index.js"

const authenticateToken = async(origin, contextValue) => {
    const token = contextValue.token.split(' ')[1]
    const verifyToken = jwt.verify(token, process.env.SECRET_FOR_TOKEN, (err, obj)=>{
        if(err) return ''
        return obj
    })

    if(verifyToken==='') console.log('🚫Verification Token failed') 
    else console.log('🔑Verification Token Succeed')
    
    const dbName = 'CostosSite'
    if(origin==='Ingredients')
        return await GetData(dbName, 'Ingredients', 'autor', verifyToken.user)

    if(origin==='Recipes')
        return await GetData(dbName, 'Recipes', 'autor', verifyToken.user)
}

export const resolvers = {
    Ingredient: {
        ingredient: (root)=>root.ingrediente,
        trademark: (root)=>root.marca,
        price: (root)=>root.precio,
        measurement_unit: (root)=>root.unidad_medida,
        category: (root)=>root.categoria,
        last_modification: (root)=>root.ultima_modificacion,
        autor: (root)=>root.autor,
        _id: (root)=>root._id        
    },

    Recipe: {
        _id: (root) => root._id,
        autor: (root) => root.autor,
        name: (root) => root.nombre,
        last_modification: (root) => root.ultima_modificacion,
        category: (root) => root.categoria,
    },

    Query: {
        allIngredients: (root, args) => {
            let {start, end} = argsControl(args.page, args.amount)            
            return ingredients.slice(start, end)
        },
        allRecipes: (root, args) => {
            let {start, end} = argsControl(args.page, args.amount)   
            return recipes.slice(start, end)
        },
        
        findIngredients: async (root, args, contextValue, info) => {
            const ingredients = await authenticateToken('Ingredients', contextValue)

            let {start, end} = argsControl(args.page, args.amount) 
            const result = findMatches(ingredients, args.name)            
            return result.slice(start, end)            
        },        
        findRecipes: async (root, args, contextValue, info) => {
            const recipes = await authenticateToken('Recipes', contextValue)

            let {start, end} = argsControl(args.page, args.amount) 
            const result = findMatches(recipes, args.name)      
            return result.slice(start, end)
        }
    }
}