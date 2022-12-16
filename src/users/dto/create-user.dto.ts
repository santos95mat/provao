import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Fulano',
    description: 'Nome do usuário',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    example: 'user@email.com',
    description: 'Email do usuário',
  })
  email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({
    example: 'user1234',
    description: 'Senha com no minimo 8 caracteres',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'a3d1217c-4c98-11ed-bdc3-0242ac120002',
    description: 'category ID',
  })
  categoryId: string;
}
