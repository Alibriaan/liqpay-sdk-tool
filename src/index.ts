import CryptoJS from 'crypto-js';
import Joi from 'joi';
import { LiqPayData } from './interfaces/liq-pay.interfaces';
import { LiqPayDataSchema, LiqPayEmptyStringValidation } from './utils/validate';

export function getConvertedToBase64Data(data: LiqPayData) {
    const validation = LiqPayDataSchema.validate(data);

    if(validation.error || !validation.value) {
        return validation.error || new Joi.ValidationError('Invalid LiqPay Data', [], data);
    }
 
    const wordArray = CryptoJS.enc.Utf8.parse(JSON.stringify(data));

    return CryptoJS.enc.Base64.stringify(wordArray);
}

export function createSignature(liqPayDataBase64: string, privateKey: string) {
    const base64Validation = LiqPayEmptyStringValidation.validate(liqPayDataBase64);
    const privateKeyValidation = LiqPayEmptyStringValidation.validate(privateKey);

    if(base64Validation.error || !base64Validation.value) {
        return new Joi.ValidationError('Invalid LiqPay data base64 string', [], liqPayDataBase64);
    } else if(privateKeyValidation.error || !privateKeyValidation.value) {
        return new Joi.ValidationError('Invalid privateKey', [], privateKey);
    }

    const signature = CryptoJS.SHA1(`${privateKey}${liqPayDataBase64}${privateKey}`, ).toString(CryptoJS.enc.Base64);

    return signature;
}

export function getCredentials(liqPayData: LiqPayData) {
    const liqPayBase64Data = getConvertedToBase64Data(liqPayData);

    if(typeof liqPayBase64Data !== 'string') {
        return liqPayBase64Data;
    }

    const signature = createSignature(liqPayBase64Data, liqPayData.private_key);

    if(signature instanceof Error) {
        return signature;
    }
    
    return { data: liqPayBase64Data, signature };
}