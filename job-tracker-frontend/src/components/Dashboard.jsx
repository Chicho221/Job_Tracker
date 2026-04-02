function Dashboard ({stats}) {
    console.log(stats)
    return(
        <div className="h-3/4 mb-4 mr-4 flex flex-1 rounded-xl bg-zinc-800/50 shadow-xl">
            <div className="bg-zinc-900 p-4 rounded">
                <p>Total</p>
                <h2>{stats.total}</h2>
            </div>
            <div className="bg-zinc-900 p-4 rounded">
                <p>Applied</p>
                <h2>{stats.applied}</h2>
            </div>
            <div className="bg-zinc-900 p-4 rounded">
                <p>Interview</p>
                <h2>{stats.interview}</h2>
            </div>
            <div className="bg-zinc-900 p-4 rounded">
                <p>Rejected</p>
                <h2>{stats.rejected}</h2>
            </div>
        </div>
    )
}

export default Dashboard