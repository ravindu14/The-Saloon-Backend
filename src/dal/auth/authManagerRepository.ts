import { UserCredentials, UserDto } from "../../dto/auth/authDto";
import AuthSchema from "./model";
import { compare } from "bcryptjs";

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

  public authenticateUser = async (credentials: UserCredentials) => {
    const { userName, password } = credentials;

    const userToBeAuthenticated: UserDto = await this.model.findOne({
      $or: [{ userName: userName }, { email: userName }],
    });

    if (userToBeAuthenticated !== null) {
      const isPasswordMatching = await compare(
        password,
        userToBeAuthenticated.password
      );

      return isPasswordMatching ? userToBeAuthenticated : null;
    }
    return null;
  };
}
