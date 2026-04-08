function JobList({token, jobs, editingId, startEdit, deleteJob, setEditingId, setTitle, setCompany, setStatus }) {
    if(token){
    return (
      
      <div>
        <div className="grid grid-cols-5 h-50 bg-zinc-900 py-2 px-6 mx-2 rounded-t-xl border-b border-zinc-700">
          <p className="cursor-default">Title</p>
          <p className="cursor-default">Company</p>
          <p className="cursor-default">Status</p>
          <p className="cursor-default">Added</p>
        </div>
        <ul className="max-h-50 grid gap-2 grid-rows-8 bg-zinc-900 mx-2 p-2 mb-2 rounded-b-xl shadow-xl">
        
        {jobs.map((job) => (
          console.log(job),
        <li key={job.id} className=" bg-zinc-700/10 rounded-full px-4 py-2 hover:bg-white/10 w-full">

        <div className="grid grid-cols-5 items-center">
          
            <p title={job.title} className="text-start cursor-default text-lg">{job.title}</p>
            <p className="cursor-default text-base ">{job.company}</p>
            <p className="cursor-default text-sm mt-1">{job.status}</p>  
            <p className="cursor-default text-sm mt-1">{job.created_at}</p> 
          
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-row w-full justify-end space-x-2">
              {!editingId && (<button className="transition  bg-zinc-800 px-2 py-1 rounded hover:bg-white/10" onClick={() => startEdit(job)}>Edit</button>)}
              {editingId && (<button className="bg-zinc-800 px-2 py-1 rounded hover:bg-white/10" onClick={() => {setEditingId(null)
                                                                                                                      setTitle("")
                                                                                                                      setCompany("")
                                                                                                                      setStatus("")}}>Cancel</button>)}
            </div>
            <div className="bg-red-900 h-5 w-5 text-center rounded-full">
              <button onClick={() => deleteJob(job.id)}>x</button>
            </div>
          </div>  
        </div>
        </li>
          ))}
        </ul>
      </div>    
    )}
}

export default JobList