import React, { useEffect, useRef, useState } from 'react'
import { findBysearch } from '../Service/CustomerService';
import axiosInstance from '../Service/AxiosSerives';

export const OperationForm = () => {

    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef(null);
    const inputRef = useRef(null);
    const [userDataSearch, setUserDataSearch] = useState('')
    const [customerTypes, setCustomerTypes] = useState([]);

    const [customerPhase, setCustomerPhase] = useState([])
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
                console.log(response.data)
                //const data =  response.json();
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
            setShowModal(false); // Close the modal when clicking outside
            setSearchInput(''); // Clear the input field when closing
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

    console.log(customerTypes)
    console.log(customerPhase)

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
                    <div className='customer-form' style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',alignItems:'space-between'}}>
                        <div style={{display:'flex'}}>
                            <label>Customer Name:</label>
                            <input type='text' value={userDataSearch.FirstName} name='firstName' />
                        </div>
                        <div>
                            <label>CRN:</label>
                            <input type='number' placeholder='please enter customer id' />

                        </div>
                        {/* customer type  */}
                        <div>
                            <label>Customer Type</label>
                            <select name="customerType" defaultValue="">
                                <option value="" disabled>Select customer type</option>
                                {customerTypes.map(type => (
                                    <option key={type.id} value={type.id}>
                                        {type.type}
                                    </option>
                                ))}
                            </select>

                        </div>
                        {/* business orner nane */}
                        <div>
                            <label htmlFor='business name'>Business name </label>
                            <input type='text' placeholder='please enter business name if any have' />
                        </div>

                        {/* customer age */}
                        <div>
                            <label>Customer Age:</label>
                            <input type='number' Age />

                        </div>
                        {/* customer phase */}

                        <div name="customer_phase">
                        <label>Customer Type</label>
                            <select name="customerPhase" defaultValue="">
                                <option value="" disabled>Select customer phase</option>
                                {customerPhase.map(type => (
                                    <option key={type.id} value={type.id}>
                                        {type.color}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* customer dob */}
                        <div>
                            <label>Customer DOB:</label>
                            <input type='date'/>
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