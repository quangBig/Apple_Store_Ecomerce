import { PartialType } from '@nestjs/mapped-types';
import { CreateMainHeaderDto } from './create-main-header.dto';

export class UpdateMainHeaderDto extends PartialType(CreateMainHeaderDto) { }
