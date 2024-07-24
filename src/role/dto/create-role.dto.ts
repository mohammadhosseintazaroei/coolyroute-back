import { IsArray, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Url } from '../role.entity';

export class CreateRoleDto {
  @IsString()
  name: string;

  @IsArray()
  @Type(() => Object)
  urls: Url[];
}
