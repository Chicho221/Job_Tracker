function Pagination({ token, page, total, limit, setPage }) {
    const totalPages = Math.max(1, Math.ceil(total / limit))
    if(!token) {
        return(
        <div className="col-span-3 mt-4 mb-2">
          
          <span className="hover:cursor-default text-sm mx-2 italic">No jobs added yet :(</span>
          
        </div>
        )
    }

    return(
        <div className="mt-2 flex flex-row items-center justify-center">
          <button 
            className="transition duration-300 ease-in-out bg-blue-700 px-3 py-1 rounded-xl disabled:bg-white/5 disabled:text-white active:scale-95" 
            onClick={() => setPage(prev => Math.max(prev-1, 1))} 
            disabled={page === 1}>
              <svg class="w-[24px] h-[24px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/></svg>
          </button>

          <span className="hover:cursor-default text-sm mx-2">Page {page} of {totalPages}</span>

          <button 
            className="transition duration-300 ease-in-out bg-blue-700 px-3 py-1 rounded-xl disabled:bg-white/5 disabled:text-white active:scale-95"
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} 
            disabled={page === totalPages}> 
              <svg class="w-[24px] h-[24px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg>
          </button>
        </div>
        )
}
export default Pagination