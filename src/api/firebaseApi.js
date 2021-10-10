import axios from "axios"

const firebaseApi = {

    signUpWithEmail: async (email,password) => {
      const result = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=`,{
          email:email,
          password:password,
          returnSecureToken:true
      })
      console.log('result', result)
      return result
    },
    sendData: async (id,recipes) => {
        const result = await axios.put(`https://subscription-reminder-8baf5-default-rtdb.firebaseio.com/${id}.json`,{
            id:id,
            recipes:recipes,
        })
        console.log('result', result)
        return result
    },

    //   const result= await fetch('https://subscription-reminder-8baf5-default-rtdb.firebaseio.com/testing.json',{
    //     method:'PUT',
    //     body:JSON.stringify(
    //         {
    //         cart:[{test:1},{test:2}],
    //         testdata:1,
    //         testdata2:3
    //         })
    // })

  }
  
  export default firebaseApi
  