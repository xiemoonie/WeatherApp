
import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import NewCoordenate from './components/Items/NewCoordenate';
import List from './components/Items/List';

function App() {
  global.lat = 0;
  global.lon = 0;
  const [loadedCoordenates, setLoadedCoordenates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  var [temp, tempItems] = useState([]);
  var [temperature, setTemperature] = useState([]);
  
  
  useEffect(() => {
    const fetchCoordenates= async () => {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/coordenates');

      const responseData = await response.json();
 
      setLoadedCoordenates(responseData.coordenates);
      setIsLoading(false);
    };

    fetchCoordenates();
  }, []);

  const addCoordenateHandler = async (lat, lon) => {
    
    try {
      const newCoordenate = {
        latitude: lat,
        longitude: lon // "+" to convert string to number
      };
      
      let hasError = false;
      const response = await fetch('http://localhost:5000/coordenate', {
        method: 'POST',
        body: JSON.stringify(newCoordenate),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
      if (!response.ok) {
        hasError = true;
      }
     
      const responseData = await response.json();
      if (hasError) {
        throw new Error(responseData.message);
      }
    
      setLoadedCoordenates(prevCoordenates => {
        return prevCoordenates.concat({
          ...newCoordenate,
          id: responseData.coordenate.id
        });
      });
    } catch (error) {
      alert(error.message || 'Something went wrong!! :c');
    }
 
  }
 
  const fetchPost = async () => {
    
      const response = await fetch('http://localhost:5000/coordenates');

      var responseData = await response.json();
      const rd = responseData.coordenates;
      var num = rd.length -1;
      var lat = rd[num].latitude;
      var lon = rd[num].longitude;
    
   const url = `https://api.open-meteo.com/v1/forecast?latitude=`+`${lat}`+`&longitude=`+`${lon}`+`&hourly=temperature_2m&current_weather=true`;

   const resp = await fetch(url);
   const dat = await resp.json();
 

   console.log(dat);
   setPosts(dat);
   tempItems([dat.hourly.temperature_2m]); 
   setTemperature(dat.current_weather);
   };

   useEffect(() => {
     fetchPost()
   }, []);

  

   
  return (
    
    <React.Fragment>
      <Header />
      <main>
        
        <NewCoordenate onAddCoordenate={addCoordenateHandler}/>
        {isLoading && <p className="loader">Loading...</p>},
        {!isLoading && <List items={loadedCoordenates} />}
        <button onClick={fetchPost}className="button"> GetInfo </button>
       
        <div className="product-item">
        Latitude: {posts.latitude}
        </div>
        <div className="product-item">
        Longitude: {posts.longitude}
        </div>
        <div className="product-item">
        Elevation: {posts.elevation}
        </div>
        <div className="product-item">
        Generation time :{posts.generationtime_ms}
        </div>
        <div className="product-item">
        Utc: {posts.utc_offset_seconds}
        </div>
        <div className="product-item">
        Temperature°C : {temperature.temperature}
        </div>
        <div className="product-item">
        Air temperature at 2 meters above ground:{temp.map((index) => <li key={index}>[{index}]</li>)}
        </div>
        


      
        

    </main>
    </React.Fragment>
  );


}

export default App;