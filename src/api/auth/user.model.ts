import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class User extends Document {
  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  passwordHash: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
