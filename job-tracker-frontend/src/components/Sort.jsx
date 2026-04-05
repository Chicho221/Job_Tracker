function Sort ({sort, setSort, token, loading}){
    return (
        <select value={sort} onChange={(e) => {setSort(e.target.value)}} disabled={loading || !token}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="company">Company</option>
            <option value="status">Status</option>
        </select>
        
    )
}

export default Sort