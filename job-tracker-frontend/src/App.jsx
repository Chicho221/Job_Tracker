import {use, useState} from "react"
import {useEffect} from "react"

import JobList from "./components/JobList"
import Pagination from "./components/Pagination"
import SideBar from "./components/Sidebar"
import JobForm from "./components/JobForm"
import SearchBar from "./components/SearchBar"
import Dashboard from "./components/Dashboard"
import Sort from "./components/Sort"
import API_BASE from "./api"

function App() {
  const [jobs, setJobs] = useState([])
  const [title, setTitle] = useState("")
  const [company, setCompany] = useState("")
  const [status, setStatus] = useState("applied")
  const [newusername, setNewusername] = useState("")
  const [newpassword, setNewpassword] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [token, setToken] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [search, setSearch] = useState("")
  const [searchstatus, setSearchStatus] = useState("")
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState("newest")
  const [loading, setLoading] = useState({
    login: false,
    register: false,
    create_job: false,
    delete_user: false,
    logout: false,
    add_update_job: false
  })
  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    interview: 0,
    rejected: 0
  })

  //Get user width and set limit for jobs display
  const getLimit = () => {
    const width = window.innerWidth

    if (width < 640) return 5       // Mobile
    if (width < 1024) return 8      // Tablet
    return 8                       // Desktop
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
      setStats(0,0,0,0)
      setSort("newest")
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
      fetchStats()
    }
  }, [token, page, limit, search, searchstatus, sort])

  //On effects change page number
  useEffect(() => {
    setPage(1)
  }, [limit, search, searchstatus, sort])

  //On resize change limit
  useEffect(() => {
    const handleResize = () => {
      setLimit(getLimit())
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  //Change loading state
  function updateLoading(state, value) {
  setLoading(prevLoading => ({
    ...prevLoading,
    [state]: value
  }));
  }

  //Login function
  const login = async () => {
    updateLoading("login", true)
    
    const formData = new URLSearchParams()
    formData.append("username", username)
    formData.append("password", password)
    
    const response = await fetch(`${API_BASE}/login`,{
      method: "POST",
      body: formData
    })
    if (!response.ok) {
      updateLoading("login", false)
      alert("Login Failed!")
      return
    }
    if (response.ok) {
    const data = await response.json()
    setToken(data.access_token)
    localStorage.setItem("token", data.access_token)
    localStorage.setItem("username", username)
    updateLoading("login", false)
    }
    
  }

  //Create new user
  const createUser = async () => {
    updateLoading("register", true)

    if (!newusername || !newpassword) {
    alert("Username and password are required!")
      updateLoading("register", false)
    return
    }

    const response = await fetch(`${API_BASE}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: newusername,
        password: newpassword
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      if(Array.isArray(errorData.detail)) {
        alert(errorData.detail.map(e => e.msg).join(", "))
        updateLoading("register", false)
      }else {
        alert(errorData.detail || "Registration failed!")
        updateLoading("register", false)
      }
      updateLoading("register", false)
      return
    }
    setNewusername("")
    setNewpassword("")
    updateLoading("register", false)
    alert("User created!")
  }

  //Get all/search jobs function
  const fetchJobs = async () => {
    const response = await fetch(`${API_BASE}/jobs?search=${search}&status=${searchstatus}&skip=${(page-1)*limit}&limit=${limit}&sort=${sort}`, {
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
      ? `${API_BASE}/jobs/${editingId}`
      : `${API_BASE}/jobs`

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
    updateLoading("add_update_job", true)
    if (!response.ok) {
      alert("Create/Update Failed!")
      updateLoading("add_update_job", false)
      return
    }
    if (response.ok) {
      setTitle("")
      setCompany("")
      setEditingId(null)
      setStatus("applied")
      fetchJobs()
      fetchStats()
      updateLoading("add_update_job", false)
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
    const response = await fetch(`${API_BASE}/jobs/${id}`, {
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

  //Delete user function
  const deleteUser = async() => {
    updateLoading("delete_user", true)    

    if (!window.confirm("Are you sure you want to delete your account?")) {
      updateLoading("delete_user", false)
    return false
    }

    const response = await fetch(`${API_BASE}/users/current`,{
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
      if (!response.ok) {
        alert("Delete user Failed!")
        updateLoading("delete_user", false)
        console.log(loading.delete_user)
        return false
      }
      if (response.ok) {
        updateLoading("delete_user", false)
        return true
      }
  }

  //Fetch stats function
  const fetchStats = async() => {
    const response = await fetch(`${API_BASE}/jobs/stats`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
      if (!response.ok) {
        alert("Stats Fetch Failed!")
        return
      }
    const data = await response.json()
    setStats(data)
  }
return (

<div className="overflow-hidden w-full max-h-screen bg-zinc-950 text-white flex flex-row font-mono">
  
  <SideBar
    token={token}
    deleteUser={deleteUser}
    setToken={setToken}
    createUser={createUser}
    login={login}
    password={password}
    newpassword={newpassword}
    username={username}
    newusername={newusername}
    setNewusername={setNewusername}
    setNewpassword={setNewpassword}
    setUsername={setUsername}
    setPassword={setPassword}
    setJobs={setJobs}
    setPage={setPage}
    setTotal={setTotal}
    loading={loading}
  />

  <div className="w-screen max-w-screen flex flex-col">
    <div className="p-4 h-1/3 flex flex-row items-end bg-zinc-900">

      <JobForm
      token={token}
      title={title}
      setTitle={setTitle}
      company={company}
      setCompany={setCompany}
      status={status}
      setStatus={setStatus}
      editingId={editingId}
      addOrUpdateJob={addOrUpdateJob}
      loading= {loading}
      />

      <SearchBar
      token={token}
      search={search}
      searchstatus={searchstatus}
      setSearch={setSearch}
      setSearchStatus={setSearchStatus}
      />

      <Dashboard stats={stats}/>

    </div>
    <div className="flex-auto w-full bg-zinc-800">
      <div className="grid grid-cols-3 p-2">
        <Sort
        token={token}
        sort={sort}
        setSort={setSort}
        />

        <Pagination
          token={token}
          page={page}
          total={total}
          limit={limit}
          setPage={setPage}
        />
      </div>
      <JobList
        token={token}
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