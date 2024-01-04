import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthController } from './auth/controller/auth.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { AuthModule } from './auth/auth.module';
import { upperDirectiveTransformer } from './shared/common/directives/upper-case.directive';
import { UsersModule } from './user/user.module';
import { UserEntity } from './user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
const gqlConfig = [
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: 'src/schema.gql',
    transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
    installSubscriptionHandlers: true,
    buildSchemaOptions: {
      directives: [
        new GraphQLDirective({
          name: 'upper',
          locations: [DirectiveLocation.FIELD_DEFINITION],
        }),
      ],
    },
  }),
];
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !process.env.NODE_ENV
        ? '.env'
        : `.env.${process.env.NODE_ENV}`,
    }),
    AuthModule,
    UsersModule,
    ...gqlConfig,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: 'postgres',
      password: process.env.DB_PASSWORD,
      database: 'postgres',
      schema: 'ecotech',
      entities: [UserEntity],
      synchronize: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AppService],
})
export class AppModule {}
