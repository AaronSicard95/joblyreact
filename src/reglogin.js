const { useState } = require("react");

function LoginForm(props){
    const [login, setLogin] = useState(true)
    const [fData, setFData] = useState({username: "", password:""});
    const [submitted, setSubmitted] = useState(false);

    const handleChange=(evt)=>{
        const {id,value} = evt.target;
        setFData(newFData=>({...fData, [id]: value}))
    }

    const handleSub = async (evt) =>{
        evt.preventDefault();
        if(!submitted){
            setSubmitted(true);
            if(!login){
                if(fData.password!=fData.password2){
                    alert("passwords do not match");
                    setSubmitted(false);
                }else{
                    let subData={};
                    for(let i in fData){
                        subData=i!="password2"?{...subData,[i]: fData[i]}:subData;
                    }
                    await props.sub(login, subData);
                    setSubmitted(false);
                }
            }else{
                await props.sub(login, fData);
                setSubmitted(false);
            }
        }
    }

    const change=()=>{
        if(login){
            setLogin(false);
        }else{
            setLogin(true);
        }
    }

    if(login){
        return<div>
            <button onClick={change}>Don't have an Account? Register Here</button> 
            <form onSubmit={handleSub} onChange={handleChange}>
                <label htmlFor="username">Username: </label>
                <input id="username" type="text"></input>
                <br/>
                <label htmlFor="password">Password: </label>
                <input id="password" type="text"></input>
                <br/>
                <button disabled={submitted}>Log In</button>
            </form>
                <button onClick={props.test}>Test</button>
        </div>
    }else{
        return <div>
            <button onClick={change}>Already Have an Account? Login here</button>
            <form onSubmit={handleSub} onChange={handleChange}>
                <label htmlFor="username">Username: </label>
                <input id="username" type="text"></input>
                <br/>
                <label htmlFor="password">Password: </label>
                <input id="password" type="text"></input>
                <br/>
                <label htmlFor="password2">Repeat Password: </label>
                <input id="password2" type="text"></input>
                <br/>
                <label htmlFor="firstName">FirstName: </label>
                <input id="firstName" type="text"></input>
                <br/>
                <label htmlFor="lastName">Last Name: </label>
                <input id="lastName" type="text"></input>
                <br/>
                <label htmlFor="email">Email: </label>
                <input id="email" type="text"></input>
                <br/>
                <button disabled={submitted}>Register</button>
            </form>
                <button onClick={props.test}>Test</button>
        </div>
    }
}

export default LoginForm;