import { EWebHookStatus } from "src/app/zoop/enums/webhook.status.enum";

export interface IWebHook{
    id:             string;         // Identificador exclusivo para este webhook
    resource:       string;         // Value: webhook
    url:            string;         // A URL para a qual os dados do evento serão postados. A carga útil dos dados Webhook é enviada como JSON no corpo de solicitação POST.
    scription:      string;         // Uma string arbitrária que você pode anexar a um objeto webhook
    status:         EWebHookStatus; // Indica o status atual deste webhook, por exemplo, "ativo" significa que o webhook está pronto para receber.
    events:         any;            // Esta é uma lista dos tipos de eventos que seu webhook estará monitorando. Você pode monitorar um ou mais eventos.
    last_error:     string;         // Se já tivemos um erro ao tentar publicar neste webhook, o último erro que vimos.
    retries:        number;         // Número de tentativas anteriores para entregar este evento webhook.
    batches_sent:   number;         // O número de lotes de eventos que já foram enviados para este webhook.
    metadata:       any;            // Mapeamento de chaves de string para valores de sequência de caracteres. key é o identificador para as metadatas (máximo de 30 caracteres). O value é a informação a ser armazenada como metadatas.
    created_at:     string;         // W3C Datetime Format para a criação da data (yyyy-mm-ddThh:mm:ssZ)
    updated_at:     string;         // W3C Datetime Format para a última atualização (yyyy-mm-ddThh:mm:ssZ)
}