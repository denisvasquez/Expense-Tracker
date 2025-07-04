export interface ITransactionType {
    id: number;
    name: string;
}

export interface ITransaction {
    id: number;
    name: string;
    description: string;
    mount: number;
    type_transaction_name: string;
    created_at: string;
}