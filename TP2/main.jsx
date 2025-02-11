const url = "mongodb+srv://rigaziomalena:IaKCoI2gqj1EYd1B@cluster0.qqha2ia.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const API_KEY = '30d38b26954359266708f92e1317dac0';

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [cityNotFound, setCityNotFound] = useState(false);

    useEffect(() => {
        fetchWeatherData('Tucuman');
    }, []);

    const fetchWeatherData = async (city) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=es&units=metric`);
            const data = await response.json();
            if (response.ok) {
                setWeatherData(data);
                setCityNotFound(false);
                setSearchQuery('');
            } 
            else {
                setCityNotFound(true);
            }
        } 
        catch (error) {
            console.error('Error al obtener datos meteorológicos.', error);
        }
    };

    const handleCityClick = (city) => {
        fetchWeatherData(city);
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        fetchWeatherData(searchQuery);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            fetchWeatherData(searchQuery);
        }
    };

    return (
        <>
            <nav>
                <ul>
                <li><strong>Clima</strong></li>
                </ul>
                <ul>
                    <li><a href="#" onClick={() => {handleCityClick('Tucuman'); setSearchQuery('');}}>Tucumán</a></li>
                    <li><a href="#" onClick={() => {handleCityClick('Salta'); setSearchQuery('');}}>Salta</a></li>
                    <li><a href="#" onClick={() => {handleCityClick('Buenos Aires'); setSearchQuery('');}}>Buenos Aires</a></li>
                </ul>
            </nav>

            <form onSubmit={handleSearchSubmit}>
                <input
                    type="search" name="search" value={searchQuery} onChange={handleSearchInputChange} onKeyPress={handleKeyPress} 
                    placeholder="Buscar ciudad" aria-label="Buscar ciudad"/>
            </form>

            <div className="pError">
            {cityNotFound && <p className="errorCiudad">Ciudad no encontrada.</p>}
            </div>

            {weatherData && !cityNotFound && (
                <article>

                    <header style={{ backgroundColor: 'White' }}>{weatherData.name}</header >

                    <div className="marco">
                        <img src={`iconos/${weatherData.weather[0].icon}.svg`} alt={weatherData.weather[0].description} height="48" />
                    </div>

                    <footer style={{ backgroundColor: 'White' }} >
                        <h6 className="Temp">Temperatura: {weatherData.main.temp}°C</h6>
                        <p>Máxima: {weatherData.main.temp_max}°C / Mínima: {weatherData.main.temp_min}°C</p>
                        <p>Humedad: {weatherData.main.humidity}%</p>
                    </footer>

                </article>
            )}
        </>
    );
}