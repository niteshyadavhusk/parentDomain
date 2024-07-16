import React, { useEffect, useState } from 'react'
import { Nav } from './Nav';
import { Button } from '@mui/material';


export const Form = () => {
  const [imageUri, setImageUri] = useState(
    localStorage.getItem('imageUri') ||
    'https://tse1.mm.bing.net/th?id=OIP.7JVo-fa_E9WVVkFwa_eO6gHaD6&pid=Api&P=0&h=180'
  );
  const [location, setLocation] = useState(
    JSON.parse(localStorage.getItem('location')) || null
  );

  const [userDetails, setDetails] = useState({
    name: '',
    city: ''
  })

  const [isNative, setIsNative] = useState(false);



  const handleChangedata = (e) => {
    const { name, value } = e.target;
    setDetails((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }
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
        if (message.type === 'image') {
          setImageUri(message.data);

        } else if (message.type === 'location') {
          setLocation(message.data);
          alert(message.data);
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
  const sendMessageNagive = async () => {
    await window.ReactNativeWebView.postMessage('openCamera!')
  }

  const sendMessageLocation = async (e) => {
    e.preventDefault();
    await window.ReactNativeWebView.postMessage('getLocation!')


  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataObject = {
      image: imageUri,
      location: location,
      name: userDetails.name,
      city: userDetails.city
    };
    // console.log(dataObject);
    // alert(JSON.stringify(dataObject));
  };

  console.log(userDetails.name)

  return (
    <>
    <Nav/>
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
          <input type='text' name='name' id='name' value={userDetails.name} onChange={handleChangedata} />

          <label htmlFor='Area'>City</label>
          <input type='text' name='city' id='Area' value={userDetails.city} onChange={handleChangedata} />
          <label htmlFor='Latitude'>Latitude</label>
          <input type="number" placeholder='Latitude' name='Latitude' value={location ? location.latitude : "getLatutue"} readOnly />
          <label htmlFor='Longitude'>Longitude</label>
          <input type="number" placeholder='Longitude' name='Longitude' value={location ? location.longitude : "getlongitude"} readOnly />
          <br />
          <Button onClick={sendMessageLocation}>getLocation</Button>
        </div>
        <br />
        <Button  variant="contained" type='submit' name='Submit' onClick={handleSubmit} >Submit</Button>
      </form>
    </div>
    </>
  )
}
