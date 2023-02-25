export interface LiqPayPaymentResponse {
    payment_id: number;
    action: string;
    status: string;
    version: number;
    type: string;
    paytype: string;
    public_key: string;
    acq_id: number;
    order_id: string;
    liqpay_order_id: string;
    description: string;
    sender_phone: string;
    sender_card_mask2: string;
    sender_card_bank: string;
    sender_card_type: string;
    sender_card_country: number;
    amount: number;
    currency: string;
    sender_commission: number;
    receiver_commission: number;
    agent_commission: number;
    amount_debit: number;
    amount_credit: number;
    commission_debit: number;
    commission_credit: number;
    currency_debit: string;
    currency_credit: string;
    sender_bonus: number;
    amount_bonus: number;
    mpi_eci: string;
    is_3ds: boolean;
    language: string;
    create_date: number;
    end_date: number;
    transaction_id: number;
}

export interface RroInfo {
    amount: number;
    cost: number;
    id: number;
    price: number;
}

export enum LiqPayCommisionPayerEnum {
    sender = 'sender',
    receiver = 'receiver',
}

export type LiqPayCommisionPayerUnion = `${LiqPayCommisionPayerEnum}`;

export interface SplitRule {
    public_key: string;
    amount: number;
    commission_payer: LiqPayCommisionPayerUnion;
    server_url: string;
}

export interface DetailAddend {
    airLine: string; // avia company abbr, max len 4 chars
    ticketNumber: string; // ticket number, max len 15 chars 
    passengerName: string; // passenger name, max len 29 chars
    flightNumber: string; // номер рейсу, max 5 цифр.
    originCity: string; // код міста/аеропорту вильоту, max 5 символів.
    destinationCity: string; // код міста/аеропорту призначення, max 5 символів.
    departureDate: string; // дата вильоту в форматі YYMMDD, max 6 цифр.
}

export enum LiqPayActionsEnum {
    pay = 'pay',
    hold = 'hold',
    subscribe = 'subscribe',
    paydonate = 'paydonate',
    auth = 'auth',
}

export type LiqPayActionUnion = `${LiqPayActionsEnum}`;

export enum LiqPayCurrencyEnum {
    USD = 'USD',
    EUR = 'EUR',
    UAH = 'UAH',
    BYN = 'BYN',
    KZT = 'KZT',
}

export type LiqPayCurrencyUnion = `${LiqPayCurrencyEnum}`;

export enum LiqPayLanguageEnum {
    ru = 'ru',
    uk = 'uk',
    en = 'en',
}

export type LiqPayLanguageUnion = `${LiqPayLanguageEnum}`;

export enum LiqPayPayTypeEnum {
    apay = 'apay',
    gpay = 'gpay',
    card = 'card',
    liqpay = 'liqpay',
    privat24 = 'privat24',
    masterpass = 'masterpass',
    moment_part = 'moment_part',
    paypart = 'paypart',
    cash = 'cash',
    invoice = 'invoice',
    qr = 'qr',
}

export type LiqPayPayTypeUnion = `${LiqPayPayTypeEnum}`;

export enum LiqPaySubscribePeriodicityEnum {
    month = 'month',
    year = 'year',
}

export type LiqPaySubscribePeriodicityUnion = `${LiqPaySubscribePeriodicityEnum}`;

export interface LiqPayData {
    public_key: string;
    private_key: string;
    version: number;
    action: LiqPayActionUnion;
    amount: number;
    currency: LiqPayCurrencyUnion;
    description: string;
    order_id: string;
    rro_info?: RroInfo[];
    expired_date?: string;
    language?: LiqPayLanguageUnion;
    paytypes?: LiqPayPayTypeUnion; 
    result_url?: string;
    server_url?: string;
    verifycode?: string;
    split_rules?: string; // SplitRule[] json string
    sender_address?: string;
    sender_city?: string;
    sender_country_code?: string;
    sender_first_name?: string;
    sender_last_name?: string;
    sender_postal_code?: string;
    letter_of_credit?: '1';
    letter_of_credit_date?: string;
    subscribe?: string;
    subscribe_date_start?: string;
    subscribe_periodicity?: LiqPaySubscribePeriodicityUnion;
    customer?: string;
    recurringbytoken?: '1';
    customer_user_id?: string;
    dae?: string; // DetailAddend json string
    info?: string;
    product_category?: string; // 25 max
    product_description?: string // 500 max
    product_name?: string; // 100 max
    product_url?: string; // 2000 max
}

export type Credentials = {
    data: string,
    signature: string,
}