interface Props {
    admintitle: string
    adminsubtitle: string
}

export const AdminTitle = ({ admintitle, adminsubtitle }: Props) => {
    return (
        <>
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {admintitle}
                </h1>
                <p className="text-gray-600">
                    {adminsubtitle}
                </p>
            </div>
        </>
    )
}
