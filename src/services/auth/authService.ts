import { AuthManagerRepository } from "../../dal/auth/authManagerRepository";
import { CurrentUser, UserCredentials, UserDto } from "../../dto/auth/authDto";

export class AuthService {
  private authRepo: AuthManagerRepository;

  constructor() {
    this.authRepo = new AuthManagerRepository();
  }

  public createUser = async (userDto: UserDto): Promise<any> => {
    return await this.authRepo.createOrUpdateUser(userDto);
  };

  public authenticateUser = async (
    credentials: UserCredentials
  ): Promise<any> => {
    return await this.authRepo.authenticateUser(credentials);
  };

  public getCurrentUserProfile = async (
    userId: string
  ): Promise<CurrentUser> => {
    return await this.authRepo.getCurrentUserProfile(userId);
  };

  public updateUserProfile = async (
    userId: string,
    user: CurrentUser
  ): Promise<CurrentUser> => {
    return await this.authRepo.updateUserProfile(userId, user);
  };
}
