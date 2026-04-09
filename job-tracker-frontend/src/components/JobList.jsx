function JobList({token, jobs, editingId, startEdit, deleteJob, setEditingId, setTitle, setCompany, setStatus }) {
  if(token){
    return (
      
      <div>

        <div className="grid grid-cols-5 h-50 bg-zinc-900 py-2 px-6 mx-2 rounded-t-xl border-b-2 border-zinc-800 space-x-4">
          <p className="cursor-default">Title</p>
          <p className="cursor-default">Company</p>
          <p className="cursor-default">Status</p>
          <p className="cursor-default">Added</p>
        </div>

        <ul className="max-h-50 grid gap-2 grid-rows-8 bg-zinc-900 mx-2 p-2 mb-2 rounded-b-xl shadow-xl">
          {jobs.map((job) => (
          <li key={job.id} className=" bg-zinc-700/10 rounded-full px-4 py-2 transition hover:bg-white/10 w-full">

            <div className="grid grid-cols-5 items-center text-base font-mono space-x-4">
              
                <p title={job.title} className="text-start cursor-default overflow-hidden">{job.title}</p>
                <p className="cursor-default  overflow-hidden">{job.company}</p>
                <p className="cursor-default mt-1">{job.status}</p>  
                <p className="cursor-default mt-1">{job.created_at}</p> 
              
              <div className="flex flex-row items-center gap-2">

                <div className="flex flex-row w-full justify-end">

                  {!editingId && (<button className="transition bg-zinc-800 p-1 rounded-full hover:bg-white/10" onClick={() => startEdit(job)}>
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/></svg>
                  </button>)}
                  {editingId && (<button className="transition bg-zinc-800 p-1 rounded-full hover:bg-white/10" onClick={() => {setEditingId(null), setTitle(""), setCompany(""), setStatus("")}}>
                    <svg class="w-[24px] h-[24px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>
                  </button>)}

                </div>

                <div className="bg-red-900 text-center rounded-full p-1 flex items-center">
                  <button onClick={() => deleteJob(job.id)}>
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/></svg>
                  </button>
                </div>

              </div>  

            </div>

          </li>
          ))}

        </ul>

      </div>    
    )
  }
}

export default JobList