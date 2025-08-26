import { PartialType } from '@nestjs/mapped-types';
import { CreateAboutUsDto } from './create-aboutus.dto';

export class UpdateAboutUsDto extends PartialType(CreateAboutUsDto) { }
