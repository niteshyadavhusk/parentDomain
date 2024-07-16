import { Button } from '@mui/material'
import React from 'react'

export const WebViewForm = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'column' }}>
    <h2>Husk Power System</h2>

    <form>
      <div style={{ display: 'flex', flexDirection: "column" }}>
        <div>
          <input type='file' placeholder='upload Image'/>
        </div>
        <br></br>
        

      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' id='name' />

        <label htmlFor='Area'>City</label>
        <input type='text' name='city' id='Area'   />
        <label htmlFor='Latitude'>Latitude</label>
        <input type="number" placeholder='Latitude' name='Latitude'  readOnly />
        <label htmlFor='Longitude'>Longitude</label>
        <input type="number" placeholder='Longitude' name='Longitude'  readOnly />
        <br />
        
      </div>
      <br />
      <Button  variant="contained" type='submit' name='Submit'  >Submit</Button>
    </form>
  </div>
  )
}
