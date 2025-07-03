import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const TableModules = () => {
    const modules = useSelector((state: any) => state.modules)

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Table Modules</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">
                            Name
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            Type Module
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            User ID
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {modules.map((module: any) => (
                        <tr key={module.id}>
                            <td className="border border-gray-300 px-4 py-2">
                                {module.id}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {module.name}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {module.type_module}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {module.user_id}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableModules
