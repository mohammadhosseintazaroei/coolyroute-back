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
    AuthModule,
    UsersModule,
    ...gqlConfig,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123qwe',
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
