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
    CustomerAddressModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
