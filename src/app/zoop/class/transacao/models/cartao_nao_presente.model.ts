import { IPaymentMethod } from "./payment_method.model";
import { ISource } from "../../source/models/source.model";
import { IInstallmentPlan } from "./installment_plan.model";

import { ETransacaoPaymentType } from "src/app/zoop/enums/transacao.payment-type.enum";

export interface ICartaoNaoPresente {

    amount:                 number;
    currency:               string;
    description:            string;
    payment_type:           ETransacaoPaymentType;
    capture?:               boolean;
    on_behalf_of:           string;
    reference_id?:          string;
    payment_method?:        IPaymentMethod,
    source:                 ISource;
    installment_plan:       IInstallmentPlan;
    statement_descriptor:   string;
    customer:               string;             //Identificador do comprador que será cobrado
    token:                  string;             //Identificador do token de cartão que será cobrado
    metadata:               any;
    
}