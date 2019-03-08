import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtToken } from './interfaces/jwt-token.interface';
import { User } from '../user/interfaces/user.interface';
import { CreateUserDTO } from '../user/dto/create-user.dto';
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UserService);
    register(userDTO: CreateUserDTO): Promise<JwtToken>;
    signIn(login: JwtPayload): Promise<JwtToken | undefined>;
    createToken(user: User): Promise<JwtToken>;
    validateUser(payload: JwtPayload): Promise<any>;
    private compareHash;
}
