import requireAuth from "../components/utils/requireAuth"

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
const updateLocation = `
   mutation($id:ID!,$name:String!) {
  updateLocation(id:$id,name:$name) {
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
   mutation($guard:ID,$file:Upload!) {
  uploadProfilePicture(guard:$guard,file:$file) {
   id
   profile_picture
  }
}
`
const locations = `
{
locations{
id
name
}
}`
const person = `
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

const findGuardsInLocation = `
query($id:ID!){
findGuardsInLocation(id:$id){
id
guard_id
first_name
email
password
gender
first_name
last_name
}
}`
const signin = `
mutation($guard_id:Int!,$signin:String!,$date:String!){
signin(guard_id:$guard_id,signin:$signin,date:$date){
id
guard_id
signin
date
}
}`
const signout = `
mutation($guard_id:Int!,$signout:String!,$date:String!){
signout(guard_id:$guard_id,signout:$signout,date:$date){
id
guard_id
signin
signout
date
}
}`
const newMessage = `
mutation($author:String!,$body:String!,$account_type:String!,$message_type:String!){
  newMessage(author:$author,body:$body,account_type:$account_type,message_type:$message_type){
    id
    author{
      username
      profile_picture
    }
    body
    timestamp
    replies{
      id
    author{
      username
      profile_picture
    }
    body
    timestamp
    }
    
  }
}`

const getInbox = `
query($guard_id:String!){
    getInbox(guard_id:$guard_id){
        id
        body
        author{
            username
            profile_picture
                }
        timestamp
        message_type
        title
    }
}`

const getAllInbox = `
{
    getAllInbox{
        id
        body
        author{
            username
            profile_picture
                }
        timestamp
        message_type
        title
    }
}`

const getAllGuards = `
{
    getAllGuards{
        id
       guard_id
       first_name
       last_name
       gender
       location{
       name
       }
    }
}`
const getAllLocations = `
{
    getAllLocations{
        id
      name
    }
}`
const getMessage = `
query($id:ID!){
    getMessage(id:$id){
        id
        body
        author{
            username
            profile_picture
                }
                replies{
                body
                timestamp
                author{
                username
                profile_picture
                }
                }
        timestamp
        message_type
        title
    }
}`
const newMessageReply = `
mutation($message:ID!,$author:String,$account:String!,$body:String!){
    newMessageReply(message:$message,author:$author,account:$account,body:$body){
      id
    author{
      username
      profile_picture
    }
    body
    timestamp
      }
}`

const newCustomMessage = `
mutation($author:String!,$body:String!,$account_type:String!,$message_type:String!,$title:String!){
    newCustomMessage(author:$author,body:$body,account_type:$account_type,message_type:$message_type,title:$title){
       id
        body
        author{
            username
            profile_picture
                }
                replies{
                body
                timestamp
                author{
                username
                profile_picture
                }
                }
        timestamp
        message_type
        title
      }
}`
const getGuardAttendance = `
query($guard_id:String!){
    getGuardAttendance(guard_id:$guard_id){
       id
       signin
       signout
       date
       guard_id
      }
}`
const getAllGuardsAttendance = `
{
    getAllGuardsAttendance{
       id
       signin
       signout
       date
       guard_id
      }
}`
const getGuardInfo = `
query($guard_id:String!){
getGuardInfo(guard_id:$guard_id){
id
surname
profile_picture
timestamp
guard_id
first_name
last_name
dob
gender
nationalID
employment_date
}
}
`


const getGuardContactInfo = `
query($guard_id:String!){
getGuardContactInfo(guard_id:$guard_id){
id
email
postal_address
cellphone
location{
name
}
}
}
`
const getGuardPaymentInfo = `
query($guard_id:String!){
getGuardPaymentInfo(guard_id:$guard_id){
id
guard_id
contract
deductions{
name
amount
}
transactions{
timestamp
amount
text
}
gross_salary
}
}
`
const confirmPassword = `
    query($guard:ID!,$password:String!){
  confirmPassword(guard:$guard,password:$password) {
   confirmed
  }
}
`
const changePassword = `
    query($guard:ID!,$password:String!){
  changePassword(guard:$guard,password:$password) {
   confirmed
  }
}
`
const updateGuardBasicInfo = `
   mutation($id:ID!,$guard_id:String!,$surname:String,$first_name:String!,$last_name:String!, $dob:String!,$gender:String!,$nationalID:Int!,$employment_date:String!) {
  updateGuardBasicInfo(id:$id,guard_id:$guard_id,surname:$surname,first_name:$first_name,last_name:$last_name, dob:$dob,gender:$gender,nationalID:$nationalID,employment_date:$employment_date) {
  id
 guard_id
 surname
 first_name
 last_name
  dob
  gender
  nationalID
  employment_date
   }
}
`
const updateGuardContactInfo = `
   mutation($id:ID!,$email:String!,$cellphone:Long!,$postal_address:String) {
  updateGuardContactInfo(id:$id,email:$email,cellphone:$cellphone,postal_address:$postal_address) {
  id
 email
 cellphone
 postal_address
   }
}
`
export {
    addLocation,
    updateLocation,
    locations,
    registerGuard,
    signup,
    isLocationExists,
    login,
    findGuardsInLocation,
    person,
    signin,
    signout,
    newMessage,
    uploadProfilePicture,
    getAllGuards,
    updateGuardContactInfo,
    confirmPassword,
    updateGuardBasicInfo,
    changePassword,
    getInbox,
    getAllInbox,
    getMessage,
    newMessageReply,
    newCustomMessage,
    getGuardAttendance,
    getAllGuardsAttendance,
    getGuardInfo,
    getGuardPaymentInfo,
    getGuardContactInfo,
    getAllLocations

}
