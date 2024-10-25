import { ObjectId } from "mongodb";

export interface Plant {
  _id: ObjectId;
  plantId: string;
  plantName: string;
  plantType: string;
  image: string;
  minHeight: number;
  maxHeight: number;
  minTemp: number;
  maxTemp: number;
  habitat: string;
  growthRate: string;
  lightRequirement: string;
  waterRequirement: string;
  isEdible: boolean;
  soilType: string;
  toxicity: string;
  bloomTime: string;
  fertilizerRequirement: string;
  humidity: string;
  repottingFrequency: string;
  specialCare: string;
  growthSeason: string;
}

export interface PlantsReturnObject {
  itemsPerPage: number;
  amoutOfPages: number;
  currentPage: number;
  hasNextPage: boolean;
  plants: Plant[];
}

export interface PlantsReturnObject {
	nextPage: boolean;
	plants: Plant[];
}
