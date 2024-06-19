import profilePic from './assets/react.svg'


function Card() {
    
 return(

<div className="card">

    <img className='card-img' src={profilePic} alt="profile picture"></img>
    <h1>Backend Developer</h1>
    <p>I create a Backend in java spring boot and nodejs</p>
    


 </div>


 );


}


export default Card;