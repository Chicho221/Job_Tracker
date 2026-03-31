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

  useEffect(() => {
    const savedToken = localStorage.getItem("token")
    if (savedToken) {
      setToken(savedToken)
    }
  },[])

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

  const fetchJobs = async () => {
    const response = await fetch("http://127.0.0.1:8000/jobs", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.ok) {
      const data = await response.json()
      setJobs(data)
    }
  }

  const addJob = async () => {
    const response = await fetch("http://127.0.0.1:8000/jobs", {
      method: "POST",
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
      setCompany("")
      setTitle("")
      fetchJobs()
    }
  }

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

  const editJob = async(id) => {
    const response = await fetch(`http://127.0.0.1:8000/jobs/${id}`, {
      method: "POST",
      header: {
        Authorization: `Bearer ${token}`
      }
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

      <button onClick={addJob}>Create</button>
      <ul>
        {jobs.map((job) => (
          <li key = {job.id}>
            {job.title} - {job.company} - {job.status} <button onClick={() => deleteJob(job.id)}>Delete</button>
          </li>
        ))}
      </ul>


</div>
  )
}

export default App