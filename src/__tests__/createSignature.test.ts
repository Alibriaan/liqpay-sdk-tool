import {describe, expect, test} from '@jest/globals';
import { createSignature } from '../index';

const INVALID_TYPES = [ 0, "", null, undefined, {}, [], () => undefined ];

describe('createSignature', () => {
    test('Pass valid arguments', () => {
        expect(typeof createSignature('test-base64', 'private_key')).toBe('string');
    });

    INVALID_TYPES.forEach((type) => {
        test(`Pass invalid type - ${typeof type} value - ${type} as base64`, () => {
            expect(createSignature(type as any, '') instanceof Error).toBe(true);
        });
    });

    INVALID_TYPES.forEach((type) => {
        test(`Pass invalid type - ${typeof type} value - ${type} as secret_key`, () => {
            expect(createSignature('test-base64', type as any) instanceof Error).toBe(true);
        });
    });


    INVALID_TYPES.forEach((type) => {
        INVALID_TYPES.forEach((InnerType) => {
            test(`Pass invalid type - ${typeof type} value - ${type} as base64 and invalid type - ${typeof InnerType} value - ${InnerType} as secret_key`, () => {
                expect(createSignature('test-base64', type as any) instanceof Error).toBe(true);
            });
        });
    });
});