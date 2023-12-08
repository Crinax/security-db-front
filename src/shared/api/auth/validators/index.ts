import { IsString, Length } from "class-validator";

export class AuthDtoValidator {
  @IsString()
  @Length(3, 255)
  public email_or_username!: string;

  @IsString()
	@Length(8, 32)
  public password!: string;
}
