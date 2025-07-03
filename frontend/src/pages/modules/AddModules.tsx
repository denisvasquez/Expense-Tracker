import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// interfaces
import { IModulesTypes, IModules } from '@types/modules'

// global state
import useGlobalState from '@hooks/useGlobalState'

// redux-slice-modules
import { createModule } from '@features/modules/modules.slice'

const AddModules = () => {
    // global state
    const { state } = useGlobalState()
    const navigate = useNavigate();

    const modulesTypes = useSelector((state: any) => state.modulesTypes);
    const dispatch = useDispatch()

    const [moduleError, setModuleError] = useState<string | null>(null);
    const [module, setModuleName] = useState<IModules>({
        name: '',
        type_module: 0,
        user_id: 0,
    });

    const handleModuleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setModuleName({
            ...module,
            name: e.target.value,
        });
    };

    const handleModuleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setModuleName({
            ...module,
            type_module: parseInt(e.target.value, 10),
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await dispatch(createModule(module)).unwrap();
            navigate("/dashboard");
        } catch (error) {
            console.error('Failed to add module:', error);
            setModuleError(error);
        }
    };

    useEffect(() => {
        if (state?.user?.id) {
            setModuleName(prevModule => ({
                ...prevModule,
                user_id: state.user.id,
            }));
        }
    }, [state?.user?.id]);

    return (
        <div className="flex flex-col items-center justify-center h-full w-full -mt-5">
            {moduleError && (
                <div className="bg-red-500 border border-red-600 opacity-75 text-white p-2 rounded mb-4 w-96 text-center">
                    {moduleError}
                </div>
            )}
            <div className="bg-white p-6 border border-gray-300 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Add Module</h2>
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Module Name"
                        className="border border-gray-300 p-2 rounded"
                        value={module.name}
                        onChange={handleModuleNameChange}
                    />
                    <select name="" id="" className="border border-gray-300 p-2 rounded" onChange={handleModuleTypeChange}>
                        <option value="">Select Module Type</option>
                        {modulesTypes.map((type: IModulesTypes) => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-700"
                    >
                        Add Module
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddModules
