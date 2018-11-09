import { EUsage } from "src/app/zoop/enums/usage.enum";
import { EType } from "src/app/zoop/enums/type.enum";
import { ICard } from "./card.model";
import { IInstallmentPlan } from "./installment_plan.model";
import { ICustumer } from "./custumer.model";
import { IToken } from "./token.model";


export interface ISource {

  usage:                 EUsage;
  amount?:               number;           //Valor em centavos a ser cobrado na venda 
  currency?:             string;           //Moeda do valor a ser cobrado na venda
  description?:          string;           //Descrição da venda quando gerada (opcional)
  type:                  EType;            //Tipo de source
  capture?:              boolean;          //Capturar transação (true) ou criar uma pre-autorização (false) para ser capturada a posteriori
  on_behalf_of?:         string;           //Em nome de
  reference_id?:         string;           //ID referência da sua aplicação
  card?:                 ICard;            //Objeto obrigatório no tipo card e card_and_wallet
  installment_plan?:     IInstallmentPlan;
  statement_descriptor?: string;
  customer?:             ICustumer;
  token?:                IToken;
  metadata?:             any;     

}
