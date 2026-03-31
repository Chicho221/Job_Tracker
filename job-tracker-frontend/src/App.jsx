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

  useEffect(() => {
    const savedToken = localStorage.getItem("token")
    if (savedToken) {
      setToken(savedToken)
    }
    if (token) {
      fetchJobs()
    }
  },[search,searchstatus])

  //Login function
  const login = async () => {
    const formData = new URLSearchParams()
    formData.append("username", username)
    formData.append("password", password)

    const response = await fetch("http://127.0.0.1:8000/login",{
      method: "POST",
      body: formData
    })

    const data = await response.json()

    setToken(data.access_token)
    localStorage.setItem("token", data.access_token)
  }

  //Get all/search jobs function
  const fetchJobs = async () => {
    const response = await fetch(`http://127.0.0.1:8000/jobs?search=${search}&status=${searchstatus}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.ok) {
      const data = await response.json()
      setJobs(data)
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

<div>
  <h2>Login</h2>

  <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
  <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
  
  <button onClick={login}>Log In</button>
  <h1>Job Tracker</h1>
    <button onClick={fetchJobs}>Load Jobs</button>

    <h2>Add Job</h2>
      <input type="text" placeholder = "Job Title" value = {title} onChange = {(e) => setTitle(e.target.value)}/>
      <input type="text" placeholder = "Company Name" value = {company} onChange = {(e) => setCompany(e.target.value)}/>

      <select name="status" id="status" value = {status} onChange = {(e) => setStatus(e.target.value)}>
        <option value="applied">Applied</option>
        <option value="rejected">Rejected</option>
        <option value="interview">Interview</option>
      </select>

      <button onClick={addOrUpdateJob}>Create</button>

    <h2>Search</h2>
      <input placeholder="Search by: Title, Company" value={search} onChange={(e) => setSearch(e.target.value)}/>
      <button onClick={() => {fetchJobs();setSearch("");}}>Search</button>
      <select value = {searchstatus} onChange = {(e) => setSearchStatus(e.target.value)}>
        <option value="" default>All</option>
        <option value="applied">Applied</option>
        <option value="rejected">Rejected</option>
        <option value="interview">Interview</option>
      </select>
      
      <ul>
        {jobs.map((job) => (
          <li key = {job.id}>
            {job.title} - {job.company} - {job.status} 

            <button onClick={() => startEdit(job)}>Edit</button>

            {editingId && (<button onClick={() => { setEditingId(null), setTitle(""), setCompany(""), setStatus("")}}>Cancel</button>)}

            <button onClick={() => deleteJob(job.id)}>Delete</button>
          </li>
        ))}
      </ul>


</div>
  )
}

export default App