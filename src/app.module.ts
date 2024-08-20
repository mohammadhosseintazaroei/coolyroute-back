import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessControlMiddleware } from './access-control/access-control.middleware';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/controller/auth.controller';
import { EventEntity } from './events/entities/event.entity';
import { EventModule } from './events/event.module';
import { RoleModule } from './role/role.module';
import { upperDirectiveTransformer } from './shared/common/directives/upper-case.directive';
import { SkillEntity } from './skill/entities/skill.entity';
import { SkillModule } from './skill/skill.module';
import { UserSkillEntity } from './user-skill/user-skill.entity';
import { UserSKillModule } from './user-skill/user-skill.module';
import { UserEntity } from './user/entities/user.entity';
import { UsersModule } from './user/user.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { EnrollmentEntity } from './enrollment/enrollment.entity';
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
    SkillModule,
    EventModule,
    UserSKillModule,
    EnrollmentModule,
    ...gqlConfig,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: 'postgres',
      password: process.env.DB_PASSWORD,
      database: 'postgres',
      schema: 'coolyroute',
      entities: [
        SkillEntity,
        UserSkillEntity,
        EventEntity,
        UserEntity,
        EnrollmentEntity,
      ],
      synchronize: true,
      autoLoadEntities: true,
      migrationsTransactionMode: 'each',
    }),
  ],
  controllers: [AuthController],
  providers: [AppService],
})
export class AppModule {}
