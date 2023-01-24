import { SessionManagerRepository } from "../../dal/session/sessionManagerRepository";
import { UserDto } from "../../dto/auth/authDto";
import { TOKEN_EXPIRES_IN } from "../../shared/config/common";
import { createToken } from "../../shared/helpers/token";
import { v4 as uuiv4 } from "uuid";
import { CreateSessionDto } from "../../dto/session/sessionDto";

export class SessionService {
  private sessionRepo: SessionManagerRepository;

  constructor() {
    this.sessionRepo = new SessionManagerRepository();
  }

  public createSession = async (user: UserDto): Promise<any> => {
    const today = new Date();
    const expiry = new Date(
      today.getTime() + TOKEN_EXPIRES_IN * 1000
    ).toString();
    const token = createToken({ id: user.userId });

    const dataForToken: CreateSessionDto = {
      id: uuiv4(),
      userId: user.userId,
      token,
      expiry,
      role: user.userRole,
    };

    return await this.sessionRepo.createSession(dataForToken);
  };
}
