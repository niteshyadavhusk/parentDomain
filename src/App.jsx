import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import Cookies from 'js-cookie';

function App() {
  // const [count, setCount] = useState(0);

  // Cookies.set(name,"nitesh");

  // const newTabRef = useRef(null);

  // useEffect(() => {
  //   const messageHandler = (event) => {
  //     if (event.origin !== 'https://childdomain.onrender.com') return;
  //     console.log('Message received from new tab:', event.data);
  //   };

  //   window.addEventListener('message', messageHandler);

  //   return () => {
  //     window.removeEventListener('message', messageHandler);
  //   };
  // }, []);

  // const openNewTab = () => {
  //   newTabRef.current = window.open('https://childdomain.onrender.com/', '_blank');

  //   const sendCookies = () => {
  //     if (newTabRef.current) {
  //       const cookies = document.cookie;
  //       console.log('Parent cookies:', cookies);
  //       newTabRef.current.postMessage(cookies, 'https://childdomain.onrender.com/');
  //       console.log('Cookies sent');
  //     }
  //   };

  //   setTimeout(sendCookies, 2000); // Increase delay if necessary
  // };

  // const logout = () => {
  //   console.log("Logout button clicked");
  //   if (newTabRef.current) {
  //     console.log('Sending logout message to new tab');
  //     newTabRef.current.postMessage('logout', 'https://childdomain.onrender.com/');
  //   } else {
  //     console.log('New tab reference is null, cannot send message');
  //   }
  // };

 

  // useEffect(() => {
  //   setLocalImg(imageUri)
  //   alert(imageUri)
  // }, [imageUri])

  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const receiveMessage = (event) => {
      alert('hello')
      const message = JSON.parse(event.data);
      if (message.type === 'image') {
        setImageUri(message.data);
      }
    };

    window.addEventListener('message', receiveMessage);

    return () => {
      window.removeEventListener('message', receiveMessage);
    };
  }, []);

  // const handleImageClick = () => {
  //   sendMessage('navigateToHome'); // Example: Send message to navigate to home section
  // };

  return (
    <>
      {/* <button id="navigateButton" onClick={openNewTab}>Open New Tab</button>
      <button id="logoutButton" onClick={logout}>Logout</button> */}

<div>
      <h1>React.js WebView Bridge</h1>
      {imageUri ? (
        <div>
          <h3>Image Received:</h3>
          <img src={imageUri} alt="Captured" style={{ maxWidth: '100%' }} />
        </div>
      ) : (
        <button onClick={() => window.ReactNativeWebView.postMessage('openCamera!')}>
          Open Camera
        </button>
      )}
    </div>
    </>
  )
}

export default App
