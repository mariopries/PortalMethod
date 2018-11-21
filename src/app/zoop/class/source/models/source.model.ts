import { EUsage } from "src/app/zoop/enums/usage.enum";
import { ESourceType } from "src/app/zoop/enums/source.type.enum";
import { ICard } from "../../transacao/models/card.model";
import { IInstallmentPlan } from "../../transacao/models/installment_plan.model";
import { ICustomer } from "./customer.model";
import { IToken } from "../../transacao/models/token.model";


export interface ISource {

  id:                     string;
  status:                 string;
  usage:                  EUsage;
  amount:                 number;           // Valor em centavos a ser cobrado na venda
  currency:               string;           // Moeda do valor a ser cobrado na venda
  description:            string;           // Descrição da venda quando gerada (opcional)
  type:                   ESourceType;      // Tipo de source
  capture:                boolean;          // Capturar transação (true) ou criar uma pre-autorização (false) para ser capturada a posteriori
  on_behalf_of:           string;           // Em nome de
  reference_id:           string;           // ID referência da sua aplicação
  card:                   ICard;            // Objeto obrigatório no tipo card e card_and_wallet
  installment_plan:       IInstallmentPlan;
  statement_descriptor:   string;
  customer:               ICustomer;
  token:                  IToken;
  uri:                    string;
  metadata:               any;
  created_at:             string;
  updated_at:             string;

}
