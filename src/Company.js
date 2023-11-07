import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Company(props){
    const {handle} = useParams();
    const [company, setCompany] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function getComp(){
            const comp = await props.get(handle);
            setCompany(comp);
            setLoading(false);
        }
        getComp();
    },[])

    if(!loading){
    return <div>
        <h1>{company.name}</h1>
        <img src={company.logoUrl}></img>
        <br/>
        <h4>Handle: {company.handle}</h4>
        <p>{company.description}</p>
        <br/>
        <p>employees: {company.numEmployees}</p>
        <ul>
            {company.jobs?company.jobs.map(j=>(<li key={j.id}><h4>{j.title}</h4><p>${j.salary}</p>{!props.user.applications.includes(j.id)?<button onClick={evt=>props.apply(evt,j.id)}>Apply</button>:<button disabled>Already Applied</button>}</li>)):null}
        </ul>
    </div>
    }else{
        return <img src="./loading.gif"></img>
    }
}

export default Company;