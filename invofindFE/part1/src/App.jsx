import { useState, useEffect } from "react"

import "./App.css"

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const invofindHeading = document.querySelector(".invofindHeading")
    invofindHeading.innerHTML = invofindHeading.innerText
      .split("")
      .map(
        (letters, i) =>
          `<span style = "transition-delay:${i * 30}ms;
          filter: hue-rotate(${i * 15}deg)"›$">${letters}</span>`
      )
      .join("")
  }, [])

  return (
    <div>
      <div className="banner">
        <div className='invofindHeading'>
      InvoFind 🔍
        </div>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
          Log in {count}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
