function Sort ({sort, setSort, token, loading}){
    if(token){
    return (
        <div className="flex justify-start items-end px-2">
            <select className="rounded-xl px-2 shadow-lg" value={sort} onChange={(e) => {setSort(e.target.value)}} disabled={loading || !token}>
                <option value="newest">New</option>
                <option value="oldest">Old</option>
                <option value="company">Company</option>
                <option value="status">Status</option>
            </select>
        </div>
    )
    }
}

export default Sort