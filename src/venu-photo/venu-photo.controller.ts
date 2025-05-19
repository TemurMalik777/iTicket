import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VenuPhotoService } from './venu-photo.service';
import { CreateVenuPhotoDto } from './dto/create-venu-photo.dto';
import { UpdateVenuPhotoDto } from './dto/update-venu-photo.dto';

@Controller('venu-photo')
export class VenuPhotoController {
  constructor(private readonly venuPhotoService: VenuPhotoService) {}

  @Post()
  create(@Body() createVenuPhotoDto: CreateVenuPhotoDto) {
    return this.venuPhotoService.create(createVenuPhotoDto);
  }

  @Get()
  findAll() {
    return this.venuPhotoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venuPhotoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVenuPhotoDto: UpdateVenuPhotoDto) {
    return this.venuPhotoService.update(id, updateVenuPhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.venuPhotoService.remove(id);
  }
}
