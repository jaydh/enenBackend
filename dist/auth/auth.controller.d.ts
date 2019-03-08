import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    register(res: any, createUserDTO: CreateUserDTO): Promise<void>;
    login(res: any, login: JwtPayload): Promise<any>;
}
