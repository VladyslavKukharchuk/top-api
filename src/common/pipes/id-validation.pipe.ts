import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { ValidationException } from '@common/exceptions';

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type != 'param') {
      return value;
    }
    if (!ObjectId.isValid(value)) {
      throw new ValidationException('Incorrect ID format');
    }
    return value;
  }
}
