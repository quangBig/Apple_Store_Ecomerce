import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
    constructor(private authService: AuthService,
        private configService: ConfigService
    ) {
        super({
            clientID: configService.get<string>('FACEBOOK_CLIENT_ID')!,
            clientSecret: configService.get<string>('FACEBOOK_CLIENT_SECRET')!,
            callbackURL: configService.get<string>('FACEBOOK_CALLBACK_URL')!,
            profileFields: ['id', 'emails', 'name', 'displayName'],
            scope: ['email', 'public_profile'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
    ): Promise<any> {
        const { id, emails, name } = profile;
        const user = {
            facebookId: id,
            email: emails?.[0]?.value || '',
            name: name?.givenName || '',
        };

        return this.authService.validateOAuthLogin(user);
    }
}
