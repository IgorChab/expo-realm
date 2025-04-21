import { ObjectSchema, Realm } from "realm";
import { Category } from "@/realm";

export class Task extends Realm.Object {
  id!: Realm.BSON.UUID;
  text!: string;
  isCompleted!: boolean;
  category?: Category;
  
  static schema: ObjectSchema = {
    name: 'Task',
    properties: {
      id: { type: 'uuid' },
      text: { type: 'string' },
      isCompleted: { type: 'bool' },
      category: 'Category?'
    },
    primaryKey: 'id'
  }
}