function JobForm({title, setTitle, company, setCompany, status, setStatus, editingId, addOrUpdateJob}){
return(

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
)}

export default JobForm