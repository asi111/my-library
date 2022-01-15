import {useState,useEffect} from "react";
export default function UseAxios(URL,auth,localStorageKEYBooksList) {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);

console.log("start");
  useEffect(() => {
    if(!auth)return 
    return getData();
  }, [auth]);

  const getData = async () => {
    try {
      const response = await axios.get(URL);
      setLoading(true)
      setData(response.data)
      localStorage.setItem(localStorageKEYBooksList ,JSON.stringify(response.data))
      const localStorageBooksList = JSON.parse(localStorage.getItem(localStorageKEYBooksList))
      localStorageBooksList ? setData(localStorageBooksList) : null
     
      console.log(response.data);
      
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  };
  
  return data? [data, setData,loading]:[null,null,null];

}
