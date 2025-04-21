import { ObjectSchema, Realm } from "realm";
import { IconName } from "@/constants";

export class Category extends Realm.Object {
  id!: Realm.BSON.UUID;
  title!: string;
  icon!: IconName;
  color!: string;
  
  static schema: ObjectSchema = {
    name: 'Category',
    properties: {
      id: { type: 'uuid' },
      title: { type: 'string' },
      icon: { type: 'string' },
      color: { type: 'string' },
    },
    primaryKey: 'id'
  }
}