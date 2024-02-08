import { ConfigService } from '@nestjs/config';

import { PassportStrategy } from '@nestjs/passport';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const { phoneNumber } = payload;
    const user: UserEntity =
      await this.usersService.getUserByPhoneNumber(phoneNumber);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

// import { ConfigService } from '@nestjs/config';

// import { PassportStrategy } from '@nestjs/passport';

// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UserEntity } from 'src/user/entities/user.entity';
// import { UserService } from 'src/user/user.service';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { jwtConstants } from './constants';
// const customJwtFromRequest = (req) => {
//   let token = null;
//   if (req && req.headers.authorization) {
//     const parts = req.headers.authorization.split(' ');
//     if (parts.length === 2) {
//       const scheme = parts[0];
//       const credentials = parts[1];

//       if (/^Bearer$/i.test(scheme)) {
//         token = credentials;
//       }
//     }
//   }
//   return token;
// };

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private usersService: UserService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: jwtConstants.secret,
//     });
//   }

//   async validate(payload: any) {
//     const { phoneNumber } = payload;
//     console.log(payload);
//     console.log(phoneNumber);
//     const user: UserEntity =
//       await this.usersService.getUserByPhoneNumber(phoneNumber);

//     if (!user) {
//       throw new UnauthorizedException();
//     }
//     return {
//       dd: 'd',
//     };
//   }
// }
