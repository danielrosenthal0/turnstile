import { useState } from "react"
import { forgotPassword } from "../services/auth"
import { Link } from "react-router-dom"

function ForgotPassword() {
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      await forgotPassword(username)
      setSuccess(true)
    } catch (err) {
      setError(err.message)
    }
  }

  if (success) {
    return (
      <div>
        <h2>Reset password</h2>
        <p>
          Check your email for the confirmation code to reset your password.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
      <Link to="/sign-in">Sign In</Link>
    </div>
  )
}

export default ForgotPassword;