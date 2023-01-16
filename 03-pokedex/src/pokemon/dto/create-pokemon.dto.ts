import { IsString, IsInt, IsPositive, Min, MinLength } from 'class-validator';

export class CreatePokemonDto {
  @IsString()
  @MinLength(1)
  readonly name: string;

  @IsInt()
  @IsPositive()
  @Min(1)
  readonly no: number;
}
