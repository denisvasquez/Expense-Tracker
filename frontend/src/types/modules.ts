import { ITransaction } from "./transactions";

export interface IModulesTypes {
    id: number;
    name: string;
}

export interface ITableModule {
    module_id: number;
    transactions: ITransaction[];
}

export interface IModules {
    name: string;
    type_module: number;
    user_id: number;
}

export interface IModulesTransactions {
    id: number;
    name: string;
    type_module: string;
    user_id: number;
    transactions: ITransaction[];
}