import { IsArray, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { Url } from '../role.entity';

export class UpdateRoleDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  @Type(() => Object)
  urls: Url[];
}
