export interface Query {
  plantName?: { $regex: string; $options: string };
}
