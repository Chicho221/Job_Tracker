function Sort ({sort, setSort}){
    if(sort == "oldest"){
        return (
            <button value = "newest" onClick={(e) => setSort(e.target.value)}>Arrow Down</button>
            
        )
    }
    else if (sort == "newest"){
        return (
            <button value = "oldest" onClick={(e) => setSort(e.target.value)}>Arrow Up</button>
        )
    }
}

export default Sort