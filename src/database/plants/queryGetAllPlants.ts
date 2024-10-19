import { MongoClient } from 'mongodb';

import 'dotenv/config';
import { Plant, PlantsReturnObject } from '../../types/plant/plant';
import { Query } from '../../types/Query';

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryGetAllPlants = async (
	query: Query,
	page: number,
): Promise<Plant[] | unknown> => {
	const itemsPerPage: number = 4;
	try {
		const plants: Plant[] = (await client
			.db(database)
			.collection('Plants')
			.find(query)
			.project({ plantName: 1, plantId: 1, image: 1 })
			.skip((page - 1) * itemsPerPage)
			.limit(itemsPerPage + 1)
			.toArray()) as Plant[];

		const nextPage: boolean = plants.length > itemsPerPage;

		if (nextPage) plants.pop();

		const plantsReturnObject: PlantsReturnObject = {
			nextPage,
			plants,
		};

		return plantsReturnObject;
	} catch (error) {
		return error;
	}
};
