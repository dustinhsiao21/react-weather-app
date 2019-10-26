import {useState, useCallback, useEffect} from 'react';

const currentUrl = (currentLocation) => `https://api.openweathermap.org/data/2.5/weather?q=${currentLocation},au&units=metric&APPID=d311cb4bace6187e5cbf0ed9f6c63125`;

const fetchCurrentWeatherAPI = (currentLocation) => {
    return fetch(currentUrl(currentLocation))
        .then(response => response.json())
        .then(data => {
            return {
                observationTime: data.dt * 1000,
                locationName: data.name + '/'+ data.sys.country,
                description: data.weather[0].description,
                temperature: Math.round(data.main.temp * 10) / 10,
                windSpeed: data.wind.speed,
                humid: data.main.humidity,
                code: data.weather[0].icon,
            }
        });
}

const useWeatherApi = (currentLocation) => {
    const [weatherElement, setweatherElement] = useState({
        observationTime: new Date(),
        locationName: '',
        description: '',
        temperature: 0,
        windSpeed: 0,
        humid: 0,
        code: '01d',
        isLoading: true
    });

    const fetchData = useCallback(() => {
        const fetchingData = async () => {
            const  [ weatherData ] = await Promise.all([fetchCurrentWeatherAPI(currentLocation)]);
            setweatherElement({
                ...weatherData,
                isLoading: false,
            });
        }

        setweatherElement(prevState => ({
            ...prevState,
            isLoading: true,
        }));

        fetchingData();
    }, [currentLocation]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return [weatherElement, fetchData];
}

export default useWeatherApi;