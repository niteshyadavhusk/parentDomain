import React, { useEffect, useState } from 'react'

export const Form = () => {
  const [imageUri, setImageUri] = useState('https://tse1.mm.bing.net/th?id=OIP.7JVo-fa_E9WVVkFwa_eO6gHaD6&pid=Api&P=0&h=180');
  const [location, setLocation] = useState(null);
  const [isNative, setIsNative] = useState(false);
  // const [web, setWeb] = useState(false)
  // const [environment, setEnvironment] = useState('');

  // useEffect(() => {
  //   function detectEnvironment() {
  //     const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  //     if (/iPhone|iPad|iPod|Android/i.test(userAgent)) {
  //       // Assuming React Native WebView will run on mobile devices
  //       return 'ReactNativeWebView';
  //     } else if (/Chrome/.test(userAgent)) {
  //       return 'Chrome';
  //     } else {
  //       return 'OtherBrowser';
  //     }
  //   }

  //   const env = detectEnvironment();
  //   setEnvironment(env);
  //   console.log('Environment:', env);
  // }, []);

  useEffect(() => {
    const receiveMessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === 'native') {
         // setIsNative(true);
          alert('App opened in React Native WebView');
        } else if (message.type === 'image') {
          setImageUri(message.data);

        } else if (message.type === 'location') {
          setLocation(message.data);
          alert('Location received');
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    }
    window.addEventListener('message', receiveMessage);

    return () => {
      window.removeEventListener('message', receiveMessage);
    };
  }, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (isNative === "native") {
       
  //       setWeb(true);
  //     } else {
  //       setWeb(false);
  //     }
  //   }, 2000); // 1 second delay

  //   return () => clearTimeout(timer); // Cleanup the timer
  // }, [isNative]);
const sendMessageNagive= async()=>{
    await window.ReactNativeWebView.postMessage('openCamera!')
}

const sendMessageLocation= async()=>{
  await window.ReactNativeWebView.postMessage('getLocation!')
}
  console.log(isNative)
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'column' }}>
      <h2>Husk Power System</h2>

      <form>
         <div style={{ display: 'flex', flexDirection: "column" }}>
          <div style={{ width: "200px", height: '200px', border: '1px solid blue', borderRadius: '50%' }}>
            <img src={imageUri} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
          </div>
          <br></br>
          <button onClick={sendMessageNagive} >upload Img</button>

        </div> 
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' id='name' />

          <label htmlFor='Area'>City</label>
          <input type='text' name='Area' id='Area' />
          <label htmlFor='Latitude'>Latitude</label>
          <input type="number" placeholder='Latitude' name='Latitude' value={location ? location.latitude : "getLatutue"} />
          <label htmlFor='Longitude'>Longitude</label>
          <input type="number" placeholder='Longitude' name='Longitude' value={location ? location.longitude : "getlongitude"} />
          <br />
          <button onClick={sendMessageLocation}>getLocation</button>
        </div>
        <br />
        <button type='submit' name='Submit'>Submit</button>
      </form>
    </div>
  )
}
