
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RolesGuard } from './role.guard';

@Injectable()
export class WorkerGuard extends RolesGuard {
  override canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.getUserRole(context) === 'worker';
  }
}
