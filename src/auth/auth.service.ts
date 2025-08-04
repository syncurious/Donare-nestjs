import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from 'src/config/supabase/supabase.service';
import { SignupDto } from './dto/signup.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { UserPreferencesDto } from './dto/userPreference.dto';

@Injectable()
export class AuthService {
    constructor(private readonly supabase: SupabaseService, private readonly prisma: PrismaService) { }
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
        const userData = await this.prisma.users.create({
            data: {
                email: signupDto.email,
                password: signupDto.password,
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
            userData,
        };
    }

}
