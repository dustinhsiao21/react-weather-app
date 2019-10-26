import React, {useState, useEffect, useMemo} from 'react';
import styled from 'styled-components';

import { ReactComponent as DayClearIcon } from './images/day/dayClear.svg';
import { ReactComponent as NightClearIcon } from './images/day/nightClear.svg';
import { ReactComponent as DayCloudyIcon } from './images/day/dayCloudy.svg';
import { ReactComponent as NightCloudyIcon } from './images/day/nightCloudy.svg';
import { ReactComponent as ScatteredCloudsIcon } from './images/day/scatteredClouds.svg';
import { ReactComponent as ShowerRainIcon } from './images/day/showerRain.svg';
import { ReactComponent as DayRainIcon } from './images/day/dayRain.svg';
import { ReactComponent as NightRainIcon } from './images/day/nightRain.svg';
import { ReactComponent as DayThunderstormIcon } from './images/day/dayThunderstorm.svg';
import { ReactComponent as NightThunderstormIcon } from './images/day/nightThunderstorm.svg';
import { ReactComponent as SnowIcon } from './images/day/snow.svg';
import { ReactComponent as MistIcon } from './images/day/mist.svg';

const IconContainer = styled.div`
    flex-basis: 30%;
    svg {
        max-height: 110px;
    }
`;
const WeatherTypeTransform = {
    '01d': <DayClearIcon />,
    '01n': <NightClearIcon />,
    '02d': <DayCloudyIcon />,
    '02n': <NightCloudyIcon />,
    '03d': <ScatteredCloudsIcon />,
    '03n': <ScatteredCloudsIcon />,
    '04d': <ScatteredCloudsIcon />,
    '04n': <ScatteredCloudsIcon />,
    '09n': <ShowerRainIcon />,
    '09d': <ShowerRainIcon />,
    '10d': <DayRainIcon />,
    '10n': <NightRainIcon />,
    '11d': <DayThunderstormIcon />,
    '11n': <NightThunderstormIcon />,
    '13d': <SnowIcon />,
    '13n': <SnowIcon />,
    '50d': <MistIcon />,
    '50n': <MistIcon />,
};

const WeatherIcon = ({currentWeatherCode}) => {
    const [currentWeatherIcon, setCurrentWeatherIcon] = useState('01d');

    const theWeathrerIcon = useMemo(() => WeatherTypeTransform[currentWeatherCode], [currentWeatherCode]);
    
    useEffect(() => {
        setCurrentWeatherIcon(theWeathrerIcon);
    }, [theWeathrerIcon]);

    return (
        <IconContainer>
            {currentWeatherIcon}
        </IconContainer>
    )
}

export default WeatherIcon;
