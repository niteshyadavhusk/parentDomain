import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import Cookies from 'js-cookie';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Form } from './Components/Form';
import { SpeechToText } from './Components/SpeechToText';
import { Nav } from './Components/Nav';
import { WebViewForm } from './Components/WebViewForm';



function App() {
  const [environment, setEnvironment] = useState('');

  useEffect(() => {
    function detectEnvironment() {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if (/iPhone|iPad|iPod|Android/i.test(userAgent)) {
        // Assuming React Native WebView will run on mobile devices
        return 'ReactNativeWebView';
      } else if (/Chrome/.test(userAgent)) {
        return 'Chrome';
      } else {
        return 'OtherBrowser';
      }
    }

    const env = detectEnvironment();
    setEnvironment(env);
    console.log('Environment:', env);
  }, []);
 

  return (
//     <>
//       {/* <button id="navigateButton" onClick={openNewTab}>Open New Tab</button>
//       <button id="logoutButton" onClick={logout}>Logout</button> */}

// {/* <div>
//       <h1>React.js WebView Bridge</h1>
//       {imageUri ? (
//         <div>
//           <h3>Image Received:</h3>
//           <img src={imageUri} alt="Captured" style={{ maxWidth: '100%' }} />
//         </div>
//       ) : (
//        <h2>no image</h2>
//       )}
//        <button onClick={() => window.ReactNativeWebView.postMessage('openCamera!')}>
//           Open Camera
//         </button>
        

//         <div>
//           <button onClick={()=>window.ReactNativeWebView.postMessage('getLocation!')}>getLocation</button>
//         </div>
//     </div>
//     {location && (
//           <div>
//             <h3>Location Received:</h3>
//             <p>Latitude: {location.latitude}</p>
//             <p>Longitude: {location.longitude}</p>
//           </div>
//         )} */}

       
//     </>

<BrowserRouter>
<Routes>
 {environment==="crome" ? <Route path='/' element={<Form/>}/>:<Route path='/' element={<WebViewForm/>}/>}
  <Route path='/speechTotext' element={<SpeechToText/>}/>
</Routes>
</BrowserRouter>
  )
}

export default App
