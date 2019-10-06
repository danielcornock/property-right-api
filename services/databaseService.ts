import { Model } from 'mongoose';

export async function findAllByUser(
  Model: Model<any>,
  userId: string
): Promise<Array<any>> {
  return Model.find({ user: userId });
}

export async function create(Model: Model<any>, data: object): Promise<any> {
  return Model.create(data);
}

export async function deleteOne(
  Model: Model<any>,
  query: object
): Promise<any> {
  return Model.deleteOne(query);
}
export async function findByIdAndDelete(
  Model: Model<any>,
  docId: string
): Promise<any> {
  return Model.findByIdAndDelete(docId);
}

export async function findByIdAndUpdate(
  Model: Model<any>,
  docId: string,
  data: object
): Promise<any> {
  return Model.findByIdAndUpdate(docId, data, {
    new: true,
    runValidators: true
  });
}

export async function findById(Model: Model<any>, docId: string): Promise<any> {
  return Model.findById(docId);
}

export async function deleteMany(
  Model: Model<any>,
  query: object
): Promise<any> {
  return Model.deleteMany(query);
}
