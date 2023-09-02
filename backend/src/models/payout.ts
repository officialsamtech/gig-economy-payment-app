import { IsBoolean, IsString, IsObject, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class Sender {
    @IsString()
    country: string;

    @IsString()
    city: string;

    @IsString()
    address: string;

    @IsString()
    state: string;

    @IsString()
    postcode: string;

    @IsString()
    name: string;

    @IsString()
    currency: string;

    @IsString()
    entity_type: string;

    @IsString()
    identification_value: string;

    @IsString()
    identification_type: string;
}

export class Payout {
    @IsString()
    beneficiary: string;

    @IsString()
    ewallet: string;

    @IsString()
    beneficiary_entity_type: string;

    @IsBoolean()
    confirm_automatically: boolean;

    @IsString()
    description: string;

    @IsString()
    payout_amount: string;

    @IsString()
    payout_method_type: string;

    @IsString()
    payout_currency: string;

    @IsObject()
    @ValidateNested()
    @Type(() => Sender)
    sender: Sender;

    @IsString()
    sender_country: string;

    @IsString()
    sender_currency: string;

    @IsString()
    sender_entity_type: string;
}
