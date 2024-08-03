import React, { useState } from "react";
import axios from 'axios'

export default function Prompt({ onSearch }) {
    const [prompt, setPrompt] = useState({ prompt: ''})
    
    const handlePrompt = async(e) => {
        e.preventDefault()
        try{
            const prompt_request = await axios.post('/query', prompt)
            onSearch(prompt_request.data)
            console.log(prompt_request.data)
        } catch(error) {
            console.log(error)
        }
    }

    return(
        <div>
            <form className="d-flex" onSubmit={handlePrompt}>
                <input placeholder='What are you looking for?' type="text" value={prompt.prompt} onChange={(e) => setPrompt({...prompt, prompt: e.target.value})} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}