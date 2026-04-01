import {useState} from "react"
import {useEffect} from "react"
import profile from "./assets/profile.jpg"

function App() {
  const [jobs, setJobs] = useState([])
  const [title, setTitle] = useState("")
  const [company, setCompany] = useState("")
  const [status, setStatus] = useState("applied")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [token, setToken] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [search, setSearch] = useState("")
  const [searchstatus, setSearchStatus] = useState("")
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  //Get user width and set limit for jobs display
  const getLimit = () => {
    const width = window.innerWidth

    if (width < 640) return 5       // Mobile
    if (width < 1024) return 8      // Tablet
    return 9                       // Desktop
  }
  const [limit, setLimit] = useState(getLimit())
  
  //On load get/set token
  useEffect(() => {
    const savedToken = localStorage.getItem("token")
    if (savedToken) {
      setToken(savedToken)
    }
  },[])
  //Clear on token loss
  useEffect(() => {
    if (!token) {
      setJobs([])
      setTotal(0)
      setPage(1)
    }
  }, [token])

  //Set Username
  useEffect(() => {
    const savedUsername = localStorage.getItem("username")
    if (savedUsername) {
      setUsername(savedUsername)
    }
  }, [])
  
  //On effects fetch jobs if token exist
  useEffect(() => {
    if (token) {
      fetchJobs()
    }
  }, [token, page, limit, search, searchstatus])

  //On effects change page number
  useEffect(() => {
    setPage(1)
  }, [limit, search, searchstatus])

  //On resize change limit
  useEffect(() => {
    const handleResize = () => {
      setLimit(getLimit())
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  //Login function
  const login = async () => {
    const formData = new URLSearchParams()
    formData.append("username", username)
    formData.append("password", password)
    console.log("Debug: End")
    const response = await fetch("http://127.0.0.1:8000/login",{
      method: "POST",
      body: formData
    })
    console.log("Debug: End")
    if (!response.ok) {
      alert("Login Failed!")
      return
    }
    if (response.ok) {
    const data = await response.json()
    setToken(data.access_token)
    localStorage.setItem("token", data.access_token)
    localStorage.setItem("username", username)
    }
  }

  //Get all/search jobs function
  const fetchJobs = async () => {
    const response = await fetch(`http://127.0.0.1:8000/jobs?search=${search}&status=${searchstatus}&skip=${(page-1)*limit}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (!response.ok) {
      alert("Fetch Failed!")
      return
    }
    if (response.ok) {
      const data = await response.json()
      setJobs(data.jobs)
      setTotal(data.total)
    }
  }

  //Add new or update job function
  const addOrUpdateJob = async () => {
    const url = editingId
      ? `http://127.0.0.1:8000/jobs/${editingId}`
      : "http://127.0.0.1:8000/jobs"

    const method = editingId ? "PUT" : "POST"

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: title,
        company: company,
        status: status
      })
    })
    if (!response.ok) {
      alert("Create/Update Failed!")
      return
    }
    if (response.ok) {
      setTitle("")
      setCompany("")
      setEditingId(null)
      setStatus("")
      fetchJobs()
    }
  }

  const startEdit = (job) => {
    setTitle(job.title)
    setCompany(job.company)
    setStatus(job.status)
    setEditingId(job.id)
  }
  
  //Delete function
  const deleteJob = async(id) => {
    const response = await fetch(`http://127.0.0.1:8000/jobs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
      if (!response.ok) {
        alert("Delete Failed!")
        return
      }
      if (response.ok){
        fetchJobs()
        alert("Job removed successfully.")
      }
  }
  
return (

<div className="overflow-hidden w-full max-h-screen bg-zinc-950 text-white flex flex-row font-mono">

  {token && (
  <div className="w-1/6 h-screen min-w-60 pt-6 bg-zinc-900 flex flex-col">
    
    <div className= "max-w-40 min-h-[20rem] mx-auto rounded-full object-fill flex flex-col justify-evenly">
      <img className= "rounded-full object-cover" src={profile}></img>
      <h3 className= "overflow-hidden font-semibold">{username}</h3>
      <button className="p-2 rounded w-full mb-2 bg-white/5 hover:bg-white/10 active:bg-orange-700" onClick={() => {localStorage.removeItem("token")
                                                                                                                          localStorage.removeItem("username")
                                                                                                                          setToken("")
                                                                                                                          setUsername("")
                                                                                                                          setJobs([])
                                                                                                                          setPage(1)
                                                                                                                          setTotal(0)
                                                                                                                          }}>Logout</button>
    </div>
    <div className=" border-white border-b-2 my-4 mx-20"></div>
    <div className="flex flex-col">
      <span className=" p-2 w-full text-center hover:bg-white/5 cursor-pointer active:bg-orange-700">Job Tracker</span>
      <span className=" p-2 w-full text-center hover:bg-white/5 cursor-pointer active:bg-orange-700">Job Analyzer</span>
      <span className=" p-2 w-full text-center hover:bg-white/5 cursor-pointer active:bg-orange-700">Project 2</span>
      <span className=" p-2 w-full text-center hover:bg-white/5 cursor-pointer active:bg-orange-700">Project 3</span>
      <span className=" p-2 w-full text-center hover:bg-white/5 cursor-pointer active:bg-orange-700">Project 4</span>
      <span className=" p-2 w-full text-center hover:bg-white/5 cursor-pointer active:bg-orange-700">Project 5</span>
    </div>
  </div>
  )}

  {!token && (
  <div className="w-1/6 h-screen min-w-60 pt-6 bg-zinc-900 flex flex-col">
    <div className="w-full min-h-[20rem] flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-4 font-mono">Login</h2>

      <input className="bg-white/5 p-2 w-full text-center focus:bg-white/10 focus:outline-none" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input className="bg-white/5 p-2 w-full text-center focus:bg-white/10 focus:outline-none" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      
      <button className="bg-white/5 p-2 mt-2 w-full hover:bg-white/5" onClick={() => {login(),
                                                                                          setPassword("")}}>Login</button>
    </div>
  </div>
  )}
    
  <div className="w-full flex flex-col">

    <div className="w-full flex flex-row items-end">

      <div className="w-1/3 min-w-fit flex flex-col">

        <div className="">
          <h1 className="mr-auto bg-zinc-900 py-6 pl-6 pr-24 text-start font-mono">Job Tracker</h1>
        </div>

        <div className="flex flex-row justify-start w-full h-full">

          <div className="flex flex-col w-full ml-4 mr-2">
            <input className="p-2 rounded bg-zinc-800 focus:bg-white/5 focus:outline-none" type="text"  placeholder = "Job Title" value = {title} onChange = {(e) => setTitle(e.target.value)}/>
            <input className="p-2 rounded my-2 bg-zinc-800 focus:bg-white/5 focus:outline-none" type="text" placeholder = "Company Name" value = {company} onChange = {(e) => setCompany(e.target.value)}/>
              
            <select className="p-2 rounded bg-zinc-800 outline outline-none " name="status" id="status" value = {status} onChange = {(e) => setStatus(e.target.value)}>
              <option value="applied">Applied</option>
              <option value="rejected">Rejected</option>
              <option value="interview">Interview</option>
            </select>
          </div>
          
          <div className="flex pr-4 border-r-2">
            {editingId &&(<button className=" px-6 py-2 rounded bg-zinc-800 hover:bg-white/5 active:bg-orange-700" onClick={addOrUpdateJob}>Update Job</button>)}
            {!editingId &&(<button className=" px-6 py-2 rounded bg-zinc-800 hover:bg-white/5 active:bg-orange-700" onClick={addOrUpdateJob}>Create Job</button>)}
          </div>

        </div>
        
      </div>

      <div className="w-2/3 flex flex-col flex-auto h-full justify-end items-start mx-4">
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
    </div>

    <div className="w-full">
        {!token && (
        <div className="flex justify-center items-center mt-4 mb-2">
          <button className="bg-orange-700 px-3 py-1 rounded disabled:bg-white/5" disabled>Prev</button>
          <span className="hover:cursor-default text-sm mx-2">Page 0 of 0</span>
          <button className="bg-orange-700 px-3 py-1 rounded disabled:bg-white/5" disabled>Next</button>
        </div>
        )}
        {token &&(
        <div className="flex justify-center items-center mt-4 mb-2">
          <button className="bg-orange-700 px-3 py-1 rounded disabled:bg-white/5" onClick={() => setPage(prev => Math.max(prev-1, 1))} disabled={page === 1}>Prev</button>
          <span className="hover:cursor-default text-sm mx-2">Page {page} of {Math.max(1, Math.ceil(total / limit))}</span>
          <button className="bg-orange-700 px-3 py-1 rounded disabled:bg-white/5" onClick={() => setPage(prev => Math.min(prev+1, Math.ceil(total / limit)))} disabled={page === Math.ceil(total / limit)}>Next</button>
        </div>
        )}

        <ul className="m-4 grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {jobs.map((job) => (
            
            <li key = {job.id} className="bg-zinc-900 rounded p-4 hover:bg-white/10">

              <div className="flex justify-between items-center">
                <div className="w-2/3 flex flex-col items-start overflow-hidden">
                  <p title={job.title} className="cursor-default text-xl">{job.title}</p>
                  <p className="cursor-default text-base ">{job.company}</p>
                  <p className="cursor-default text-sm mt-1">Status: {job.status}</p>  
                </div>
                <div className="flex flex-col items-end w-1/3 space-y-2">
                  <div className="flex flex-row w-full justify-end space-x-2">
                    {!editingId &&(<button className="bg-zinc-800 px-2 py-1 rounded hover:bg-white/10" onClick={() => startEdit(job)}>Edit</button>)}
                    {editingId && (<button className="bg-zinc-800 px-2 py-1 rounded hover:bg-white/10" onClick={() => { setEditingId(null)
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
    </div>

  </div>
</div>
  )
}

export default App