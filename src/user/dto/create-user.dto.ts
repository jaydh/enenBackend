import { UserArticle } from '../interfaces/userArticle.interface';

export class CreateUserDTO {
  readonly userName: string;
  readonly passwordHash: string;
}
