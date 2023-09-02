import { Param, Body, Get, Post, HttpCode, UseBefore, JsonController, Delete, QueryParam, QueryParams } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { validationMiddleware } from '@/middlewares/validation.middleware';
import RapydService from '@/services/rapydService';
import { Payout } from '@/models/payout';
import { PayoutMethod } from '@/models/payoutMethod';

@JsonController('/api')
export class PayoutController {

    @Get('/payouts')
    @OpenAPI({ summary: 'Return a list of payouts' })
    @ResponseSchema(Payout, { isArray: true })
    async getPayouts() {
        const rapydService = new RapydService();
        const payouts = await rapydService.getPayouts();
        return payouts;
    }

    @Post('/payouts')
    @HttpCode(200)
    @UseBefore(validationMiddleware(Payout, 'body'))
    @ResponseSchema(Payout)
    @OpenAPI({ summary: 'Create a new payout' })
    async createPayout(@Body() body: Payout) {
        const rapydService = new RapydService();
        const payout = await rapydService.createPayout(body);
        return payout;
    }

    @Get(`/payoutMethods`)
    @OpenAPI({ summary: 'Return a list of payout methods' })
    @ResponseSchema(PayoutMethod)
    async getPayoutMethods(@QueryParam('payout_currency') payout_currency: string) {
        const rapydService = new RapydService();
        const payoutMethods = await rapydService.getPayoutMethodTypes(payout_currency);
        return payoutMethods;
    }


    @Get('/payouts/:payoutId')
    @OpenAPI({ summary: 'Return a payout' })
    @ResponseSchema(Payout)
    async getPayout(@Param('payoutId') payoutId: string) {
        const rapydService = new RapydService();
        const payout = await rapydService.getPayout(payoutId);
        return payout;
    }

    @Post('/payouts/confirm/:payoutId')
    @OpenAPI({ summary: 'Confirm a payout' })
    @ResponseSchema(Payout)
    async confirmPayout(@Param('payoutId') payoutId: string) {
        const rapydService = new RapydService();
        const payout = await rapydService.confirmPayout(payoutId);
        return payout;
    }

    @Delete('/payouts/:payoutId')
    @OpenAPI({ summary: 'Delete a payout' })
    @ResponseSchema(Payout)
    async deletePayout(@Param('payoutId') payoutId: string) {
        const rapydService = new RapydService();
        const payout = await rapydService.cancelPayout(payoutId);
        return payout;
    }
}
