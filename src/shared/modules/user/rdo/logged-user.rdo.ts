import { Expose } from 'class-transformer';
import {UserStatusType} from '../../../types/index.js';

export class LoggedUserRdo {
  @Expose()
  public token: string;

  @Expose()
  public email: string;

  @Expose()
  public avatarPath: string;

  @Expose()
  public status: UserStatusType;

  @Expose()
  public username: string;
}
