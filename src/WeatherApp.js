import React, { useState, useEffect } from 'react';
import './WeatherApp.css';
import styled, {ThemeProvider} from 'styled-components';
import WeatherCard from './WeatherCard';
import WeatherSetting from './WeatherSetting';
import useWeatherApi from './useWeatherApi';
import { findLocations } from './utils';

const theme = {
    light: {
        backgroundColor: '#ededed',
        foregroundColor: '#f9f9f9',
        boxShadow: '0 1px 3px 0 #999999',
        titleColor: '#212121',
        temperatureColor: '#757575',
        textColor: '#828282',
    },
    dark: {
        backgroundColor: '#1F2022',
        foregroundColor: '#121416',
        boxShadow:
        '0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)',
        titleColor: '#f9f9fa',
        temperatureColor: '#dddddd',
        textColor: '#cccccc',
    },
};

const Container = styled.div`
    background-color: ${ ({ theme }) => theme.backgroundColor};
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const WeatherApp = () => {
    const storageCity = localStorage.getItem('cityName');
    const [currentCity, setCurrentCity] = useState(storageCity || 'Sydney');
    const [currentTheme, setCurrentTheme] = useState('light');
    const [currentPage, setCurrentPage] = useState('WeatherCard');

    const currentLocation = findLocations(currentCity) || {};

    const [weatherElement, fetchData] = useWeatherApi(currentLocation);
    const { code } = weatherElement;

    useEffect(() => {
        let moment = code[code.length - 1];
        setCurrentTheme( moment === 'd' ? 'light' : 'dark')
    }, [code]);

    useEffect(() => {
        localStorage.setItem('cityName', currentCity);
    }, [currentCity])


    return (
        <ThemeProvider theme={theme[currentTheme]}>
            <Container>
                {currentPage === 'WeatherCard' && (
                <WeatherCard
                    cityName={currentLocation} 
                    weatherElement={weatherElement}
                    fetchData={fetchData}
                    setCurrentPage={setCurrentPage}
                />
                )}
                {currentPage === 'WeatherSetting' && ( 
                    <WeatherSetting 
                        setCurrentPage={setCurrentPage}
                        cityName={currentLocation}
                        setCurrentCity={setCurrentCity}
                    /> 
                )}
            </Container>
        </ThemeProvider>
    );
}

export default WeatherApp;