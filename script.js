
const input = document.querySelector("#inputbox");
const search = document.querySelector("#search");
const cityName = document.querySelector("#cityName");
const temperature = document.querySelector("#temperature");
const description = document.querySelector("#description");
const errorMsg = document.querySelector("#errorMsg");
const humidity = document.querySelector("#humidity");
const apiKey = "c6be3af21e98517c6d9f6fcbb88b5c7b";

search.addEventListener("click", ()=>{
    const city = input.value;
    if (city===""){
      errorMsg.classList.remove("hidden");
       cityName.innerText = "";
     temperature.innerText = "";
     description.innerText = "";
     humidity.innerText = "";
      return;
    }
   
        
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
         
             console.log("Full Data:", data);
           cityName.innerText = data.name;
           errorMsg.classList.add("hidden");

         temperature.innerText = "Temperature: " + (data.main.temp - 273.15).toFixed(2) + "°C";

        description.innerText = 
            "Weather: " + data.weather[0].description;

        humidity.innerText = 
            "Humidity: " + data.main.humidity + "%";

        
        const weather = data.weather[0].description.toLowerCase();
        changeBackground(weather);

    })
    .catch(error => {
        console.log("Error:", error);
    });
});



function changeBackground(condition) {
    const body = document.body;
    const weather = condition.toLowerCase();

    if (weather.includes("clear")) {
        body.style.backgroundImage = "url('https://images.unsplash.com/photo-1581224463294-908316338239?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
    }

    else if (weather.includes("cloud")) {
        body.style.backgroundImage = "url('https://images.unsplash.com/photo-1614959909713-128c622fad23?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
    }

    else if (weather.includes("rain") || weather.includes("drizzle")) {
        body.style.backgroundImage = "url('https://images.unsplash.com/photo-1507027682794-35e6c12ad5b4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
    }

    else if (weather.includes("thunder")) {
        body.style.backgroundImage = "url('https://images.unsplash.com/photo-1500674425229-f692875b0ab7')";
    }

    else if (weather.includes("snow")) {
        body.style.backgroundImage = "url('https://images.unsplash.com/photo-1483664852095-d6cc6870702d')";
    }

    else if (weather.includes("mist") || weather.includes("fog") || weather.includes("haze")) {
        body.style.backgroundImage = "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')";
    }

    // Smooth effect
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    body.style.backgroundRepeat = "no-repeat";
}

