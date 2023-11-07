const { useState } = require("react")

function Search(props){
    const [fData, setFData] = useState(props.companies?{name:"",minEmployees:"",maxEmployees:""}:{title:"",minSalary:"",hasEquity:""});
    const [type, setType] = useState();

    if(props.companies&&type!="comp"){
        setFData({name:"",minEmployees:"",maxEmployees:""});
        setType("comp")
    } else if(props.jobs&&type!="jobs"){
        setFData({title:"",minSalary:"",hasEquity:""});
        setType("jobs")
    }

    const handleChange = (evt) =>{
        const {id, value} = evt.target;
        setFData(newFData=>({...fData,[id]:value}))
    }

    console.log(fData);
    if(props.companies){;
        return <form onChange={handleChange} onSubmit={evt=>props.sub(evt, fData)}>
            <label htmlFor="name">Name: </label>
            <input id="name" type="text" value={fData.name}></input>
            <label htmlFor="minEmployees">Minimum Employees: </label>
            <input id="minEmployees" type="number" value={fData.minEmployees}></input>
            <label htmlFor="maxEmployees">Maximum Employees: </label>
            <input id="maxEmployees" type="number" value={fData.maxEmployees}></input>
            <button>Search</button>
        </form>
    } else if(props.jobs) {
        return <form onChange={handleChange} onSubmit={evt=>props.sub(evt, fData)}>
            <label htmlFor="title">Title: </label>
            <input id="title" type="text" value={fData.title}></input>
            <label htmlFor="minSalary">Minimum Salary: </label>
            <input id="minSalary" type="number" value={fData.minSalary}></input>
            <label htmlFor="hasEquity">Has Equity?: </label>
            <select id="hasEquity" type="number" value={fData.hasEquity}>
                <option value="">Both</option>
                <option value={true}>Yes</option>
            </select>
            <button>Search</button>
        </form>
    }
}

export default Search;