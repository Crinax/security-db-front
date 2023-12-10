import { IsEmail, IsOptional, IsString, Length } from "class-validator";

export class AuthDtoValidator {
  @IsString()
  @Length(3, 255)
  public email_or_username!: string;

  @IsString()
	@Length(8, 32)
  public password!: string;
}

export class RegDtoValidator {
  @Length(3, 255)
  @IsString()
  public username!: string;

  @IsEmail()
  @IsString()
  public email!: string;

  @Length(8, 32)
  @IsString()
  public password!: string;

  @IsString()
  public first_name!: string;

  @IsString()
  public second_name!: string;

  @IsString()
  @IsOptional()
  public patronymic?: string;

  @IsString()
  public birth_date!: Date;
}
