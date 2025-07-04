import { useSelector } from 'react-redux';

// components
import TableTransactionsByModule from '@components/TableModulesTransactions';

// interfaces
import { IModulesTransactions } from '@types/modules';

const ModulesTransactions = () => {
    const modules = useSelector((state: any) => state.modules);

    return (
        <div className="flex flex-col gap-4">
            {modules.map((module: IModulesTransactions) => (
                <>
                    <h1 className="text-2xl font-bold">{module.name.toUpperCase()}</h1>
                    <TableTransactionsByModule key={module.id} transactions={module.transactions} module_id={module.id} />
                </>
            ))}
        </div>
    );
};

export default ModulesTransactions;