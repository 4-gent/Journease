import React, {useState, useEffect} from 'react'

export default function Dash(){
    const privacySettings = JSON.parse(localStorage.getItem('privacySettings'));
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch('http://127.0.0.1:4000/query');
                if(response){
                    const data = await response.json();
                    setResult(data);
                }
            }catch(err){
                console.log(err);
            }
        }
        fetchData();;
    }, [])

    return(
        <div className='main'>
            <div className='prompt'>
                <h1> Data: </h1>
                {result ? (
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                ) : (
                    <p>No data available</p>
                )}
            </div>
            <div className='left-dashboard'>
            
            </div> 
            <div className='map'>

            </div>
        </div>
    )
}