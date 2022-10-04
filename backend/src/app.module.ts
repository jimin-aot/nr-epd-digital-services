import "dotenv/config";
import { MiddlewareConsumer, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import {  WinstonModule} from 'nest-winston';
import {Logger} from './logging/logger';
import { AppLoggerMiddleware } from "./logging/loggerMiddleware";

console.log("Var check - POSTGRESQL_HOST", process.env.POSTGRESQL_HOST);
console.log("Var check - POSTGRESQL_DATABASE", process.env.POSTGRESQL_DATABASE);
console.log("Var check - POSTGRESQL_USER", process.env.POSTGRESQL_USER);
if (process.env.POSTGRESQL_PASSWORD != null ){
  console.log("Var check - POSTGRESQL_PASSWORD present");
} else {
  console.log("Var check - POSTGRESQL_PASSWORD not present");
}

@Module({
  imports: [
    ConfigModule.forRoot(),
    WinstonModule.forRoot(Logger.WinstonLogger()),
    
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRESQL_HOST || "localhost",
      port: parseInt(<string>process.env.POSTGRESQL_PORT) || 5432,
      database: process.env.POSTGRESQL_DATABASE || "postgres",
      username: process.env.POSTGRESQL_USER || "postgres",
      password: process.env.POSTGRESQL_PASSWORD,
      // entities: [User],
      autoLoadEntities: process.env.POSTGRESQL_AUTOLOAD_ENTITIES=="false"?false:true, // Auto load all entities regiestered by typeorm forFeature method.
      synchronize: process.env.POSTGRESQL_SYNC=="false"?false:true, // This changes the DB schema to match changes to entities, which we might not want.
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
     
    /* Uncomment the following line to enable request logging for all routes */

    //consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
