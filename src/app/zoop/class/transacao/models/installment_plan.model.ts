import { ETransacaoMode } from "src/app/zoop/enums/transacao.mode.enum";

export interface IInstallmentPlan {

    mode?:                  ETransacaoMode;
    number_installments?:   number;

}
