import { ObjectSchema, Realm } from "realm";

export class Task extends Realm.Object {
  id!: string;
  text!: string;
  isCompleted!: boolean;
  
  static schema: ObjectSchema = {
    name: 'Task',
    properties: {
      id: { type: 'uuid' },
      text: { type: 'string' },
      isCompleted: { type: 'bool' },
    },
    primaryKey: 'id'
  }
}