import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'

// change a value in an object where the keyname is in a variable (=dynamic)
// const obj = { name: "Ella" }
// let key = "name" // event.target.name
// obj[key] = "Martin"
// console.log(obj)

function App() {

  const [user, setUser] = useState({
    username: "", // MARTIN => e.target.value
    email: "",
    pw: "",
  });

  const [errors, setErrors] = useState("")

  const updateUserInput = (event) => {
    // determine which field to update using [] bracket syntax
    setUser({...user, [event.target.name]: event.target.value})
  }

  const onRegister = async (event) => {
    event.preventDefault()

    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })


    const data = await response.json()
    console.log(data)

    setErrors('');

    // errors da? anzeigen, die säue!
    if(data.error) {
      let strErrors = ""
      if(Array.isArray(data.error)) {
        data.error.forEach(error => {
          console.log(error.param, ":", error.msg)
          strErrors += error.param + ':' + error.msg;
        })
        // put in state
        setErrors(strErrors)
      }
    }

    console.log(data)
  }

  useEffect(() => {
    console.log(user);
  }, [user])

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={onRegister}>
          <div>
            <input
              name="username"
              onChange={updateUserInput}
              placeholder="Username..."
              type="text"
              value={user.username}
            />
          </div>
          <div>
            <input
              name="email"
              onChange={updateUserInput}
              placeholder="Email..."
              type="text"
              value={user.email}
            />
          </div>
          <div>
            <input
              name="pw"
              onChange={updateUserInput}
              placeholder="PW..."
              type="text"
              value={user.pw}
            />
          </div>
          <div>
            <button type="submit">Signup</button>
          </div>
          <div style={{ color: "red"}}>{errors}</div>
        </form>
      </header>
    </div>
  );
}

export default App
