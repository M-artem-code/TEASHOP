import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import type { Response } from 'express';
import type { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

type OAuthRequest = Request & {
  user: {
    email: string;
    name: string;
    picture: string;
  };
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.register(dto, res);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(dto, res);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login/acces-token')
  async getNewTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken: unknown = req.cookies['refreshToken'];

    if (typeof refreshToken !== 'string' || !refreshToken) {
      throw new UnauthorizedException('No refresh token');
    }

    const {
      user,
      accessToken,
      refreshToken: newRefresh,
    } = await this.authService.getNewTokens(refreshToken);

    this.authService.addRefreshTokenToResponse(res, newRefresh);

    return { user, accessToken };
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    this.authService.removeRefreshTokenFromResponse(res);

    return { message: 'Logout success' };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(
    @Req() req: OAuthRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, name, picture } = req.user;

    const { accessToken } = await this.authService.validateOAuthLogin(
      email,
      name,
      picture,
      res,
    );

    return res.redirect(
      `${process.env.CLIENT_URL}/dashboard?accessToken=${accessToken}`,
    );
  }

  @Get('yandex/callback')
  @UseGuards(AuthGuard('yandex'))
  async yandexAuthCallback(
    @Req() req: OAuthRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, name, picture } = req.user;

    const { accessToken } = await this.authService.validateOAuthLogin(
      email,
      name,
      picture,
      res,
    );

    return res.redirect(
      `${process.env.CLIENT_URL}/dashboard?accessToken=${accessToken}`,
    );
  }

  @Get('yandex')
  @UseGuards(AuthGuard('yandex'))
  yandexAuth() {}
}
