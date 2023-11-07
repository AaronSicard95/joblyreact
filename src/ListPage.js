import { useState } from "react";
import Card from "./Card";
import Search from "./searchBar";
import {v4 as uuid} from 'uuid';
import { useNavigate } from "react-router-dom";

function ListPage(props){
    //{props.jobs?props.jobs.map(j=>(<Card title={j.title} salaray={j.salaray} equity={j.equity}/>)):
    const [comps , setComps] = useState(props.companies);
    const [jobs, setJobs] = useState(props.jobs);
    const navigate = useNavigate();
    //if(comps!=props.companies)setComps(props.companies);
    //if(jobs!=props.jobs)setJobs(props.jobs);
    if(!props.companies&&comps){
        setComps(props.companies);
        setJobs(props.jobs);
    }else if(!props.jobs&&jobs){
        setComps(props.companies);
        setJobs(props.jobs);
    }
    const search = async (evt, fData) => {
        evt.preventDefault();
        let data = {};
        console.log(fData);
        for(let i in fData){
            data = i!=""||undefined?{...data,[i]:fData[i]}:data;
        }
        const result = await props.get(data);
        if(comps){
            setComps(result);
        }else if(jobs){
            setJobs(result);
        }
    }
    const compClick=(evt, handle)=>{
        return navigate(handle);
    }
    const jobClick=(evt,id)=>{
        return navigate(id);
    }
    return<div>
        <Search companies={comps} jobs={jobs} sub={search}/>
        {comps?comps.map(c=>(<Card title={c.name} handle={c.handle} description={c.description} id={uuid()} button={{name: "See More", click:evt=>compClick(evt,c.handle)}}/>)):null}
        {jobs?jobs.map(j=>(<Card title={j.title} compName={j.companyName} salary={`Salary: $${j.salary}`} equity={`EQ: ${j.equity!=null?j.equity:"0"}`} id={uuid()} button={!props.user.applications.includes(j.id)?{name: "Apply", click:evt=>props.click(evt,j.id), disabled:false}:{name: "Already Applied",click:evt=>{evt.preventDefault()},disabled: true}}/>)):null}
    </div>
}

export default ListPage;