function JobList({ jobs, editingId, startEdit, deleteJob, setEditingId, setTitle, setCompany, setStatus }) {
    return (
      <ul className="m-4 grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {jobs.map((job) => (
        <li key={job.id} className="bg-zinc-900 rounded p-4 hover:bg-white/10">

        <div className="flex justify-between items-center">
          <div className="w-2/3 flex flex-col items-start overflow-hidden">
            <p title={job.title} className="cursor-default text-xl">{job.title}</p>
            <p className="cursor-default text-base ">{job.company}</p>
            <p className="cursor-default text-sm mt-1">Status: {job.status}</p>  
          </div>
          <div className="flex flex-col items-end w-1/3 space-y-2">
            <div className="flex flex-row w-full justify-end space-x-2">
              {!editingId &&(<button className="transition  bg-zinc-800 px-2 py-1 rounded hover:bg-white/10" onClick={() => startEdit(job)}>Edit</button>)}
              {editingId && (<button className="bg-zinc-800 px-2 py-1 rounded hover:bg-white/10" onClick={() => {setEditingId(null)
                                                                                                                      setTitle("")
                                                                                                                      setCompany("")
                                                                                                                      setStatus("")}}>Cancel</button>)}
            </div>
            <div className="bg-red-900 px-2 py-1 rounded min-w-1/2">
              <button onClick={() => deleteJob(job.id)}>Delete</button>
            </div>
          </div>  
        </div>
        </li>
          ))}
        </ul>
    )
}

export default JobList