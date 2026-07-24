import React, { useEffect, useState } from "react";
import { Input } from "antd";

const Weather = () => {
  const [city, setCity] = useState("");
  const [debouncedCity, setDebouncedCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCity(city.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [city]);

  // Fetch Weather
  useEffect(() => {
    if (!debouncedCity) {
      setData(null);
      setError("");
      return;
    }

    const fetchWeather = async () => {
      try {
        const apiKey = "9a8a304cd8460847b34caebb6d004d0b";

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${debouncedCity}&appid=${apiKey}&units=metric`,
        );

        const result = await response.json();

        if (result.cod !== 200) {
          setError(result.message);
          setData(null);
          return;
        }

        setError("");
        setData(result);
      } catch (err) {
        console.log(err);
        setError("Something went wrong.");
      }
    };

    fetchWeather();
  }, [debouncedCity]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-700 flex items-center justify-center px-4 py-10">
      {/* Background Blur */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-300 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-400 rounded-full blur-3xl opacity-30"></div>
      </div>

      {/* Weather Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl bg-white/15 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
        {/* Header */}
        <div className="p-6 bg-white/10 border-b border-white/20">
          <h1 className="text-center text-4xl font-extrabold text-white">
            🌤 Weather
          </h1>

          <p className="text-center text-blue-100 mt-2">
            Check weather anywhere
          </p>

          <div className="mt-6">
            <Input
              placeholder="Search city..."
              size="large"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="rounded-xl"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mx-6 mt-6 rounded-xl bg-red-500/20 border border-red-300 p-4 text-center animate-in fade-in zoom-in duration-500">
            <p className="text-red-100 font-semibold">{error}</p>
          </div>
        )}

        {/* Weather */}
        {data && (
          <div className="p-6 text-white animate-in fade-in zoom-in duration-500">
            {/* City */}
            <div className="text-center">
              <h2 className="text-3xl font-bold">
                {data.name}, {data.sys.country}
              </h2>

              <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                alt={data.weather[0].description}
                className="mx-auto w-36 h-36 drop-shadow-2xl animate-bounce"
              />

              <h1 className="text-7xl font-black">
                {Math.round(data.main.temp)}°
              </h1>

              <p className="text-2xl font-semibold mt-2">
                {data.weather[0].main}
              </p>

              <p className="capitalize text-blue-100">
                {data.weather[0].description}
              </p>
            </div>

            {/* Weather Details */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-white/15 rounded-2xl p-5 backdrop-blur-md hover:scale-105 transition-all duration-300 shadow-lg">
                <p className="text-blue-100 text-sm">🌡 Feels Like</p>
                <h3 className="text-2xl font-bold">
                  {Math.round(data.main.feels_like)}°C
                </h3>
              </div>

              <div className="bg-white/15 rounded-2xl p-5 backdrop-blur-md hover:scale-105 transition-all duration-300 shadow-lg">
                <p className="text-blue-100 text-sm">💧 Humidity</p>
                <h3 className="text-2xl font-bold">{data.main.humidity}%</h3>
              </div>

              <div className="bg-white/15 rounded-2xl p-5 backdrop-blur-md hover:scale-105 transition-all duration-300 shadow-lg">
                <p className="text-blue-100 text-sm">🌬 Wind Speed</p>
                <h3 className="text-2xl font-bold">
                  {(data.wind.speed * 3.6).toFixed(1)} km/h
                </h3>
              </div>

              <div className="bg-white/15 rounded-2xl p-5 backdrop-blur-md hover:scale-105 transition-all duration-300 shadow-lg">
                <p className="text-blue-100 text-sm">👁 Visibility</p>
                <h3 className="text-2xl font-bold">
                  {(data.visibility / 1000).toFixed(1)} km
                </h3>
              </div>

              <div className="bg-white/15 rounded-2xl p-5 backdrop-blur-md hover:scale-105 transition-all duration-300 shadow-lg">
                <p className="text-blue-100 text-sm">☁ Clouds</p>
                <h3 className="text-2xl font-bold">{data.clouds.all}%</h3>
              </div>

              <div className="bg-white/15 rounded-2xl p-5 backdrop-blur-md hover:scale-105 transition-all duration-300 shadow-lg">
                <p className="text-blue-100 text-sm">📊 Pressure</p>
                <h3 className="text-2xl font-bold">{data.main.pressure} hPa</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
