import React, { useEffect, useState } from 'react'

export const Form = () => {
  const [imageUri, setImageUri] = useState('https://tse1.mm.bing.net/th?id=OIP.7JVo-fa_E9WVVkFwa_eO6gHaD6&pid=Api&P=0&h=180');
  const [location, setLocation] = useState(null);
  const [isNative, setIsNative] = useState('');
  const [web, setWeb] = useState(false)


  useEffect(() => {
    const receiveMessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === 'native') {
          setIsNative("native");
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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isNative === "native") {
       
        setWeb(true);
      } else {
        setWeb(false);
      }
    }, 1000); // 1 second delay

    return () => clearTimeout(timer); // Cleanup the timer
  }, [isNative]);

  console.log(isNative)
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'column' }}>
      <h2>Husk Power System</h2>

      <form>
        {web ? <div style={{ display: 'flex', flexDirection: "column" }}>
          <div style={{ width: "200px", height: '200px', border: '1px solid blue', borderRadius: '50%' }}>
            <img src={imageUri} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
          </div>
          <br></br>
          <button onClick={() => window.ReactNativeWebView.postMessage('openCamera!')} >upload Img</button>

        </div> :
          <div>
            <label htmlFor='img'>Image</label>
            <input type='file' />
          </div>
        }
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
          <button onClick={() => window.ReactNativeWebView.postMessage('getLocation!')}>getLocation</button>
        </div>
        <br />
        <button type='submit' name='Submit'>Submit</button>
      </form>
    </div>
  )
}
