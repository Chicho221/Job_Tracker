function JobForm({title, setTitle, company, setCompany, status, setStatus, editingId, addOrUpdateJob, loading, token}){
    const state = {
        create_load: loading.add_update_job
    }
return(

    <div className="w-1/3 min-w-fit flex flex-col justify-end">

        <div>
        <h1 className="mr-auto bg-zinc-900 py-6 pl-6 pr-24 text-start font-mono">Job Tracker</h1>
        </div>

        <div className="flex w-full">

            <div className="flex flex-col w-full mr-2">
                <input className="p-2 rounded bg-zinc-800 focus:bg-white/5 focus:outline-none" type="text"  placeholder = "Job Title" value = {title} onChange = {(e) => setTitle(e.target.value)} disabled={!token}/>
                <input className="p-2 rounded my-2 bg-zinc-800 focus:bg-white/5 focus:outline-none" type="text" placeholder = "Company Name" value = {company} onChange = {(e) => setCompany(e.target.value)} disabled={!token}/>
                
                <select className="p-2 rounded bg-zinc-800 outline outline-none " name="status" id="status" value = {status} onChange = {(e) => setStatus(e.target.value)}  disabled={!token}>
                <option value="applied">Applied</option>
                <option value="rejected">Rejected</option>
                <option value="interview">Interview</option>
                </select>
            </div>
                
            <div className="flex pr-4 border-r-2">
                {editingId &&(<button className="transition duration-300 ease-in-out px-6 py-2 rounded  bg-blue-700 hover:scale-105 disabled:bg-zinc-700 disabled:shadow-l disabled:shadow-zinc-700 disabled:scale-100 active:scale-95" onClick={addOrUpdateJob} disabled={state.create_load || !token}>
                {!state.create_load &&("Update Job")}
                {state.create_load &&(<div className="rounded-full w-8 h-8 border-2 border-white border-t-transparent animate-spin"></div>)}
                </button>)}

                {!editingId &&(<button className="fles-1 transition duration-300 ease-in-out px-6 py-2 rounded bg-blue-700 hover:scale-105 disabled:bg-zinc-700 disabled:shadow-l disabled:shadow-zinc-700 disabled:scale-100 active:scale-95 disabled:hover:text-white" onClick={addOrUpdateJob} disabled={state.create_load || !token}>
                {!state.create_load &&("Create Job")}
                {state.create_load &&(<div className="rounded-full w-8 h-8 border-2 border-white border-t-transparent animate-spin"></div>)}
                </button>)}
            </div>

        </div>
            
    </div>
)}

export default JobForm