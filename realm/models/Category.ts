import { ObjectSchema, Realm } from "realm";
import { IconName } from "@/constants";
import {Task} from "@/realm";

export class Category extends Realm.Object {
  id!: Realm.BSON.UUID;
  title!: string;
  icon!: IconName;
  color!: string;
  tasks!: Realm.List<Task>;
  
  static schema: ObjectSchema = {
    name: 'Category',
    properties: {
      id: { type: 'uuid' },
      title: { type: 'string' },
      icon: { type: 'string' },
      color: { type: 'string' },
      tasks: {
        type: 'linkingObjects',
        objectType: 'Task',
        property: 'category',
      }
    },
    primaryKey: 'id'
  }
}