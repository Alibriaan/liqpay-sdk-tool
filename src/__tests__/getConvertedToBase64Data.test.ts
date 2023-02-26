import {describe, expect, test} from '@jest/globals';
import { LiqPayData } from '../interfaces/liq-pay.interfaces';
import { getConvertedToBase64Data } from '../index';

const VALID_MOCKUP_DATA: LiqPayData = {
    public_key: 'public_key',
    private_key: 'private_key',
    version: 3,
    action: 'pay',
    amount: 1,
    currency: 'UAH',
    description: 'description',
    order_id: 'order_id',
};
const INVALID_TYPES = [ 0, "", null, undefined, {}, [], () => undefined ];

describe('getConvertedToBase64Data', () => {
  test('Pass valid LiqPay DTO Object', () => {
    expect(typeof getConvertedToBase64Data(VALID_MOCKUP_DATA)).toBe('string');
  });

  INVALID_TYPES.forEach((type) => {
    test(`Pass invalid type - ${typeof type} value - ${type} as LiqPay DTO Object`, () => {    
        expect(getConvertedToBase64Data({} as LiqPayData) instanceof Error).toBe(true);
    });
  });
});