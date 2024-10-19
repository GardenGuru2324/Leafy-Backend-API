import express from 'express';

import allPlants from './plants/getAllPlants';
import plantDetails from './plants/getPlantDetails';

import { closeDatabase, connectDatabase } from '../database/db';

const router = express.Router();

// Achter deze API endpoint zitten al de endpoints. {baseUrl}/api/v1/{api-endpoint}
router.get('/', async (req, res) => {
	try {
		await connectDatabase();
		return res.json({
			message: 'API V1',
		});
	} catch (error) {
		return error;
	} finally {
		await closeDatabase();
	}
});

// Hier worden de endpoints gedefinieerd die gebruikt moeten worden door de router.

// Plants
router.use(allPlants);
router.use(plantDetails);

export default router;
