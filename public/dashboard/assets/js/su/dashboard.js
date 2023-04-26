let us = localStorage.getItem("num_users")
var ss = localStorage.getItem("num_assistance")

if(us != ""){
    document.getElementById("numStd").innerHTML = us
    document.getElementById("list-outline").innerHTML = ss
    countStudent()
}else{
    countStudent()
}

function countStudent(){
    let users = 0
    db.collection("users").get().then((querySnapshot) => {    
        querySnapshot.forEach(data => {
            users++
               })
               document.getElementById("numStd").innerHTML = users
               localStorage.setItem("num_users",users)
            })
            countAssistance()
}

function countAssistance(){
    let ss = 0
    db.collection("assistance").get().then((querySnapshot) => {    
        querySnapshot.forEach(data => {
            ss++
               })
               document.getElementById("list-outline").innerHTML = ss
               localStorage.setItem("num_assistance",ss)
            })
            
}