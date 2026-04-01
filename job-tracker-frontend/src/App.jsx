import {use, useState} from "react"
import {useEffect} from "react"

import JobList from "./components/JobList"
import Pagination from "./components/Pagination"
import SideBar from "./components/Sidebar"
import JobForm from "./components/JobForm"
import SearchBar from "./components/SearchBar"


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
    const response = await fetch("http://127.0.0.1:8000/login",{
      method: "POST",
      body: formData
    })
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
  
  <SideBar
    token={token}
    login={login}
    password={password}
    username={username}
    setToken={setToken}
    setUsername={setUsername}
    setPassword={setPassword}
    setJobs={setJobs}
    setPage={setPage}
    setTotal={setToken}
  />

  <div className="w-full flex flex-col">
    <div className="w-full flex flex-row items-end">
      <JobForm
      title={title}
      setTitle={setTitle}
      company={company}
      setCompany={setCompany}
      status={status}
      setStatus={setStatus}
      editingId={editingId}
      addOrUpdateJob={addOrUpdateJob}
      />

      <SearchBar
      search={search}
      searchstatus={searchstatus}
      setSearch={setSearch}
      setSearchStatus={setSearchStatus}
      />
    </div>
    <div className="w-full">
      <Pagination
        token={token}
        page={page}
        total={total}
        limit={limit}
        setPage={setPage}
      />

      <JobList
        jobs={jobs}
        editingId={editingId}
        startEdit={startEdit}
        deleteJob={deleteJob}
        setEditingId={setEditingId}
        setTitle={setTitle}
        setCompany={setCompany}
        setStatus={setStatus}
      /> 
    </div>

  </div>
</div>
  )
}

export default App