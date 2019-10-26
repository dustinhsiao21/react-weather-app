export const locations = [
    'Sydney', 'Melbourne', 'Perth', 'Brisbane', 'Adelaide', 'Hobart',
    'Darwin', 'Canberra', 'Gold Coast', 'New Castle'
];

export const findLocations = (cityName) => {
    return locations.find( location => location === cityName );
}