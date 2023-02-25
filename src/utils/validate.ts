import * as Joi from "joi";
import { LiqPayActionsEnum, LiqPayCurrencyEnum, LiqPayData } from "../interfaces/liq-pay.interfaces";
    
export const LiqPayDataSchema = Joi.object<LiqPayData>({
    public_key: Joi.string().required(),
    private_key: Joi.string().required(),
    version: Joi.number().required(),
    action: Joi.alternatives(Object.values(LiqPayActionsEnum).map((action) => Joi.string().valid(action))).required(),
    amount: Joi.number().required(),
    currency: Joi.alternatives(Object.values(LiqPayCurrencyEnum).map((currency) => Joi.string().valid(currency))).required(),
    description: Joi.string().required(),
    order_id: Joi.string().required(),
});


export const LiqPayEmptyStringValidation = Joi.string().required().not('');