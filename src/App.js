// import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { Configuration , OpenAIApi } from 'openai';
import { useState } from 'react';

function App() {

  const [isLoading , setIsLoading] = useState(true);
  const [inputText , setInputText] = useState("");

  const API_KEY = process.env.API_KEY;
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET
  const openai = new OpenAIApi(new Configuration({apiKey : API_KEY}));



  const EXAMPLES = [
    "I like Kanye West for my gym songs",
    "I've been feeling like a Shakespearean Villain lately",
    "Smitten by this lady i met in the metro"
  ]

  const handleEnterKey = async(e) => {
    if(e.key === 'Enter' || e.type === 'click'){
      if(e.preventDefault){
        e.preventDefault();
      }
      setIsLoading(true);

      let searchInput = inputText;
    }
  }

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
