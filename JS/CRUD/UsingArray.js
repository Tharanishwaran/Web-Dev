


let users = []

 function createuser(user) {

    users.push(user);
 }

 function readusers(){
    return "Hi " + users;
 }

 createuser("akash")

 console.log(readusers())



