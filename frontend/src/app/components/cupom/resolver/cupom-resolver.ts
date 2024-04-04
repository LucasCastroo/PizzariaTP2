import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import { Cupom } from "../../../models/cupom";
import {inject} from "@angular/core";
import { CupomService } from "../../../services/cupom.service";

export const cupomResolver: ResolveFn<Cupom> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(CupomService).findById(route.paramMap.get('id')!);
  }
