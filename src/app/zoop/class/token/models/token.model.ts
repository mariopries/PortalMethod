import { ICard } from "../../transacao/models/card.model";
import { ETokenType } from "src/app/zoop/enums/token.type.enum";

export interface IToken {
  id:         string,
  resource:   string,
  type:       ETokenType,
  used:       boolean,
  created_at: string,
  updated_at: string,
  card?:      ICard
}
