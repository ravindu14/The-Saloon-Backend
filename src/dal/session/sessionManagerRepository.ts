import { CreateSessionDto } from "../../dto/session/sessionDto";
import SessionSchema from "./model";

export class SessionManagerRepository {
  private model: any;

  constructor() {
    this.model = SessionSchema;
  }

  public createSession = async (session: CreateSessionDto) => {
    return await this.model.create(session);
  };
}
