import {useState} from "react"
import {useEffect} from "react"

function App() {
  const [jobs, setJobs] = useState([])
  const [title, setTitle] = useState("")
  const [company, setCompany] = useState("")
  const [status, setStatus] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [token, setToken] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [search, setSearch] = useState("")
  const [searchstatus, setSearchStatus] = useState("")
  const [total, setTotal] = useState(0)
  const [limit] = useState(5)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const savedToken = localStorage.getItem("token")
    if (savedToken) {
      setToken(savedToken)
    }
  },[])
  
  useEffect(() => {
    if (token) {
      fetchJobs()
    }
  }, [token, page, search, searchstatus])

  useEffect(() => {
    setPage(1)
  }, [searchstatus, search, token])

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
    if (response.ok) {
    const data = await response.json()
    setToken(data.access_token)
    localStorage.setItem("token", data.access_token)
    }
  }

  //Get all/search jobs function
  const fetchJobs = async () => {
    const response = await fetch(`http://127.0.0.1:8000/jobs?search=${search}&status=${searchstatus}&skip=${(page-1)*limit}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
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

    if (response.ok) {
      setTitle("")
      setCompany("")
      setEditingId(null)
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
      body: JSON.stringify({
        title: title,
        company: company,
        status: status
      })
    })
      if (response.ok){
        fetchJobs()
      }
  }
return (

<div className="overflow-hidden w-full max-h-screen bg-black/10 text-white flex flex-row">
  <div className="w-1/6 h-screen min-w-60 pt-6 bg-black/30 flex flex-col">
  {token && (
    <div className= "max-w-40 min-h-[20rem] mx-auto rounded-full object-fill flex flex-col justify-evenly">
      <img className= "rounded-full object-cover" src="./src/assets/profile.jpg"></img>
      <h3 className= "overflow-hidden font-semibold">{username}</h3>
      <button className="border p-2 rounded w-full mb-2 hover:bg-white/10 active:bg-orange-700" onClick={() => {localStorage.removeItem("token");setToken("");setJobs([])}}>Logout</button>
    </div>
  )}
  {!token && (
    <div className="w-full min-h-[20rem] flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <input className="bg-white/5 p-2 w-full text-center focus:bg-white/10 focus:outline-none" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input className="bg-white/5 p-2 w-full text-center focus:bg-white/10 focus:outline-none" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      
      <button className="bg-white/5 p-2 mt-2 w-full hover:bg-white/10" onClick={() => {login();fetchJobs()}}>Log In</button>
    </div>
  )}
    <div className=" border-white border-b-2 my-4 mx-20"></div>
    <div className="flex flex-col">
      <span className=" p-2 w-full text-center hover:bg-white/10 cursor-pointer active:bg-orange-700">Home</span>
      <span className=" p-2 w-full text-center hover:bg-white/10 cursor-pointer active:bg-orange-700">Job Tracker</span>
      <span className=" p-2 w-full text-center hover:bg-white/10 cursor-pointer active:bg-orange-700">Project 2</span>
      <span className=" p-2 w-full text-center hover:bg-white/10 cursor-pointer active:bg-orange-700">Project 3</span>
      <span className=" p-2 w-full text-center hover:bg-white/10 cursor-pointer active:bg-orange-700">Project 4</span>
      <span className=" p-2 w-full text-center hover:bg-white/10 cursor-pointer active:bg-orange-700">Project 5</span>
    </div>
  </div>

  <div className="w-5/6 max-auto rounded-2xl shadow p-6">
    
    <h1>Job Tracker</h1>
      <button onClick={fetchJobs}>Load Jobs</button>

      <h2 className="text-xl font-semibold mt-6 mb-2">Add Job</h2>
        <input className="border p-2 rounded w-full mb-2" type="text" placeholder = "Job Title" value = {title} onChange = {(e) => setTitle(e.target.value)}/>
        <input className="border p-2 rounded w-full mb-2" type="text" placeholder = "Company Name" value = {company} onChange = {(e) => setCompany(e.target.value)}/>

        <select className="border p-2 rounded w-full mb-2" name="status" id="status" value = {status} onChange = {(e) => setStatus(e.target.value)}>
          <option value="applied">Applied</option>
          <option value="rejected">Rejected</option>
          <option value="interview">Interview</option>
        </select>

        <button className="border p-2 rounded w-full mb-2" onClick={addOrUpdateJob}>Create</button>

      <h2 className="text-xl font-semibold mt-4">Search</h2>
        <input className="border p-2 rounded w-full mb-2 mt-2" placeholder="Search by: Title, Company" value={search} onChange={(e) => setSearch(e.target.value)}/>
        <button className="border p-2 rounded w-full mb-2" onClick={fetchJobs}>Search</button>
        <select value = {searchstatus} onChange = {(e) => setSearchStatus(e.target.value)}>
          <option value="" default>All</option>
          <option value="applied">Applied</option>
          <option value="rejected">Rejected</option>
          <option value="interview">Interview</option>
        </select>
        <div className="flex justify-between items-center mt-4 mb-2">
          <button className="bg-gray-700 px-3 py-1 rounded" onClick={() => setPage(prev => Math.max(prev-1, 1))} disabled={page === 1}>Prev</button>
          <span className="text-sm">Page {page} of {Math.ceil(total / limit)}</span>
          <button className="bg-gray-700 px-3 py-1 rounded" onClick={() => setPage(prev => Math.min(prev+1, Math.ceil(total / limit)))} disabled={page === Math.ceil(total / limit)}>Next</button>
        </div>
        <ul className="space-y-3">
          {jobs.map((job) => (
            
            <li key = {job.id} className="border rounded p-4 shadow-sm">

              <div className="flex justify-between items-center">
                <div>
                  <p className="flex justify-between items-center">{job.title}</p>
                  <p className="text-sm ">{job.company}</p>
                  <p className="text-xs mt-1">{job.status}</p>  
                </div>
                <div className="space-x-2">
                  <button className="bg-gray-700 px-2 py-1 rounded" onClick={() => startEdit(job)}>Edit</button>
                  {editingId && (<button onClick={() => { setEditingId(null), setTitle(""), setCompany(""), setStatus("")}}>Cancel</button>)}
                </div>
                <div className="bg-red-700 px-2 py-1 rounded">
                  <button onClick={() => deleteJob(job.id)}>Delete</button>
                </div>
              </div>

            </li>
          ))}
        </ul>
  </div>
</div>
  )
}

export default App