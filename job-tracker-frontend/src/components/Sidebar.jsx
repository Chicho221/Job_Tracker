  
import profile from "../assets/profile.jpg"

function SideBar({password, login, setPassword, token, username, setToken, setUsername, setJobs, setPage, setTotal }) {

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("username")

        setToken("")
        setUsername("")
        setJobs([])
        setPage(1)
        setTotal(0)
    }

    if(!token){
        return(
            <div className="w-1/6 h-screen min-w-60 pt-6 bg-zinc-900 flex flex-col">
                <div className="w-full min-h-[20rem] flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-4 font-mono">Login</h2>

                <input className="bg-white/5 p-2 w-full text-center focus:bg-white/10 focus:outline-none" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input className="bg-white/5 p-2 w-full text-center focus:bg-white/10 focus:outline-none" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                
                <button className="bg-white/5 p-2 mt-2 w-full hover:bg-white/5" onClick={() => {login(),
                                                                                                    setPassword("")}}>Login</button>
                </div>
            </div>

        )
    }
    return(
        <div className="w-1/6 h-screen min-w-60 pt-6 bg-zinc-800 flex flex-col">
            <div className= "max-w-40 min-h-[20rem] mx-auto rounded-full object-fill flex flex-col justify-evenly">
                <img className= "animate-pulse-shadow shadow-blue-700 rounded-full object-cover " src={profile}></img>
                <h3 className= "overflow-hidden font-semibold cursor-default">{username}</h3>
                <button className="transition duration-300 ease-in-out p-2 rounded w-full mb-2 shadow-lg shadow-blue-700/50 bg-blue-700 
                hover:bg-white hover:text-blue-700
                " onClick={logout}>Logout</button>
            </div>

            <div className=" border-white border-b-2 my-4 mx-20"></div>

            <div className="flex flex-col">
                <span className="transition duration-300 ease-in-out p-2 w-full text-center hover:bg-blue-700 cursor-pointer active:bg-blue-700">Job Tracker</span>
                <span className="transition duration-300 ease-in-out p-2 w-full text-center hover:bg-blue-700 cursor-pointer active:bg-blue-700">Job Analyzer</span>
                <span className="transition duration-300 ease-in-out p-2 w-full text-center hover:bg-blue-700 cursor-pointer active:bg-blue-700">Project 2</span>
                <span className="transition duration-300 ease-in-out p-2 w-full text-center hover:bg-blue-700 cursor-pointer active:bg-blue-700">Project 3</span>
                <span className="transition duration-300 ease-in-out p-2 w-full text-center hover:bg-blue-700 cursor-pointer active:bg-blue-700">Project 4</span>
                <span className="transition duration-300 ease-in-out p-2 w-full text-center hover:bg-blue-700 cursor-pointer active:bg-blue-700">Project 5</span>
            </div>
        </div>
    )}

export default SideBar