function Profile(props){
    const user=props.user;

    return<div>
        <h1>{user.firstName} {user.lastName}</h1>
    </div>
}

export default Profile;