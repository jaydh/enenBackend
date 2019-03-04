import { UserArticle } from '../interfaces/userArticle.interface';

export class CreateUserDTO {
  readonly email: string;
  readonly articleIDs: UserArticle[];
}
