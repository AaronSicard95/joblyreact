import LoginForm from "./reglogin";

function HomePage(props){
    console.log("Home");
    return <div>
        <h1>Welcome to Jobly</h1>
        <h3>{props.user?`Hello ${props.user.firstName}`:<LoginForm {...props.log}/>}</h3>
    </div>
}

export default HomePage;