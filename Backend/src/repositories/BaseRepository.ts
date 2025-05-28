// C:\Users\vivek_laxvnt1\Desktop\PDF-SnipTool\Backend\src\repositories\BaseRepository.ts

import { Model, Document as MongooseDocument, FilterQuery } from "mongoose";
import { IBaseRepository } from "../interfaces/IBaseRepositories";

class BaseRepository<T extends MongooseDocument> implements IBaseRepository<T> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    return await this.model.create(data);
  }

  async findAll(): Promise<T[]> {
    return await this.model.find().lean().exec() as T[];
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id).lean().exec() as T | null;
  }

  async findByQuery(query: FilterQuery<T>): Promise<T | null> {
    return await this.model.findOne(query).lean().exec() as T | null;
  }

  async findManyByQuery(query: FilterQuery<T>): Promise<T[]> {
    return await this.model.find(query).lean().exec() as T[];
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true }).lean().exec() as T | null;
  }

  async delete(id: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(id).lean().exec() as T | null;
  }
}

export default BaseRepository;