import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthController } from './Authentication/controller/auth.controller';
import { AppService } from './app.service';

import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { AuthModule } from './Authentication/auth.module';
import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
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
  imports: [AuthModule, ...gqlConfig],
  controllers: [AuthController],
  providers: [AppService],
})
export class AppModule {}
