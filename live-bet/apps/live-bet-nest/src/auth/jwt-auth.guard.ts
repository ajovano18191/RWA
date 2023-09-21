import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    @Inject(AuthService)
    private authService: AuthService;

    canActivate(context: ExecutionContext) {
        if(context.getType() === 'ws') {
          const token = context.getArgByIndex(0).handshake.headers.authorization.split(' ')[1];
          
          const decoded = this.authService.jwtService.verify(token, {
              secret: jwtConstants.secret
          }) as any;

          return this.authService.findOneUser(decoded.sub) !== undefined;
        }
        return super.canActivate(context);
      }
}
