import { IsNullable, ParseAsDateWithoutTimezone } from '@/shared/helpers/class-validator-transformer';
import { IsDate, IsString, IsUUID, Length } from 'class-validator';

export class LawsResponseValidator {
  @IsNullable()
  @IsUUID()
  public avatar_uid!: string | null;

  @IsString()
  public first_name!: string;

  @IsString()
  @Length(0, 15)
  public itn!: string;

  @IsUUID()
  public law_uid!: string;

  @IsNullable()
  @IsString()
  public patronymic!: string | null;

  @IsString()
  public second_name!: string;

  @IsDate()
  @ParseAsDateWithoutTimezone()
  public start_activity_date!: Date;

  @IsUUID()
  public uid!: string;
}

export class DeleteManyLawsResponseValidator {
  @IsUUID('4', { each: true })
  public uids!: string[];
}
