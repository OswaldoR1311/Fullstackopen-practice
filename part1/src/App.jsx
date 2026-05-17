import { useState } from 'react'

// const Hello = ({ name, age }) => {
//   const bornYear = () => new Date().getFullYear() - age

//   return (
//     <div>
//       <p>
//         Hello {name}, you are {age} years old
//       </p>
//       <p>So you are probably born in {bornYear()}</p>
//     </div>
//   )
// }

const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = newValue => {
    return () => {
      console.log('value now', newValue)
      setValue(newValue)
    }
  }

  return (
    <div>
      <h1>{value}</h1>
      <button onClick={setToValue(1000)}>Thousand</button>
      <button onClick={setToValue(0)}>reset</button>
      <button onClick={setToValue(value + 1)}>increment</button>
    </div>
  )
}

export default App
