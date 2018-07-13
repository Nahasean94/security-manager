const login = `
   mutation($email:String!,$password:String!) {
  login(email:$email,password:$password) {
    token
    ok
    error
  }
}
`
const addLocation = `
   mutation($name:String!) {
  addLocation(name:$name) {
    id
    name
  }
}
`
const signup = `
   mutation($username:String!,$email:String!,$password:String!) {
  signup(username:$username,email:$email,password:$password) {
   id
  }
}
`
const registerGuard = `
   mutation($guard_id:Int!,$surname:String,$first_name:String!,$last_name:String!, $dob:String!,$gender:String!,$nationalID:Int!,$employment_date:String!, $password:String!,$email:String!,$cellphone:Long!,$postal_address:String, $location:ID!, $contract:String!,$gross:Int!,$paye:Int,$nssf:Int,$nhif:Int,$loans:Int, $others:Int){          
  registerGuard(guard_id:$guard_id,surname:$surname,first_name:$first_name,last_name:$last_name, dob:$dob,gender:$gender,nationalID:$nationalID,employment_date:$employment_date, password:$password,email:$email,cellphone:$cellphone,postal_address:$postal_address, location:$location,contract:$contract,gross:$gross,paye:$paye,nssf:$nssf,nhif:$nhif,loans:$loans,others:$others){
        id
    }
}
`
const isLocationExists = `
   mutation($name:String!) {
  isLocationExists(name:$name) {
   exists
  }
}
`
const uploadProfilePicture = `
   mutation($file:Upload!) {
  uploadProfilePicture(file:$file) {
   uploaded
  }
}
`
const locations=`
{
locations{
id
name
}
}`
const person=`
query($id:ID!){
person(id:$id){
username
email
role
profile_picture
date_joined
address
}
}`

const findGuardsInLocation=`
query($id:ID!){
findGuardsInLocation(id:$id){
id
guard_id
first_name
email
password
}
}`
const signin=`
mutation($guard_id:Int!,$signin:String!,$date:String!){
signin(guard_id:$guard_id,signin:$signin,date:$date){
id
guard_id
signin
date
}
}`
const signout=`
mutation($guard_id:Int!,$signout:String!,$date:String!){
signout(guard_id:$guard_id,signout:$signout,date:$date){
id
guard_id
signin
signout
date
}
}`

export {
    addLocation,
    locations,
    registerGuard,
    signup,
    isLocationExists,
    login,
    findGuardsInLocation,
    person,
    signin,
    signout
}
