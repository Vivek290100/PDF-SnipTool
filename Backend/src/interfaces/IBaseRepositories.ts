// C:\Users\vivek_laxvnt1\Desktop\PDF-SnipTool\Backend\src\interfaces\IBaseRepositories.ts

import { FilterQuery, Document as MongooseDocument } from "mongoose";

export interface IBaseRepository<T extends MongooseDocument> {
  create(data: Partial<T>): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  findByQuery(query: FilterQuery<T>): Promise<T | null>;
  findManyByQuery(query: FilterQuery<T>): Promise<T[]>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<T | null>;
}