import { useState, useEffect } from 'react'
import axios from "axios";

export const useField = (name) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }

    const reset = () => {
        setValue("");
      };
  
    return {
      name,
      value,
      onChange,
      reset
    }
  }
  
export const useCountry = (name) => {
    const [country, setCountry] = useState(null);
  
    useEffect(() => {
      if (name) {
        axios
          // .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
          .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
          .then((response) => {
            setCountry(response.data);
            console.log(response.data)
          })
          .catch((error) => {
            setCountry(null);
          });
      }
    }, [name]);
  
    return country;
  };

