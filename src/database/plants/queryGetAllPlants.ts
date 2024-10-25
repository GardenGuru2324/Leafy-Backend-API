import { MongoClient } from "mongodb";

import "dotenv/config";
import { Plant, PlantsReturnObject } from "../../types/plant/plant";
import { Query } from "../../types/Query";

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryGetAllPlants = async (query: Query, page: number, limit: number): Promise<Plant[] | unknown> => {
  const itemsPerPage: number = limit;

  try {
    const plants: Plant[] = (await client
      .db(database)
      .collection("Plants")
      .find(query)
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage + 1)
      .toArray()) as Plant[];

    const getAllPlantsFromDb: Plant[] = await queryAllPlantsOfDb();

    return createPlantsReturnObject(plants, itemsPerPage, getAllPlantsFromDb, page);
  } catch (error) {
    return error;
  }
};

const queryAllPlantsOfDb = async (): Promise<Plant[]> => {
  return (await client.db(database).collection("Plants").find({}).toArray()) as Plant[];
};

const createPlantsReturnObject = (plants: Plant[], itemsPerPage: number, getAllPlantsFromDb: Plant[], page: number): PlantsReturnObject => {
  const hasNextPage: boolean = plants.length > itemsPerPage;
  const amoutOfPages: number = getAllPlantsFromDb.length / itemsPerPage;

  if (hasNextPage) plants.pop();

  return {
    itemsPerPage,
    currentPage: page,
    amoutOfPages,
    hasNextPage,
    plants,
  };
};
