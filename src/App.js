import logo from './logo.svg';
import './App.css';
import JoblyApi from "./api"
import { useEffect, useState } from 'react';
import NavBar from './NavBar';
import HomePage from './Home';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ListPage from './ListPage';
import Company from './Company';
import LoginForm from './reglogin';
import EditForm from './editUser';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [companies, setCompanies] = useState();
  const [jobs, setJobs] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    async function getData(){
      JoblyApi.setToken(JSON.parse(localStorage.getItem("token")));
      setLoading(true);
      const comps = await JoblyApi.request("companies");
      const jobs = await JoblyApi.request("jobs");
      setCompanies(comps.companies);
      setJobs(jobs.jobs);
      console.log(comps.companies,jobs.jobs);
      setLoading(false);
    };
    getData();
  },[])

  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(JoblyApi.token));
  }, [user])

  async function getCompany(handle){
    try {
      const company = await JoblyApi.request(`companies/${handle}`);
      return(company.company);
    } catch(err){
      navigate("/");
      return err; 
    }
  }

  async function searchComps(data){
    let searchD={};
    for(let i in data){
      searchD=data[i]!=""?{...searchD,[i]:data[i]}:searchD;
    }
    const results = await JoblyApi.request('companies', searchD);
    return results.companies;
  }

  async function searchJobs(data){
    let searchD={};
    for(let i in data){
      searchD=data[i]!=""?{...searchD,[i]:data[i]}:searchD;
    }
    const results = await JoblyApi.request('jobs', searchD);
    return results.jobs;
  }

  async function logreg(hasAccount, data){
    console.log("run");
    if(hasAccount){
      console.log("has account");
      try{
        const user = await JoblyApi.reAuth(data);
        setUser(user.user)
        return navigate("/");
      } catch(err){
        return err;
      }
    }else{
      try{
        const user = await JoblyApi.register(data);
        setUser(user.user)
        return navigate("/");
      } catch(err){
        return err;
      }
    }
  }
  async function test(){
    console.log(JoblyApi.token);
  }
  const logout = () =>{
    JoblyApi.logout();
    setUser(null);
    navigate("/");
  }
  const edit = async (data)=>{
    try{
      await JoblyApi.reAuth({username:data.username, password:data.password});
      console.log("passed auth");
      const user = await JoblyApi.edit(data);
      setUser(user);
      navigate("/");
      return("Edits made successfully");
    }catch(err){
      return(err);
    }
  }
  const apply= async(evt, job_id)=>{
    const result = JoblyApi.apply(user.username, job_id);
    setUser(newUser=>({...user,applications:[...user.applications,job_id]}));
    return result;
  }
  const loginprops={sub:logreg, test:test};

  if(loading){
    return <img src='./loading.gif'></img>
  }
  return (
    <div>
      <NavBar logout={logout} user={user}/>
      <main>
      <Routes>
        <Route exact path="/" element={<HomePage log={loginprops} user={user}/>}></Route>
        <Route exact path="/login" element={<LoginForm sub={logreg} test={test}/>}/>
        <Route exact path="/companies" element={<ListPage user={user} get={searchComps} companies={companies}/>}></Route>
        <Route path="/companies/:handle" element={<Company user={user} apply={apply} get={getCompany}/>}></Route>
        <Route exact path="/jobs" element={<ListPage user={user} click={apply} get={searchJobs} jobs={jobs}/>}></Route>
        <Route path="/user/edit" element={<EditForm jobs={jobs} user={user} sub={edit}/>}/>
      </Routes>
      </main>
    </div>
  )
}

export default App;
