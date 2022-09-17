

function getData() {
    

    var city = document.getElementById("search").value;
    var tempDeg = document.getElementById("tempDeg");
    var cityName = document.getElementById("cityName");
    var date = document.getElementById("date");
    var time = document.getElementById("time");
    var tem_fr = document.getElementById("tem_fr");
    var sr = document.getElementById("sr");
    var ss = document.getElementById("ss");
    var speed = document.getElementById("speed");
    var visSp = document.getElementById("visSp");
    var humPer = document.getElementById("humPer");
    var pre = document.getElementById("pre");
    var condition_name = document.getElementById("condition_name");




    // For Blocking the Loader Until the data fetched 

    document.getElementById("fpage").style.display = "none"
    document.getElementById("main").style.display = "block"


    async function getData() {
        try {
            document.getElementById("loader").style.display = "block"
            document.getElementById("full").style.display = "block"
            const returnResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ea1015d9c596f9ac6ce20c761de3d166&units=metric`
            )

            const data = await returnResponse.json();
            return data;
        } catch (error) {
            swal(error, "Invaild City Name", "error");
            
        }
    }
    getData().then((result) => {
            
            
       if(result.cod === "404"){
        swal("Error!", "Invaild City Name", "error");
        setTimeout(() => {
            document.location.reload();
          }, 2000);
       }
        document.getElementById("loader").style.display = "none";
        document.getElementById("full").style.display = "none"


        var sunRise = result.sys.sunrise;
        var sunSet = result.sys.sunset;
        var tempt = Math.round(`${result.main.temp}`);
        tempDeg.innerHTML = tempt + "<sup>o</sup>C";
        cityName.innerHTML = `<i class="fa fa-map-marker" aria-hidden="true"></i> &nbsp; ${city}`;
        var dateGet = new Date().toDateString();
        date.innerHTML = `<i class="fa fa-calendar-o" aria-hidden="true"></i> &nbsp ${dateGet}`;
        var timeGet = new Date().toLocaleTimeString()
        time.innerHTML = `<i class="fa fa-clock-o" aria-hidden="true"></i>&nbsp; ${timeGet}`
        var tem_fr_con = Math.round((tempt * 1.8) + 32)
        tem_fr.innerHTML = `${tem_fr_con} <sup>o</sup>F`
        sr.innerHTML = `${new Date(sunRise).toISOString().slice(11, 19)} am`
        ss.innerHTML = `${new Date(sunSet).toISOString().slice(11, 19)} pm`
        var wind_speed = result.wind.speed;
        speed.innerHTML = `${wind_speed} km/h`
        var visibility = result.visibility / 1000;
        visSp.innerHTML = `${visibility} km/h`
        var humidity = result.main.humidity;
        humPer.innerHTML = `${humidity}%`
        var pressure = result.main.pressure;
        pre.innerHTML = `${pressure} atm`
        var description = result.weather[0].description
        var descapt = description.slice(0, 1).toUpperCase() + description.slice(1).toLowerCase();
        condition_name.innerHTML = `${descapt}`
        var idc = result.weather[0].id;
        var pic = document.getElementById("pic");
        if (idc >= 200 && idc <= 232) {
            pic.src = "assets/thunderstorm.png"
        }
        else if (idc >= 300 && idc <= 321) {
            pic.src = "assets/drizzle.png"
        }
        else if (idc >= 500 && idc <= 531) {
            pic.src = "assets/rainy-day.png"
        }
        else if (idc >= 600 && idc <= 622) {
            pic.src = "assets/snowflake.png"
        }
        else if (idc == 701) {
            pic.src = "assets/mist.png"
        }
        else if (idc == 711) {
            pic.src = "assets/smoke.png"
        }
        else if (idc == 721) {
            pic.src = "assets/cloudy.png"
        }
        else if (idc == 731) {
            pic.src = "assets/sand.png"
        }
        else if (idc == 800) {
            pic.src = "assets/clear-sky.png"
        }
        else if (idc >= 801 || idc <= 804) {
            pic.src = "assets/cloudy.png"
        }


    }).catch((error) => {
        document.getElementById("loader").style.display = "none";
        document.getElementById("full").style.display = "none"
        console.log(error)
    })

    // For temperature in Fahrenheit, use "units=imperial".


}

