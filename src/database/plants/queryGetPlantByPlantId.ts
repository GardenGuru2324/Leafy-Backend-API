import { MongoClient } from 'mongodb';

import 'dotenv/config';
import { Plant, PlantsReturnObject } from '../../types/plant/plant';
import { Query } from '../../types/Query';

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryGetPlantByPlantId = async (
	plantId: string,
): Promise<Plant | unknown> => {
	try {
		return (await client
			.db(database)
			.collection('Plants')
			.findOne({ plantId: plantId })) as Plant;
	} catch (error) {
		return error;
	}
};
