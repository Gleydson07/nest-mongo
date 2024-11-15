import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { ProductsModule } from './modules/products/products.module';
require('dotenv').config()

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL, {
      dbName: process.env.DB_NAME,
      auth: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
      }
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
