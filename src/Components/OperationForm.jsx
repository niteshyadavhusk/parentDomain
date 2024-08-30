import React, { useEffect, useRef, useState } from 'react'
import { findBysearch } from '../Service/CustomerService';
import axiosInstance from '../Service/AxiosSerives';
import { Margin } from '@mui/icons-material';
import '../style/form.css'

export const OperationForm = () => {

    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef(null);
    const inputRef = useRef(null);
    const [userDataSearch, setUserDataSearch] = useState('')
    const [customerTypes, setCustomerTypes] = useState([]);
    const [businessType, setBusinessType] = useState([]);
    const [customerPhase, setCustomerPhase] = useState([]);

    const [customerImg, setCustomerImg] = useState('image.jpg');
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [customerType, setCustomerType] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [age, setAge] = useState(null);
    const [phase, setPhase] = useState(null);
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState(null);
    const [lattitude, setLattitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [poleNo, setPoleNo] = useState(null);
    const [meterSerial, setMeterSeial] = useState("")
    const [poleDistance, setPoleDistance] = useState('');
    const [mcbStatus, setMcbStatus] = useState(null);
    const [mcbImage, setMcbImage] = useState('');
    const [mcbType, setMcbType] = useState("");
    const [cableImage, setCableImage] = useState('');
    const [cableType, setCableType] = useState('');
    const [businessId, setBusinessId] = useState(null)
    const [isActive, setIsActive] = useState(false);
    const [kycId, setKycid] = useState('');
    const [kycImage, setKycImage] = useState('');
    const [reviewStatus, setReviewStatus] = useState('pending');
    const [gender, setGender] = useState('')

    const syncData = async () => {
        const offlineData = JSON.parse(localStorage.getItem('offlineFormData'));
        if (offlineData && offlineData.length > 0) {
            for (const formData of offlineData) {
                await sendFormData(formData);
            }
            localStorage.removeItem('offlineFormData');
            alert('Offline data synced successfully.');
        }
    };

    useEffect(() => {
        // Sync data when back online
        window.addEventListener('online', syncData);
        return () => {
            window.removeEventListener('online', syncData);
        };
    }, []);




    if (navigator.onLine) {
        console.log("online");
    } else {
        console.log("offline");
    }


    useEffect(() => {
        if (userDataSearch) {
            setName(userDataSearch.FirstName || "");
            setId(userDataSearch.Id || "");
            setPhone(userDataSearch.PhoneNumber || "");

            setMeterSeial(userDataSearch.MeterSerial || "");
            setMcbType(userDataSearch.Meter_Type || "");
            setLattitude(userDataSearch ? userDataSearch.Latitude : "")
            setLongitude(userDataSearch ? userDataSearch.Longitude : "")

        }
    }, [userDataSearch]);



    console.log("name ", name)

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
        console.log(searchInput)
        setShowModal(true);
        sendRequest()
    }


    const sendRequest = async () => {
        let data = {
            "firstName": searchInput
        }
        try {
            await findBysearch(data).then((response) => {
                const topResults = response.data.slice(0, 20);
                setSearchResults(topResults);

            })
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleClickOutside = (event) => {
        if (
            modalRef.current && !modalRef.current.contains(event.target)

        ) {
            setShowModal(false);
            setSearchInput('');
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    const handleSelectCustomer = async (id, name) => {
        try {
            const data = { id: id };
            const response = await findBysearch(data);
            if (response) {


                setSearchInput(response.data[0].FirstName);
                setShowModal(false);
                setUserDataSearch(response.data[0]);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    console.log(searchResults[0])


    useEffect(() => {
        axiosInstance.get('customer-type')
            .then(response => setCustomerTypes(response.data.data))
            .catch(error => console.error('Error fetching customer types:', error));
    }, []);

    useEffect(() => {
        axiosInstance.get('getcustomer-phase')
            .then(response => setCustomerPhase(response.data.data))
            .catch(error => console.error('Error fetching customer types:', error));
    }, []);

    useEffect(() => {
        axiosInstance.get('getBussinessType')
            .then(response => setBusinessType(response.data.data))
            .catch(error => console.error('Error fetching customer types:', error));
    }, []);

    

    const sendFormData = async (formData) => {
        try {
            await axiosInstance.post("uploadfield-data", formData);
            console.log('Form data submitted successfully:', formData);
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            name,
            customer_id: id,
            customer_type: customerType,
            customer_phase: phase,
            business_owner_name: businessName,
            gender,
            age,
            dob,
            customer_image: "image.jpg",
            meter_serial: meterSerial,
            lattitude,
            longitude,
            pole_no: poleNo,
            pole_distance: poleDistance,
            mcb_status: mcbStatus,
            mcb_image_url: "mcbImage.jpg",
            mcb_type: mcbType,
            servicecable_image_url: "serviceCable.jpg",
            servicecable_type: cableType,
            businesstype_id: businessId,
            kyc_verification: kycId,
            isactive: isActive,
            kyc_img: "kycImage.jpg"
        };

        if (navigator.onLine) {
            console.log(formData)
            sendFormData(formData);
        } else {
            // Save to localStorage if offline
            const offlineData = JSON.parse(localStorage.getItem('offlineFormData')) || [];
            offlineData.push(formData);
            localStorage.setItem('offlineFormData', JSON.stringify(offlineData));
            alert('Form data saved offline and will sync when online.');
        }
    };

    console.log(customerTypes)
    console.log(customerPhase)
    console.log(businessType)
    console.log(userDataSearch)
    console.log(customerType)
    console.log(mcbStatus)
    console.log(phase)







    return (
        <div style={{}}>

            <div style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', border: 'solid 1px red' }}>
                <h2>
                    Operation Form
                </h2>
                <form>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: "200px", height: '200px', border: '1px solid blue', borderRadius: '50%', textAlign: 'center' }}>
                            <img src='' style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                        </div>
                        <br></br>
                        <div>
                            <button>upload Img</button>
                        </div>
                    </div>
                    <br></br>
                    <div style={{ position: 'relative' }}>
                        <div className='search-field' style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', paddingBottom: '30px' }}>
                            <input type='text' style={{ height: '20px', width: '30%' }} placeholder='please enter customer name and crn'
                                onChange={handleSearchChange} value={searchInput} name='searchInput'
                            ></input>
                            <span style={{ border: '1px solid blue', marginLeft: '30px' }}>search by name and crn </span>
                        </div>
                        {showModal && (
                            <div ref={modalRef} style={modalStyle} >
                                <div style={modalContentStyle}>
                                    <h2>Search Results</h2>
                                    <ul style={{ listStyle: 'none' }}>
                                        {searchResults.map((result, index) => (
                                            <li key={index} style={{ border: 'solid 1px blue', backgroundColor: 'black', color: "white", padding: '10px' }} onClick={() => handleSelectCustomer(result.Id, result.firstName)}>{result.
                                                FirstName
                                            } - {result.Id}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='customer-form' style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'space-between' }}>
                        <div className='formDiv' >
                            <label>Customer Name:</label>
                            <input type='text' value={name} name='firstName' />
                        </div>
                        <div className='formDiv'>
                            <label>CRN:</label>
                            <input type='number' placeholder='please enter customer id' value={id} readOnly />

                        </div>
                        {/* customer type  */}
                        <div className='formDiv'>
                            <label>Customer Type</label>
                            <select name="customerType" value={customerType} onChange={(e) => setCustomerType(e.target.value)}>
                                {(customerTypes && customerTypes.length > 0) ? (
                                    customerTypes.map(type => (
                                        <option key={type.id} value={type.id}>
                                            {type.type}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>No types available</option>
                                )}
                            </select>

                        </div>
                        {/* business orner nane */}
                        <div className='formDiv'>
                            <label htmlFor='business name'>Business name </label>
                            <input type='text' placeholder='please enter business name if any have' value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
                        </div>

                        {/* customer age */}
                        <div className='formDiv'>
                            <label>Customer Age:</label>
                            <input type='number' value={age} onChange={(e) => setAge(e.target.value)} />

                        </div>
                        {/* customer phase */}

                        <div name="customer_phase" className='formDiv'>
                            <label>Customer Phase</label>
                            <select name="customerPhase" value={phase} onChange={(e) => setPhase(e.target.value)}>
                                <option value="" disabled>Select customer phase</option>
                               {(customerPhase && customerPhase.length>0) ?(
                                 customerPhase.map(type => (
                                    <option key={type.id} value={type.id}>
                                        {type.color}
                                    </option>
                                )))
                                :(
                                    <option value="" disabled>No types available</option> 
                                )
                               }
                            </select>
                        </div>

                        {/* customer dob */}
                        <div className='formDiv'>
                            <label>Customer DOB:</label>
                            <input
                                type='date'
                                value={dob}
                                onChange={(e) => setDob(e.target.value)} // Update the state with the new value
                            />
                        </div>
                        {/* meter serial number */}
                        <div className='formDiv'>
                            <label>Meter Serial Number:</label>
                            <input type='text' placeholder='meter serial number' value={meterSerial} onChange={(e) => setMeterSeial(e.target.value)} />
                        </div>
                        {/* customer location */}
                        <div className='formDiv'>
                            <label>Customer Location:</label>
                            <input type=' text' placeholder='Latitude' value={lattitude} /> <input type='text' placeholder='longitude' value={longitude} /> <button>get location</button>
                        </div>
                        {/* pole no */}

                        <div className='formDiv'>
                            <label>Pole No:</label>
                            <input type='number' placeholder='pole number' value={poleNo} onChange={(e) => setPoleNo(e.target.value)} />

                        </div>
                        {/* pole distance  */}
                        <div className='formDiv'>
                            <label>Pole Distance:</label>
                            <input type='text' placeholder='please enter pole distance' value={poleDistance} onChange={(e) => setPoleDistance(e.target.value)} />
                        </div>
                        {/* mcb status  */}
                        <div className='formDiv'>
                            <label>MCB Status:</label>
                            <input
                                type="radio"
                                id="mcb-true"
                                name="mcb"
                                value="true"
                                checked={mcbStatus === "true"}
                                onChange={(e) => setMcbStatus(e.target.value)}
                            />
                            <label htmlFor="mcb-true">True</label>

                            <input
                                type="radio"
                                id="mcb-false"
                                name="mcb"
                                value="false"
                                checked={mcbStatus === "false"}
                                onChange={(e) => setMcbStatus(e.target.value)}
                            />
                            <label htmlFor="mcb-false">False</label>
                        </div>

                        {/*mcb_imge url  */}
                        <div className='formDiv'>
                            <label>MCB Image URL:</label>
                            <input type='file' placeholder='please upload MCB Image ' value={mcbImage} onChange={(e) => setMcbImage(e.target.value)} />
                        </div>

                        {/* mcb type */}

                        <div className='formDiv'>
                            <label >MCB type </label>
                            <input type='text' placeholder='mcb type' value={mcbType} onChange={(e) => e.target.value} />
                        </div>
                        {/* service cable image url */}
                        <div className='formDiv'>
                            <label>Service Cable Image URL:</label>
                            <input type='file' placeholder='service cable image url' value={cableImage} onChange={(e) => setCableImage(e.target.value)} />
                        </div>
                        {/* service cable type */}
                        <div className='formDiv'>
                            <label>Sevice cable type</label>
                            <input type='text' placeholder='service cable type' value={cableType} onChange={(e) => setCableType(e.target.value)} />
                        </div>
                        {/* business type  */}
                        <div className='formDiv'>
                            <label>Business Type</label>
                            <select name="business Type" value={businessId} onChange={(e) => setBusinessId(e.target.value)}>
                                <option value="" disabled>Select business type</option>
                               {(businessType && businessType.length>0) ? (
                                 businessType.map(type => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))):(
                                    <option value="">No business type available</option>
                                )
                               }
                            </select>

                        </div>

                        {/* kyc details  */}
                        <div className='formDiv'>
                            <label>Is Active: </label>
                            <input type="radio" id="isActive" name="isActive" value="true"
                                checked={isActive === "true"}
                                onChange={(e) => setIsActive(e.target.value)} />

                            <label for="isActive">True</label>

                            <input type="radio" id="isActive" name="isActive" value="false"
                                checked={isActive === "false"}
                                onChange={(e) => setIsActive(e.target.value)} />

                            <label for="isActive">False</label>
                        </div>
                        <div className='formDiv'>
                            <label>Is Active: </label>
                            <input type="radio" id="gender" name="gender" value="Male"
                                checked={gender === "Male"}
                                onChange={(e) => setGender(e.target.value)} />

                            <label for="isActive">Male</label>

                            <input type="radio" id="gender" name="gender" value="Female"
                                checked={gender === "Female"}
                                onChange={(e) => setGender(e.target.value)} />

                            <label for="isActive">Female</label>
                        </div>
                        <div className='formDiv'>
                            <label>select kyc verification id(PAN,ADHAAR,DL) :</label>
                            <input type='text' value={kycId} placeholder='please enter id name' onChange={(e) => setKycid(e.target.value)} />
                        </div>
                        {/* kyc image  */}
                        <div className='formDiv'>
                            <label>KYC Image :</label>
                            <input type='file' placeholder='please upload kyc image' value={kycImage} onChange={(e) => setKycImage(e.target.value)} />
                        </div>
                        <div className='formDiv'>
                            <label>Review Status :</label>
                            <input type='text' />
                        </div>
                        <div className='formDiv'>
                            <label>Review Remarks :</label>
                            <input type='text' />
                        </div>
                        <div className='formDiv'>
                            <label>Assignes_to :</label>
                            <input type='text' />
                        </div>

                        <div className='formDiv'>
                            <button onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>

                </form>
            </div>

        </div>
    )
}

const modalStyle = {
    position: 'absolute',
    top: '50px', // Adjust this value based on the height of your search input
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#fff',
    border: '1px solid #888',
    zIndex: 1000,
    width: '30%',

};

const modalContentStyle = {
    padding: '20px',
};

const formDivStyle = {
    marginTop: '10px'
}