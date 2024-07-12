import React from 'react'

export const Form = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'column' }}>
            <h2>Husk Power System</h2>

            <form>
                <div style={{ display: 'flex', flexDirection: "column" }}>
                    <div style={{ width: "200px", height: '200px', border: '1px solid grey', borderRadius: '50%' }}>
                        <img src='' />
                    </div>
                    <button >upload Img</button>

                </div>
                <div style={{display:'flex',flexDirection:'column',marginTop:'20px'}}>
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' id='name' />
                
                    <label htmlFor='Area'>City</label>
                    <input type='text' name='Area' id='Area' />
                </div>
            </form>
        </div>
    )
}
