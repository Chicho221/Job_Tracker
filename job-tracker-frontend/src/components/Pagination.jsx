function Pagination({ token, page, total, limit, setPage }) {
    const totalPages = Math.max(1, Math.ceil(total / limit))
    if(!token) {
        return(
        <div className="flex justify-center items-center mt-4 mb-2">
          <button className="bg-orange-700 px-3 py-1 rounded disabled:bg-white/5" disabled>Prev</button>
          <span className="hover:cursor-default text-sm mx-2">Page 0 of 0</span>
          <button className="bg-orange-700 px-3 py-1 rounded disabled:bg-white/5" disabled>Next</button>
        </div>
        )
    }
    return(
        <div className="flex justify-center items-center mt-4 mb-2">
          <button 
            className="bg-orange-700 px-3 py-1 rounded disabled:bg-white/5" 
            onClick={() => setPage(prev => Math.max(prev-1, 1))} 
            disabled={page === 1}>
                Prev</button>

          <span className="hover:cursor-default text-sm mx-2">Page {page} of {totalPages}</span>
          <button 
            className="bg-orange-700 px-3 py-1 rounded disabled:bg-white/5"
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} 
            disabled={page === totalPages}
            >Next</button>
        </div>
        )
}
export default Pagination