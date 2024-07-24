import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/controller/auth.controller';
import { upperDirectiveTransformer } from './shared/common/directives/upper-case.directive';
import { UserEntity } from './user/entities/user.entity';
import { UsersModule } from './user/user.module';
import { EventModule } from './events/event.module';
import { EventEntity } from './events/entities/event.entity';
import { RoleModule } from './role/role.module';
import { AccessControlMiddleware } from './access-control/access-control.middleware';
const gqlConfig = [
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: 'src/schema.gql',
    transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
    installSubscriptionHandlers: true,
    // buildSchemaOptions: {
    //   directives: [
    //     new GraphQLDirective({
    //       name: 'upper',
    //       locations: [DirectiveLocation.FIELD_DEFINITION],
    //     }),
    //   ],
    // },
    context: ({ req, res }) => ({ req, res }),
    buildSchemaOptions: {
      fieldMiddleware: [AccessControlMiddleware],
    },
  }),
];
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forRoot({
      envFilePath: !process.env.NODE_ENV
        ? '.env'
        : `.env.${process.env.NODE_ENV}`,
    }),

    AuthModule,
    UsersModule,
    RoleModule,
    EventModule,
    ...gqlConfig,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: 'postgres',
      password: process.env.DB_PASSWORD,
      database: 'postgres',
      schema: 'coolyroute',
      entities: [UserEntity, EventEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AppService],
})
export class AppModule {}
