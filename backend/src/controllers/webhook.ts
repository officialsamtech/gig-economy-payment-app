import { Post, Req, HeaderParam, Body, JsonController } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

import RapydService from '@/services/rapydService';
import { Request } from 'express';
import { HttpException } from '@/exceptions/HttpException';
import webhookEventService from '@/services/webhookEventService';
@JsonController('/api')
export class WebhookEventController {

    @Post('/webhook')
    @OpenAPI({ summary: 'Saves triggered rapyd actions' })
    async saveEvent(
        @Req() request: Request,
        @HeaderParam('signature') signature: string,
        @HeaderParam('timestamp') timestamp: number,
        @HeaderParam('salt') salt: string,
        @Body() body: any,
    ) {
        const rapydService = new RapydService();
        const url = `${request.protocol}://${request.hostname}${request.path}`;
        if (!rapydService.authWebhookRequest(signature, url, salt, timestamp, body)) {
            throw new HttpException(401, 'Signature not valid');
        }
        const eventId = body.id;
        const eventType = body.type;
        const data = body.data;

        if (!eventId || !eventType || !data) {
            throw new HttpException(400, 'Bad Request');
        }
        const status = webhookEventService.tryAddEvent(eventId, eventType, data);

        return status;
    }
}
