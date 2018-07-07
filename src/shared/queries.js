const podcasts = `
    {
  podcasts {
        id
title
description
locations
listens
hosts{
id
username
profile_picture
}
likes{
id
person{
id
}
}
timestamp
coverImage{
path
}
payment{
paid
}
    }
    }
`
const fetchPodcastsByTags = `
   query($id:ID!) {
  fetchPodcastsByTags(id:$id) {
        id
title
description
locations
listens
hosts{
id
username
profile_picture
}
likes{
id
person{
id
}
}
timestamp
coverImage{
path
}
payment{
paid
}
    }
    }
`
const podcast = `
 query podcast($id:ID!){
  podcast(id:$id) {
        id
title
description
locations
listens
hosts{
id
username
profile_picture
}
likes{
id
person{
id
}
}
timestamp
coverImage{
path
}
audioFile{
path
}
payment{
paid
}
    }
    }
`

const fetchProfilePodcasts = `
    {
  fetchProfilePodcasts {
  id
     timestamp
        scope
        uploads {
          id
          path
          }
        likes {
        person{
        id
        }
          id
          }
        body
        author {
            username
            id
            profile_picture
        }
        profile {
        username
        id
        }
        comments{
        id
        body
        author{
        id
        profile_picture
        username
        }
        timestamp
        }
  }
}
`
const getProfileInfo = `
    {
  getProfileInfo {
   username
   role
   email
   first_name
   username
   profile_picture
   twinpals {
   profile_picture
   id
   username
   }
  }
}
`
const fetchHostPodcasts = `
   query fetchHostPodcasts($id:ID!){
  fetchHostPodcasts(id:$id) {
  id
title
description
locations
listens
hosts{
id
username
profile_picture
}
likes{
id
person{
id
}
}
timestamp
coverImage{
path
}
payment{
paid
}

  }
}
`
const fetchUserProfile = `
    query fetchUserProfile($id:ID!)   {
  fetchUserProfile(id:$id) {
  id
  username
  email
  role
  profile_picture
  date_joined
  address
  }
}
`
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
const registerGuardPersonalDetails = `
mutation($guard_id:Int!,$surname:String!,$first_name:String!,$last_name:String!,$dob:String!,$gender:String!,$password:String!,$nationalID:Int!,$employment_date:String!) {
    registerGuardPersonalDetails(guard_id:$guard_id,surname:$surname,first_name:$first_name,last_name:$last_name,dob:$dob,gender:$gender,password:$password,nationalID:$nationalID,employment_date:$employment_date) {
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
const likePodcast = `
   mutation($id:ID!) {
  likePodcast(id:$id) {
     id
title
description
locations
listens
hosts{
id
username
profile_picture
}
likes{
id
person{
id
}
}
timestamp
coverImage{
path
}
audioFile{
path
}
payment{
paid
}
    }
    }
`
const unlikePodcast = `
   mutation($id:ID!) {
  unlikePodcast(id:$id) {
   id
title
description
locations
listens
hosts{
id
username
profile_picture
}
likes{
id
person{
id
}
}
timestamp
coverImage{
path
}
audioFile{
path
}
payment{
paid
}
    }
    }
`
const updatePodcast = `
   mutation($id:ID!,$body:String!) {
  updatePodcast(id:$id,body:$body) {
  id
    timestamp
        scope
        uploads {
          id
          path
          }
        likes {
        person{
        id
        }
          id
          }
        body
        author {
            username
            id
            profile_picture
        }
        profile {
        username
        id
        }
        comments{
        id
        body
        author{
        id
        profile_picture
        username
        }
        timestamp
        }
  }
}
`
const deletePodcast = `
   mutation($id:ID!) {
  deletePodcast(id:$id) {
   id
  }
}
`
const addComment = `
   mutation($podcast_id:ID!,$comment:String!) {
  addComment(podcast_id:$podcast_id,comment:$comment) {
        id
        body
        author{
        id
        profile_picture
        username
        }
        timestamp
        
  }
}
`
const findPodcastComments = `
   query($podcast_id:ID!)  {
  findPodcastComments(podcast_id:$podcast_id) {
        id
        body
        author{
        id
        profile_picture
        username
        }
        timestamp     
  }
}
`
const updateProfile = `
   mutation($first_name:String!,$username:String!,$username:String,$email:String!,$role:String!) {
  updateProfile(first_name:$first_name,username:$username,username:$username,email:$email,role:$role) {
   id
  }
}
`
const uploadFile = `
   mutation($file:Upload!,$profile:ID!) {
  uploadFile(file:$file,profile:$profile){
  id
    timestamp
        scope
        uploads {
          id
          path
          }
        likes {
        person{
        id
        }
          id
          }
        body
        author {
            username
            id
            profile_picture
        }
        profile {
        username
        id
        }
        comments{
        id
        body
        author{
        id
        profile_picture
        username
        }
        timestamp
        }
  }
}
`
const createNewPodcast = `
   mutation($title:String!,$description:String!,$hosts:[String!]!,$paid:Int!,$locations:[String!]!,$coverImage:Upload!,$podcast:Upload!) {
  newPodcast(title:$title,description:$description,hosts:$hosts,paid:$paid,locations:$locations,coverImage:$coverImage,podcast:$podcast) {
 title
 description
 hosts{
 id
 }
 payment{
 id
 }
 locations

 timestamp
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
const hosts=`
{
hosts{
id
username
profile_picture
}
}`
const searchHosts=`
query($username:String!){
searchHosts(username:$username){
id
username
profile_picture
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

export {
    addLocation,
    fetchPodcastsByTags,
    podcast,
    hosts,
    locations,
    searchHosts,
    registerGuardPersonalDetails,
    fetchProfilePodcasts,
    fetchHostPodcasts,
    fetchUserProfile,
    getProfileInfo,
    signup,
    isLocationExists,
    login,
    findPodcastComments,
    likePodcast,
    unlikePodcast,
    updatePodcast,
    deletePodcast,
    addComment,
    updateProfile,
    createNewPodcast,
    uploadFile,
    uploadProfilePicture,
    person
}
