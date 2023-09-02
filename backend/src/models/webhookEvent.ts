export class WebhookEvent {

    constructor(id: string, eventType: 'completed' | 'created' | 'canceled' | 'expired', data: any) {
        this.id = id;
        this.eventType = eventType;
        this.data = data;
        this.timestamp = new Date();
    }

    id: string;
    eventType: 'completed' | 'created' | 'canceled' | 'expired';
    data: any; // Define the specific payload structure based on the Rapyd Disburse API
    timestamp: Date;
}
