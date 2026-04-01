function JobForm({title, setTitle, company, setCompany, search, searchstatus, status, setStatus, editingId, addOrUpdateJob}){
    return(
    <div className="w-full flex flex-row items-end">

        <div className="w-1/3 min-w-fit flex flex-col">

            <div className="">
            <h1 className="mr-auto bg-zinc-900 py-6 pl-6 pr-24 text-start font-mono">Job Tracker</h1>
            </div>

            <div className="flex flex-row justify-start w-full h-full">

            <div className="flex flex-col w-full ml-4 mr-2">
                <input className="p-2 rounded bg-zinc-800 focus:bg-white/5 focus:outline-none" type="text"  placeholder = "Job Title" value = {title} onChange = {(e) => setTitle(e.target.value)}/>
                <input className="p-2 rounded my-2 bg-zinc-800 focus:bg-white/5 focus:outline-none" type="text" placeholder = "Company Name" value = {company} onChange = {(e) => setCompany(e.target.value)}/>
                
                <select className="p-2 rounded bg-zinc-800 outline outline-none " name="status" id="status" value = {status} onChange = {(e) => setStatus(e.target.value)}>
                <option value="applied">Applied</option>
                <option value="rejected">Rejected</option>
                <option value="interview">Interview</option>
                </select>
            </div>
            
            <div className="flex pr-4 border-r-2">
                {editingId &&(<button className=" px-6 py-2 rounded bg-zinc-800 hover:bg-white/5 active:bg-orange-700" onClick={addOrUpdateJob}>Update Job</button>)}
                {!editingId &&(<button className=" px-6 py-2 rounded bg-zinc-800 hover:bg-white/5 active:bg-orange-700" onClick={addOrUpdateJob}>Create Job</button>)}
            </div>

            </div>
            
        </div>

        <div className="w-2/3 flex flex-col flex-auto h-full justify-end items-start mx-4">
            <div className="flex flex-auto flex-col justify-end">
            <h2 className="text-xl font-mono mt-4">Live Search</h2>
            <input className="bg-zinc-800 p-2 rounded w-full mb-2 focus:bg-white/5 focus:outline-none" placeholder="Title / Company" value={search} onChange={(e) => setSearch(e.target.value)}/>
            <select className ="bg-zinc-800 p-2 rounded focus:outline-none "value = {searchstatus} onChange = {(e) => setSearchStatus(e.target.value)}>
                <option value="" default>Status</option>
                <option value="applied">Applied</option>
                <option value="rejected">Rejected</option>
                <option value="interview">Interview</option>
            </select>
            </div>
        </div>
    </div>
)}

export default JobForm