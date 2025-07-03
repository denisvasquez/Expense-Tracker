export interface IModulesTypes {
    id: number;
    name: string;
}

export interface IModules {
    id: number;
    name: string;
    type: IModulesTypes;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}