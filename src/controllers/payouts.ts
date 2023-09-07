import { Param, Body, Get, Post, HttpCode, UseBefore, JsonController, Delete, QueryParam, QueryParams } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import { dynamicValidationMiddleware } from '@/middlewares/dynamicValidation.middleware';
import RapydService from '@/services/rapydService';
import { Payout } from '@/models/payout';
import { PayoutMethod } from '@/models/payoutMethod';
import { PayoutMethodRequiredFieldsQuery } from '@/models/payoutMethodRequiredFields';
import { CompletePayout } from '@/models/completePayout';

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
    @UseBefore(dynamicValidationMiddleware)
    @ResponseSchema(Payout)
    @OpenAPI({ summary: 'Create a new payout' })
    async createPayout(@Body() body: any) {
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

    @Get('/payouts/:payout_method_type/details')
    @OpenAPI({ summary: 'Return required fields for payout' })
    @ResponseSchema(PayoutMethodRequiredFieldsQuery)
    async getPayoutMethodRequiredFields(
        @Param('payout_method_type') payout_method_type: string,
        @QueryParams() queryParams: PayoutMethodRequiredFieldsQuery
    ) {
        const rapydService = new RapydService();
        const requiredFields = await rapydService.getPayoutMethodRequiredFields(payout_method_type, queryParams);
        return requiredFields;
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
    @OpenAPI({ summary: 'Confirm a payout with Foreign exchange' })
    @ResponseSchema(Payout)
    async confirmPayout(@Param('payoutId') payoutId: string) {
        const rapydService = new RapydService();
        const payout = await rapydService.confirmPayout(payoutId);
        return payout;
    }

    @Post('/payouts/complete/:payout/:amount')
    @HttpCode(200)
    @UseBefore(validationMiddleware(CompletePayout, 'params'))
    @ResponseSchema(CompletePayout)
    @OpenAPI({ summary: 'Complete a payout' })
    async completePayout(@Param('payout') payout: string, @Param('amount') amount: number) {
        const rapydService = new RapydService();
        const completedPayout = await rapydService.completePayout(payout, amount);
        return completedPayout;
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
