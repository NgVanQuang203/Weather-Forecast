import { useEffect, useState } from 'react';
import Main from './components/Main';
import Search from './components/Search';
import axios from 'axios';
import Loading from './Share/Loading';
import Hourly from './components/Hourly';
import ThisWeek from './components/ThisWeek';
import Alerts from './components/Alerts';
const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;
function App() {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [ip, setIP] = useState(localStorage.getItem('IP'));
    const [query, setQuery] = useState();
    const [isDarkMode, setIsDarkMode] = useState(false)

    const handleSearchChange = (searchValue) => {
        setQuery(searchValue);
    };

    useEffect(() =>{
        document.body.classList.toggle('dark', isDarkMode);
    }, [isDarkMode])

    const handleDarkMode = () =>{
        setIsDarkMode(!isDarkMode);
    }

    useEffect(() => {
        if (ip) return;
        setIsLoading(true);
        const getIpAdress = async () => {
            try {
                const response = await axios.get(
                    'https://api.ipify.org?format=json'
                );
                localStorage.setItem('IP', response.data.ip);
                setIP(response.data.ip);
            } catch (error) {
                console.log('Error API ', error);
            } finally {
                setIsLoading(false);
            }
        };
        getIpAdress();
    }, [ip]);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async (query) => {
            try {
                const response = await axios.get(
                    `${apiUrl}?key=${apiKey}&q=${query}&days=6&aqi=yes&alerts=yes`
                );
                setData(response.data);
            } catch (error) {
                console.log('API Error', error);
            } finally {
                setIsLoading(false);
            }
        };
        if (!ip) {
            const getIpAdress = async () => {
                try {
                    const response = await axios.get(
                        'https://api.ipify.org?format=json'
                    );
                    localStorage.setItem('IP', response.data.ip);
                    setIP(response.data.ip);
                    fetchData(response.data.ip);
                } catch (error) {
                    console.log('Error API ', error);
                } finally {
                    setIsLoading(false);
                }
            };
            getIpAdress();
        } else if (query) {
            fetchData(query);
        } else {
            fetchData(ip);
        }
    }, [query, ip]);
    return (
        <div className="flex justify-center items-center min-h-screen">
            {isLoading ? (
                <Loading />
            ) : (
                <div className=" max-w-[1000px]  mr-auto ml-auto px-3 pt-8 w-full">
                    {data && (
                        <Search
                            onToggleDarkMode = {handleDarkMode}
                            onSearchChange={handleSearchChange}
                            data={data}
                        />
                    )}
                    {data && <Main data={data} />}
                    {data && <Hourly data={data} />}
                    {data && <ThisWeek data={data} />}
                    {data && <Alerts data={data} />}
                </div>
            )}
        </div>
    );
}

export default App;
