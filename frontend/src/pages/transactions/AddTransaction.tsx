import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

// interfaces
import { ITransaction, ITransactionType } from "@types/transactions";

// redux-slice-transactions
import { createTransaction } from "@features/transactions/transactions.slice";

// context
import useGlobalState from "@hooks/useGlobalState";

const AddTransaction = () => {
    const transactionTypes = useSelector((state: any) => state.transactionsTypes);
    const dispatch = useDispatch();
    const globalState = useGlobalState();
    const [searchParams] = useSearchParams();
    const module_id = searchParams.get("module_id");

    const [error, setError] = useState<string | null>(null);
    const [transaction, setTransaction] = useState<ITransaction>({
        id: 0,
        name: "",
        description: "",
        mount: 0,
        type_transaction_id: 0,
        created_at: new Date().toISOString(),
    });
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransaction({
            ...transaction,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you would typically send the transaction to your backend
        try {
            await dispatch(createTransaction({ ...transaction, moduleId: module_id, userId: globalState.state.user.id })).unwrap();
        } catch (error) {
            console.error("Failed to create transaction:", error);
        }
    };

    return (
        <div className="container mx-auto px-10 pt-5">
            <h1 className="text-2xl font-bold mb-4">Add Transaction</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={transaction.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">Description</label>
                    <textarea
                        name="description"
                        value={transaction.description}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    ></textarea>
                </div>
                <div>
                    <label className="block mb-2">Mount</label>
                    <input
                        type="numeric"
                        name="mount"
                        value={transaction.mount}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">Type Transaction</label>
                    <select
                        name="type_transaction_id"
                        value={transaction.type_transaction_id}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="">Select Type</option>
                        {transactionTypes.map((type: ITransaction) => (
                            <option key={type.id} value={type.id}>
                                {type.name.toUpperCase()}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
                >
                    Add Transaction
                </button>
            </form>
        </div>
    );
}

export default AddTransaction;