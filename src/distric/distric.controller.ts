import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { DistricService } from "./distric.service";
import { CreateDistricDto } from "./dto/create-distric.dto";
import { UpdateDistricDto } from "./dto/update-distric.dto";

@Controller("distric")
export class DistricController {
  constructor(private readonly districService: DistricService) {}

  // @Get()
  // async getAllDistricts() {
  //   return this.districService.findAllWithRegion();
  // }

  @Post()
  create(@Body() createDistricDto: CreateDistricDto) {
    return this.districService.create(createDistricDto);
  }

  @Get()
  findAll() {
    return this.districService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.districService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateDistricDto: UpdateDistricDto) {
    return this.districService.update(id, updateDistricDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.districService.remove(id);
  }
}
