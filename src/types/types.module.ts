import { Module } from "@nestjs/common";
import { TypesService } from "./types.service";
import { TypesController } from "./types.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Types, TypeSchema } from "./schemas/types.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Types.name,
        schema: TypeSchema,
      },
    ]),
  ],
  controllers: [TypesController],
  providers: [TypesService],
})
export class TypesModule {}