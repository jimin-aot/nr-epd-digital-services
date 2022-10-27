import { ApolloDriver, ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule, GraphQLFederationFactory } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard, KeycloakConnectModule, PolicyEnforcementMode, ResourceGuard, RoleGuard } from 'nest-keycloak-connect';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationModule } from './application/application.module';
import { ApplicationResolver } from './application/application.resolver';
import { ApplicationService } from './application/application.service';
import { User } from './application/entities/user.entity';
import { UsersResolver } from './application/users.resolver';

@Module({
  imports: [
    // KeycloakConnectModule.register({
    //   authServerUrl: 'https://epd-keycloak-dev.apps.silver.devops.gov.bc.ca/auth',
    //   realm: 'epd-dev',
    //   clientId: 'applicationapi',
    //   secret: 'cNrfJNtuyCije5Em5I0oIJA1oFV9IsxQ',
    //   policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
    //   // Secret key of the client taken from keycloak server
    // }),
        ApplicationModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRESQL_HOST || 'gldatabase',
      port: parseInt(<string>process.env.POSTGRESQL_PORT) || 5432,
      database: process.env.POSTGRESQL_DATABASE || 'admin',
      username: process.env.POSTGRESQL_USER || 'admin',
      password: process.env.POSTGRESQL_PASSWORD || 'admin',
      // entities: [User],
      autoLoadEntities:
        process.env.POSTGRESQL_AUTOLOAD_ENTITIES == 'false' ? false : true, // Auto load all entities regiestered by typeorm forFeature method.
      synchronize: process.env.POSTGRESQL_SYNC == 'false' ? false : true, // This changes the DB schema to match changes to entities, which we might not want.
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig> ({
      driver: ApolloFederationDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
      buildSchemaOptions: {
        orphanedTypes: [User],
      },
      cors:true
    }),
  ],

  controllers: [AppController],
  providers: [AppService,
    // {
    //   provide: APP_GUARD,     
    //   useClass: AuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: ResourceGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RoleGuard,
    // }
  ],
})
export class AppModule {}
