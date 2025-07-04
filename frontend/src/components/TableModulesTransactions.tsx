import { Link } from "react-router-dom";

// interfaces
import { ITableModule } from "@types/modules";

const TableTransactionsByModule = ({ transactions, module_id }: ITableModule) => {
    const validateEmptyValue = (value: string | number | undefined) => {
        if (value === undefined || value === null || value === '') {
            return 'N/A';
        }
        return String(value).toUpperCase();
    }

    return (
        <div className="flex flex-col gap-4">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="text-left">
                        <th className="px-4 py-2 border-b border-gray-300">ID</th>
                        <th className="px-4 py-2 border-b border-gray-300">Name</th>
                        <th className="px-4 py-2 border-b border-gray-300">Description</th>
                        <th className="px-4 py-2 border-b border-gray-300">Mount</th>
                        <th className="px-4 py-2 border-b border-gray-300">Type</th>
                        <th className="px-4 py-2 border-b border-gray-300">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td className="px-4 py-2 border-b border-gray-300">{transaction.id}</td>
                            <td className="px-4 py-2 border-b border-gray-300">{validateEmptyValue(transaction.name)}</td>
                            <td className="px-4 py-2 border-b border-gray-300">{validateEmptyValue(transaction.description)}</td>
                            <td className="px-4 py-2 border-b border-gray-300">{validateEmptyValue(transaction.mount)}</td>
                            <td className="px-4 py-2 border-b border-gray-300">{validateEmptyValue(transaction.type_transaction_name)}</td>
                            <td className="px-4 py-2 border-b border-gray-300">{validateEmptyValue(new  Date(transaction.created_at).toLocaleDateString())}</td>
                        </tr>
                    ))}
                    {transactions.length === 0 && (
                        <tr>
                            <td colSpan={6} className="px-4 py-2 border-b border-gray-300 text-center text-gray-500">
                                No transactions found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {/* link to create a new transaction */}
            <div className="flex justify-end">
                <Link to={`/add-transaction?module_id=${module_id}`} className="text-blue-600 hover:cursor-pointer hover:text-blue-500">
                    + Create new transaction
                </Link>
            </div>
        </div>
    )
}

export default TableTransactionsByModule
