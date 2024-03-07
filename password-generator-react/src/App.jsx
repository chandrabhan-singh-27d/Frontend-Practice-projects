import { useCallback, useEffect, useRef, useState } from 'react'


function App() {
  const [passwordLength, setPasswordLength] = useState(12);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isSpecialCharAllowed, setIsSpecialCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let tempPassword = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (isNumberAllowed) str += "0123456789"
    if (isSpecialCharAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= passwordLength; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      tempPassword += str.charAt(char)
    }

    setPassword(tempPassword)

  }, [passwordLength, isNumberAllowed, isSpecialCharAllowed, setPassword])

  const copyGeneratedPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    generatePassword()
  }, [passwordLength, isNumberAllowed, isSpecialCharAllowed, generatePassword])

  return (
    <>
      <div className='text-center bg-gray-700 w-full max-w-md mx-auto my-10 py-4 rounded-lg'>
        <h1 className='text-white text-2xl text-center mb-3'>Password Generator</h1>
        <div className='text-center'>
          <input
            type="text"
            value={password}
            readOnly
            placeholder='Generated Password'
            className='py-1 px-2 rounded-md rounded-r-none outline-none text-orange-400'
            ref={passwordRef}
          />
          <button onClick={copyGeneratedPassword} className='bg-blue-700 text-white py-1 px-3 rounded-md rounded-l-none cursor-copy'>Copy</button>
        </div>
        <div id='controls' className='my-4 px-6 py-2 flex gap-3'>
          <div className='flex flex-col w-1/3'>
            <input
              type="range"
              min={8}
              max={30}
              className='accent-blue-600 hover:accent-blue-600 cursor-pointer'
              id='password-length'
              value={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
            />
            <label htmlFor="password-length" className='text-orange-400'>Length: {passwordLength}</label>
          </div>
          <div className='text-center'>
            <input
              type="checkbox"
              id="number-allowed"
              value={isNumberAllowed}
              onChange={() => setIsNumberAllowed(prevVal => !prevVal)}
              className="w-4 h-4 accent-blue-700 outline-none mr-2" />
            <label htmlFor="number-allowed" className='text-orange-400'>Numbers</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="char-allowed"
              value={isSpecialCharAllowed}
              onChange={() => setIsSpecialCharAllowed(prevVal => !prevVal)}
              className="w-4 h-4 accent-blue-700 outline-none mr-2" />
            <label htmlFor="char-allowed" className='text-orange-400'>Sp. Characters</label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
