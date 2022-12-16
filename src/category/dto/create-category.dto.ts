import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Administrador',
    description: 'categoria do usuario',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'usuario com permissões exclusivas de administrador',
    description: 'Descrição da categoria do usuario',
  })
  description: string;
}
