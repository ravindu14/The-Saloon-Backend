import { UserDto } from "../../dto/auth/authDto";
import AuthSchema from "./model";

export class AuthManagerRepository {
  private model: any;

  constructor() {
    this.model = AuthSchema;
  }

  public createOrUpdateUser = async (userDto: UserDto) => {
    const userToBeUpdated = await this.model.findOne({
      userId: userDto.userId,
    });

    if (userToBeUpdated !== null) {
      const updatedUser = await this.model.findOneAndUpdate(
        { userId: userDto.userId },
        { $set: userDto },
        { new: true }
      );
      return updatedUser;
    }

    const createdUser = await this.model.create(userDto);
    return createdUser;
  };
}
