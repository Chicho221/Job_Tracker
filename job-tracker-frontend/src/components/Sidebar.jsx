  import profile from "../assets/profile.jpg"

function SideBar({deleteUser ,loading, password, login, setPassword,setNewpassword, newpassword, createUser, token, username, setUsername, setNewusername, newusername, setToken, setJobs, setPage, setTotal }) {
    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("username")

        setToken("")
        setUsername("")
        setJobs([])
        setPage(1)
        setTotal(0)
    }

    const check = (e) =>{
        if(!e) {
            return
        }else{
            logout()
        }
    }

    const loadingState = {
        login: loading.login,
        register: loading.register,
        logout: loading.logout,
        delete: loading.delete_user
    }
  
    if(!token){
        return(
            <div className="w-1/6 h-screen min-w-60 pt-6 bg-zinc-900 flex flex-col">
                <div className="max-w-40 min-h-[20rem] mx-auto rounded-full object-fill flex flex-col justify-center gap-2">
                    <h2 className="text-2xl font-bold mb-4 font-mono">Login</h2>

                    <input className="bg-white/5 p-2 w-full text-center focus:bg-white/10 focus:outline-none" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input className="bg-white/5 p-2 w-full text-center focus:bg-white/10 focus:outline-none" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    
                    <button className="transition duration-100 ease-in-out p-2 rounded w-full mb-2 shadow-lg shadow-blue-700/50 bg-blue-700 hover:scale-105 flex justify-center disabled:bg-zinc-700 disabled:shadow-l disabled:shadow-zinc-700 active:scale-95" disabled = {loadingState.login  || loadingState.register} onClick={() => {login(),setPassword("")}}>
                        {!loadingState.login &&("Login")}
                        {loadingState.login &&(<div className="rounded-full w-6 h-6 border-2 border-white border-t-transparent animate-spin"></div>)}
                    </button>
        
                    <h2 className="text-2xl font-bold mb-4 font-mono">Register</h2>
                    <input className="bg-white/5 p-2 w-full text-center focus:bg-white/10 focus:outline-none" placeholder="Username" value={newusername} onChange={(e) => setNewusername(e.target.value)} />
                    <input className="bg-white/5 p-2 w-full text-center focus:bg-white/10 focus:outline-none" placeholder="Password" value={newpassword} onChange={(e) => setNewpassword(e.target.value)} />
                    <button className="transition duration-100 ease-in-out p-2 rounded w-full mb-2 shadow-lg shadow-blue-700/50 bg-blue-700 hover:scale-105 flex justify-center disabled:bg-zinc-700 disabled:shadow-l disabled:shadow-zinc-700 active:scale-95" disabled = {loadingState.register || loadingState.login} onClick={() =>(createUser())} >
                        {!loadingState.register &&("Register")}
                        {loadingState.register &&(<div className=" rounded-full w-6 h-6 border-2 border-white border-t-transparent animate-spin"></div>)}
                    </button>
                    <div className="mx-auto transition flex justify-center items-center bottom-20 w-[32px] h-[32px]"><a href="https://github.com/Chicho221" target="_blank" rel="noopener noreferrer">
                        <svg class="w-[32px] h-[32px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clip-rule="evenodd"/></svg>
                        </a>
                    </div>
                </div>
            </div>
            
        )
    }
    
    return(
        <div className="w-1/6 h-screen min-w-60 pt-6 bg-zinc-800 flex flex-col">
            <div className= "max-w-40 min-h-[20rem] mx-auto rounded-full object-fill flex flex-col justify-evenly">
                <img className= "transition duration-300 animate-pulse-shadow shadow-blue-700 rounded-full object-cover hover:scale-105" src={profile}></img>
                <h3 className= "overflow-hidden font-semibold cursor-default">{username}</h3>
                <button className="transition duration-100 ease-in-out p-2 rounded w-full mb-2 shadow-lg shadow-blue-700/50 bg-blue-700 hover:scale-105 acitve:scale-95 flex justify-center disabled:bg-zinc-700 disabled:shadow-l disabled:shadow-zinc-700 active:scale-95" onClick={logout} disabled = {loadingState.logout || loadingState.delete}>
                {!loadingState.logout &&("Logout")}
                {loadingState.logout &&(<div className=" rounded-full w-6 h-6 border-2 border-white border-t-transparent animate-spin"></div>)}
                </button>
            </div>

            <div className=" border-white border-b-2 my-4 mx-20"></div>

            <div className="flex flex-col">
                <span className="transition duration-300 ease-in-out p-2 w-full text-center hover:bg-blue-700 cursor-pointer active:bg-blue-700">Job Tracker</span>
            </div>
            
            <button className="flex flex-col rounded-full p-2 mt-auto mb-4 mx-4 bg-red-800
                                transition duration-100 active:scale-95 hover:scale-105
                                disabled:bg-zinc-700" onClick={async () => {
                                    const result = await deleteUser()
                                    check(result)
                                    }} disabled = {loadingState.logout || loadingState.delete}>
                {!loadingState.delete &&("Delete Account")}
                {loadingState.logout &&(<div className="rounded-full w-6 h-6 border-2 border-white border-t-transparent animate-spin"></div>)}
            </button>
            <div className="mx-auto mb-2 transition flex justify-center items-center bottom-20 w-[32px] h-[32px]">
                <svg class="w-[32px] h-[32px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clip-rule="evenodd"/></svg>
            </div>
        </div>
    )}

export default SideBar