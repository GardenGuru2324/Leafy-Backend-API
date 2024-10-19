import express from 'express';

import { createResponseObject, handleErrors } from '../../common/common';
import { PlantsReturnObject } from '../../types/plant/plant';
import { queryGetAllPlants } from '../../database/plants/queryGetAllPlants';
import { Query } from '../../types/Query';
import { doesHavePlants } from '../../common/plants/common';

const router = express.Router();

router.get('/plants', async (req, res) => {
	const plantName: string | undefined = req.query.search as string;
	let page = parseInt(req.query.page as string) || 1;
	try {
		const query: Query = {};

		if (plantName !== undefined && plantName !== '') {
			query.plantName = { $regex: plantName, $options: 'i' };
		}

		const allPlants: PlantsReturnObject = (await queryGetAllPlants(
			query,
			page,
		)) as PlantsReturnObject;

		doesHavePlants(allPlants.plants);

		return createResponseObject(200, allPlants, res);
	} catch (error) {
		return handleErrors(error, res);
	}
});

export default router;
