import {describe, expect, test} from '@jest/globals';
import { LiqPayData, Credentials } from '../interfaces/liq-pay.interfaces';
import { getCredentials } from '../index';

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

describe('getCredentials', () => {
    test('Pass valid LiqPay DTO Object', () => {
        const result = getCredentials(VALID_MOCKUP_DATA);

        expect(Object.keys(result).includes('data') && Object.keys(result).includes('signature')).toBe(true);
        expect(typeof (result as Credentials)['data']).toBe('string');
        expect(typeof (result as Credentials)['signature']).toBe('string');
        expect((result as Credentials)['data']).not.toBe('');
        expect((result as Credentials)['signature']).not.toBe('');
    });

    INVALID_TYPES.forEach((type) => {
        test(`Pass ${typeof type} as LiqPay DTO Object`, () => {
            expect(getCredentials(type as any) instanceof Error).toBe(true);
        });
    });
});