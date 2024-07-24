import { ArrayNotEmpty, IsArray, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class AddPermissionDto {
  @IsPositive()
  userId: number;

  @IsArray()
  @ArrayNotEmpty()
  @Type(() => Number)
  roleIds: number[];
}
