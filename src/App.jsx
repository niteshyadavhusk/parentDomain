import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import Cookies from 'js-cookie';

function App() {
  const [count, setCount] = useState(0);

  Cookies.set(name,"nitesh");

  const newTabRef = useRef(null);

  useEffect(() => {
    const messageHandler = (event) => {
      if (event.origin !== 'https://childdomain.onrender.com') return;
      console.log('Message received from new tab:', event.data);
    };

    window.addEventListener('message', messageHandler);

    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, []);

  const openNewTab = () => {
    newTabRef.current = window.open('https://childdomain.onrender.com/', '_blank');

    const sendCookies = () => {
      if (newTabRef.current) {
        const cookies = document.cookie;
        console.log('Parent cookies:', cookies);
        newTabRef.current.postMessage(cookies, 'https://childdomain.onrender.com/');
        console.log('Cookies sent');
      }
    };

    setTimeout(sendCookies, 2000); // Increase delay if necessary
  };

  const logout = () => {
    console.log("Logout button clicked");
    if (newTabRef.current) {
      console.log('Sending logout message to new tab');
      newTabRef.current.postMessage('logout', 'https://childdomain.onrender.com/');
    } else {
      console.log('New tab reference is null, cannot send message');
    }
  };

  return (
    <>
      <button id="navigateButton" onClick={openNewTab}>Open New Tab</button>
      <button id="logoutButton" onClick={logout}>Logout</button>
    </>
  )
}

export default App
