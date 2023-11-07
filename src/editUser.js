import { useNavigate } from "react-router-dom";

const { useState } = require("react");

function EditForm(props){
    const user = props.user;
    const navigate = useNavigate();
    const [fData, setFData] = useState(user?{firstName:user.firstName, lastName:user.lastName, password:"", username:user.username}:{firstName:"", lastName:"", password:"", username:""});

    const handleChange=(evt)=>{
        const {id, value} = evt.target;
        setFData(newFData=>({...fData,[id]: value}));
    }

    const handleSub=async (evt)=>{
        evt.preventDefault();
        const result = await props.sub(fData);
        alert(result);
    }

    return<div> 
    <form onChange={handleChange} onSubmit={handleSub}>
        <h1>{fData.username}</h1>
        <label htmlFor="firstName">First Name: </label>
        <input id="firstName" type="text" value={fData.firstName}></input>
        <br/>
        <label htmlFor="lastName">Last Name: </label>
        <input id="lastName" type="text" value={fData.lastName}></input>
        <br/>
        <label htmlFor="password">First Name: </label>
        <input id="password" type="password" value={fData.password}></input>
        <br/>
        <button>Save Changes</button>
    </form>
    <h2>Applications</h2>
    <ul>
        {props.jobs.map(j=>(user.applications.includes(j.id)?<li><h4>{j.title}</h4><p>{`$${j.salary}`}</p></li>:null))};
    </ul>
    </div>
}

export default EditForm;