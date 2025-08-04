import { Injectable, ConflictException, InternalServerErrorException, NotFoundException, BadRequestException, HttpStatus } from '@nestjs/common';
import { SupabaseService } from 'src/config/supabase/supabase.service';
import { SignupDto } from './dto/signup.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { UserPreferencesDto } from './dto/userPreference.dto';
import { LoginResponseDTO, SigninDto } from './dto/signin.dto';
import { error } from 'console';
import { EncryptionService } from 'src/common/services/encryption.service';
import { TokenService } from 'src/common/services/token.service';
import { EnvConfigService } from 'src/common/config/env.config';

@Injectable()
export class AuthService {
    constructor(
        private readonly env: EnvConfigService,
        private readonly prisma: PrismaService,
        private readonly EncSr: EncryptionService,
        private readonly tokenSr: TokenService
    ) { }
    async signup(signupDto: SignupDto) {

        // const { data: authData, error: authError } = await this.supabase.getClient().auth.signUp({
        //     email: signupDto.email,
        //     password: signupDto.password,
        //     options: {
        //         data: {
        //             fullName: signupDto.fullName,
        //             city: signupDto.city,
        //             role: signupDto.role,
        //         }, 
        //     },
        // });
        // if (authError || !authData.user) throw new ConflictException(authError?.message || 'User not created');        console.log('my Payload', signupDto)
        const existingUser = await this.prisma.users.findUnique({
            where: { email: signupDto.email },
        });
        if (existingUser) {
            throw new ConflictException('A user with this email already exists.');
        }
        const encryptedPassword = await this.EncSr.hashPassword(signupDto.password)
        const userData = await this.prisma.users.create({
            data: {
                email: signupDto.email,
                password: encryptedPassword,
                fullName: signupDto.fullName,
                city: signupDto.city,
                role: signupDto.role,
            },
        });
        if (!userData) throw new InternalServerErrorException('User not created');
        if (signupDto.userPreferences && Object.keys(signupDto.userPreferences).length > 0) {
            const userPreferencesData = await this.prisma.userPreferences.create({
                data: {
                    userId: userData.id,
                    lastZakatDate: new Date(signupDto.userPreferences?.lastZakatDate ?? 0),
                    receiveZakatRemainder: signupDto.userPreferences?.receiveZakatRemainder,
                    stayUpdatedOnNewCampaigns: signupDto.userPreferences?.stayUpdatedOnNewCampaigns,
                },
            });
            userData.preferencesId = userPreferencesData.id
        }
        return {
            statusCode : HttpStatus.CREATED,
            message: "User has been created.",
            user : {
                id :userData.id,
                fullname : userData.fullName,
                email : userData.email,
                role : userData.role
            }
        };
    }
    async signin(signinDto: SigninDto) {
        const { email, password } = signinDto
        let user = await this.prisma.users.findUnique({
            where: { email }
        })
        if (!user) { throw new NotFoundException(`can't found User with this Email`) }
        const isCorrectPassword = await this.EncSr.comparePassword(password, user.password)
        if (!isCorrectPassword) { throw new BadRequestException(`Incorrect password`) }
        const userTokenPayload = { userId: user.id, role: user.role, email: user.email }
        const token = this.tokenSr.generateJWTToken(userTokenPayload, this.env.jwtSecret, '7d')
        const refrashToken = this.tokenSr.generateJWTToken(userTokenPayload, this.env.jwtSecret, '30d')

        const userResponse = LoginResponseDTO.create(token, {
            id: user.id,
            email: user.email,
            city: user.city,
            role: user.role,
            fullName: user.fullName,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }, refrashToken)

        return userResponse;
    }

}
