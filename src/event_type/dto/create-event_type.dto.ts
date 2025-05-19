import { Types } from "mongoose";

export class CreateEventTypeDto {
  name: string;
  parent_event_typeId: Types.ObjectId;
}
