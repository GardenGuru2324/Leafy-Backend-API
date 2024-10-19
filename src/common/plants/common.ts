import { NotFoundError } from '../../errors/error';
import { errorMessages } from '../../errors/errorMessages';
import { Plant } from '../../types/plant/plant';
import { isNullOrUndefined } from '../common';

export const doesPlantExist = (plant: Plant): void => {
	if (isNullOrUndefined(plant))
		throw new NotFoundError(errorMessages.plantNotFound);
};

export const doesHavePlants = (plants: Plant[]): void => {
	if (plants.length == 0)
		throw new NotFoundError(errorMessages.plantsNotFound);
};
