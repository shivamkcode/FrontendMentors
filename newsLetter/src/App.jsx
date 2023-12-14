import React from 'react'
import tick from './assets/images/icon-list.svg'
import './App.css'

const App = () => {
  const [email, setEmail] = React.useState('')
  const [success, setSuccess] = React.useState(false)


  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccess(true)
  }

  const handleReload = () => {
    window.location.reload(false);
  }


  return (
    <div>
      {!success ? (

        <main className="card">
          <section className='first-sec'>
            <h1>Stay updated!</h1>
            <p>Don't join this kind of a newletter even in your life.</p>
            <div className="row">
              <img src={tick} alt="Tick" />
              <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</span>
            </div>
            <div className="row">
              <img src={tick} alt="Tick" />
              <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</span>
            </div>
            <div className="row">
              <img src={tick} alt="Tick" />
              <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</span>
            </div>
            <h3>Email address</h3>
            <form onSubmit={handleSubmit} action="submit">
              <input
                type="email"
                placeholder='email@company.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type='submit'>Don't Subscribe</button>
            </form>
          </section>
          <section className='img'></section>
        </main>
      ) : (
        <main className='success'>
          <img src={tick} alt="Tick" />
          <h1>Thanks for subscribing!</h1>
          <p>A confirmation email has been sent to <b>{email}</b>. Please open it and become the biggest chutiya ever. </p>
          <button onClick={handleReload}>Dismiss message</button>
        </main>
      )}
    </div>
  )
}
export default App
