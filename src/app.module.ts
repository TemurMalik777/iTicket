import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { RegionModule } from './region/region.module';
import { DistricModule } from './distric/distric.module';
import { CustomerCardModule } from './customer_card/customer_card.module';
import { CustomerAddressModule } from './customer_address/customer_address.module';
import { VenueModule } from './venue/venue.module';
import { VenueTypesModule } from './venue_types/venue_types.module';
import { VenuPhotoModule } from './venu-photo/venu-photo.module';
import { SeatTypeModule } from './seat_type/seat_type.module';
import { SeatModule } from './seat/seat.module';
import { LangModule } from './lang/lang.module';
import { HumanCategoryModule } from './human_category/human_category.module';
import { EventTypeModule } from './event_type/event_type.module';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: ".env", isGlobal: true}),
    MongooseModule.forRoot(String(process.env.MONGO_URL)),
    AdminModule,
    AuthModule,
    CustomerModule,
    RegionModule,
    DistricModule,
    CustomerCardModule,
    CustomerAddressModule,
    VenueModule,
    VenueTypesModule,
    VenuPhotoModule,
    SeatTypeModule,
    SeatModule,
    LangModule,
    HumanCategoryModule,
    EventTypeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
