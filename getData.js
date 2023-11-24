import  { MongoClient, ObjectId } from 'mongodb'

export default async function GetData(dbName, collectionName, field_name, field_value, autor){
	const url = 'mongodb+srv://vercel-admin-user:Nqa7PD2Tiu7D2GrF@cluster0.2bgyfbp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

	let mongoClient

	try {
		mongoClient = new MongoClient(url)
		console.log('Connecting to MongoDB..')
		await mongoClient.connect()
		console.log('Successfully connected')
		const db = mongoClient.db(dbName)
		const collection = db.collection(collectionName)
		let info

		if(field_name==='_id'){
			info = collection.find({[field_name]: new ObjectId(field_value)}).toArray()
		} else {
			if(collectionName==='Users'){
				info = collection.findOne({ [field_name] : field_value })
				
			}else if(collectionName==='Recipes' && field_name==='ingrediente'){
				info = collection.find({'receta.ingrediente': {$regex: field_value}}).toArray()
			}else{
				let query = {[field_name]: {$regex: field_value}}
				if(field_name==='autor') query = {[field_name]: field_value}
				
				info = collection.find( field_value	? query	: {} ).toArray()
			}
		}
		return await info
	
	} catch (error) {
		console.error('Connection to MongoDB was failed!', error)
		process.exit()
	} finally {
		await mongoClient.close()
	}
}