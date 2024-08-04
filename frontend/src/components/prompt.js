import React, { useState } from "react";
import axios from 'axios';
// import { useRouteLoaderData } from "react-router-dom";

export default function Prompt({ onSearch }) {
    const [prompt, setPrompt] = useState({prompt:''});

    const handlePrompt = async (e) => {
        e.preventDefault();
        try {
            console.log(prompt)
            const prompt_request = await axios.post('http://localhost:8080/temp', prompt);
            console.log(prompt_request)
            localStorage.setItem('prompt', JSON.stringify(prompt_request.data));

            if (onSearch) {
                onSearch(prompt_request.data);
            }
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form className="d-flex" onSubmit={handlePrompt}>
                <input placeholder='What are you looking for?' type="text" value={prompt.prompt} onChange={(e) => setPrompt({ ...prompt, prompt: e.target.value })} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}