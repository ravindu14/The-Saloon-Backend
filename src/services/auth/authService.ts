import { AuthManagerRepository } from "../../dal/auth/authManagerRepository";
import { UserDto } from "../../dto/auth/authDto";

export class AuthService {
  private authRepo: AuthManagerRepository;

  constructor() {
    this.authRepo = new AuthManagerRepository();
  }

  public createUser = async (userDto: UserDto): Promise<any> => {
    return await this.authRepo.createOrUpdateUser(userDto);
  };
}
