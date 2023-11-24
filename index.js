import express from 'express'
const app = express()

const preflight = (req, res, next) => {
    if(req.method==='OPTIONS' || req.method==='options'){
        console.log('options')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
        res.setHeader('Access-Control-Allow-Headers', 'content-type, authorization')
        res.status(200).json(({body: "OK"}))
    } else next()
}

app.use(preflight)

import cors from 'cors'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { typeDefs } from './graphql/schema.js'
import { resolvers } from './graphql/resolvers.js'

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
})

await server.start()

app.use('/', cors(), express.json(), expressMiddleware(server, {
    context: async ({req}) => ({ token: req.headers.authorization }) 
}))

app.listen(process.env.port || 4001, ()=>console.log('server running'))
