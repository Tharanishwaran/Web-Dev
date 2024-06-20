function UserGreeting(props) {


  if (props.isLoggedin) {
    
        return <h2 className="welcome-msg" > Welcome {props.username}</h2>
  }

  else{

   return <h2 className="login-msg">please log in </h2>

  }    
}

UserGreeting.proptypes = {

   isLoggedin: propTypes.bool,
   username: propTypes.string,


}

export default UserGreeting