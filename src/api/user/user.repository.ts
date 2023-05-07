import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export default class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user): Promise<User> {
    return this.userModel.create(user);
  }

  // async findById(id: string): Promise<User> {
  //   return this.userModel.findById(id);
  // }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  // async update(id: string, dto): Promise<User> {
  //   return this.userModel.findByIdAndUpdate(id, dto, { new: true });
  // }
  //
  // async delete(id: string): Promise<{ deletedCount: number }> {
  //   return await this.userModel.deleteOne({ _id: id });
  // }
}
