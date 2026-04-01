function SearchBar ({search, searchstatus, setSearchStatus, setSearch}) {
return(
    <div className="w-1/3 flex flex-col justify-end items-start mx-4 mb-4">
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
)}

export default SearchBar