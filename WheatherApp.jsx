import { useState } from "react";

export const WeatherApp = () => {
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather';
    const API_KEY = 'e9dca2979412103dba727c6f6472310c'; // 

    const [ciudad, setCiudad] = useState('');
    const [dataClima, setDataClima] = useState(null);
    const [error, setError] = useState(null);

    const handleCambioCiudad = (e) => setCiudad(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (ciudad.trim().length > 0) fetchClima();
    };

    const fetchClima = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${ciudad}&units=metric&appid=${API_KEY}`);
            const data = await response.json();
            console.log("Respuesta del servidor:", data);

            if (response.ok) {
                setDataClima(data);
                setError(null);
            } else {
                setError(data.message || "Error desconocido");
                setDataClima(null);
            }
        } catch (error) {
            console.error('Ocurrió el siguiente problema: ', error);
            setError('No se pudo obtener la información del clima.');
            setDataClima(null);
        }
    };

    return (
        <div className="container">
            <h1>Aplicación del Clima</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={ciudad}
                    onChange={handleCambioCiudad}
                    placeholder="Escribe una ciudad"
                />
                <button type="submit">Buscar</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {dataClima && dataClima.main && dataClima.weather && (
                <div>
                    <h2>{dataClima.name}</h2>
                    <p>Temperatura: {Math.round(dataClima.main.temp)}ºC</p>
                    <p>Condición meteorológica: {dataClima.weather[0]?.description}</p>
                    <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0]?.icon}@2x.png`} alt="Icono del clima"/>
                </div>
            )}
        </div>
    );
};
