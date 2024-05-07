import React from 'react';
import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import { IoRainy } from 'react-icons/io5';
import { WiSunrise, WiCloudyGusts } from 'react-icons/wi';
import { GiWaterDrop } from 'react-icons/gi';
import { TbSunset2, TbUvIndex } from 'react-icons/tb';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { LuWind } from 'react-icons/lu';
import {
    getGustsColor,
    getHumidityColor,
    getPressureColor,
    getTempsColor,
    getUVColor,
} from '../Share/colorHelpers';
import {
    getImgDayCode,
    getImgNightCode,
} from '../Share/imgHelpers';
const Main = ({ data }) => {
    const conditionCode = data?.current?.condition?.code;
    const is_day = data?.current.is_day;

    let weatherImageDay;
    let weatherImageNight;

    if (conditionCode) {
        weatherImageDay = getImgDayCode(conditionCode);
        weatherImageNight = getImgNightCode(conditionCode);
    }
    return (
        <main className="">
            <div>
                {/* Current */}
                <div className="flex mt-2 flex-wrap flex-row ">
                    <div className="ssm:ml-0 ml-auto  flex-grow-0 flex-shrink md:basis-[28%] basis-[40%] ">
                        <span className="flex  justify-center">
                            <img
                                className="max-w-56 max-h-52"
                                src={
                                    is_day === 1
                                        ? weatherImageDay
                                        : weatherImageNight
                                }
                                alt=""
                            />
                        </span>
                    </div>
                    <div className="flex flex-grow-0 flex-shrink md:basis-[32%] basis-[50%] ssm:basis-[60%]">
                        <div className="flex-col flex-wrap h-full flex justify-center">
                            <p
                                style={{
                                    color: getTempsColor(data?.current.temp_c),
                                }}
                                className="ssm:text-8xl  font-bold ssm:mb-3 text-6xl"
                            >
                                {data?.current.temp_c}
                                <span className="ssm:text-6xl text-3xl ssm:leading-10 align-text-top leading-8">
                                    °
                                </span>{' '}
                            </p>
                            <div className="ssm:block hidden dark:text-[#CBCBCB]">
                                <p className=" text-xl ">
                                    {data?.current.condition.text}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex-grow flex-shrink-0 basis-full text-center text-[#445353] dark:text-[#CBCBCB]  -mt-4 mb-4 ssm:hidden">
                        <p className="text-lg font-normal ">
                            {data?.current.condition.text}
                        </p>
                    </div>
                    <div className="flex flex-grow-0 flex-shrink  lg:basis-[40%] md:basis-[40%] basis-full flex-row flex-wrap
                    
                    ">
                        <div
                            className="flex-grow-0 flex-shrink md:basis-[50%] md:pb-0 md:items-end
                            ssm:items-start ssm:basis-1/3  basis-[50%] items-end pb-4 ssm:pt-4 flex flex-col flex-nowrap"
                        >
                            <div className="md:pb-4 md:pt-4 flex-initial items-center ssm:text-left ssm:pb-2 ssm:pt-2 flex">
                                <div className="bg-gray-200 dark:bg-[#18448F] p-3 rounded-full md:p-3">
                                    <GoArrowDown className="w-6 h-6" />
                                </div>
                                <div className="ssm:justify-start ssm:flex-col pl-2 min-w-20">
                                    <h4 className="font-medium md:text-xl text-[#445353] dark:text-[#AFAFAF] leading-5 whitespace-nowrap text-ellipsis max-w-full mb-1">
                                        Min
                                    </h4>
                                    <h3 className="md:text-4xl font-bold">
                                        {Math.floor(
                                            data?.forecast.forecastday[0].day
                                                .mintemp_c
                                        )}
                                        <span className="ssm:align-text-top">
                                            °
                                        </span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div
                            className="flex-grow-0 flex-shrink md:basis-[50%] md:pb-0 md:items-end 
                            ssm:items-start basis-[50%] items-start ssm:basis-1/3 pb-4 ssm:pt-4 flex flex-col flex-nowrap"
                        >
                            <div className="md:pb-4 md:pt-4 flex-initial items-center ssm:text-left ssm:pb-2 ssm:pt-2 flex">
                                <div className="bg-gray-200 dark:bg-[#18448F] p-3 rounded-full md:p-3">
                                    <GoArrowUp className="w-6 h-6" />
                                </div>
                                <div className="ssm:justify-start ssm:flex-col pl-2 min-w-20">
                                    <h4 className="font-medium md:text-xl text-[#445353] dark:text-[#AFAFAF] leading-5 whitespace-nowrap text-ellipsis max-w-full mb-1">
                                        Max
                                    </h4>
                                    <h3 className="md:text-4xl  font-bold">
                                        {Math.floor(
                                            data?.forecast.forecastday[0].day
                                                .maxtemp_c
                                        )}
                                        <span className="ssm:align-text-top">
                                            °
                                        </span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="md:justify-end flex-grow-0 basis-auto flex-shrink md:basis-full ssm:flex items-center md:items-start hidden">
                            <p className="md:text-xl md:pb-0 md:pr-3 text-red-400">
                                Feels like {data?.current.feelslike_c}
                                <span>°</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* ForeCast Current detail */}
            <div className="flex flex-wrap mb-8 ">
                {/* Chance of rain */}
                <div className="currentDay mb-[2px] mr-0 ssm:mr-1 ssm:mb-4 md:mr-8">
                    <div className="md:pt-4 md:pb-4 pt-2 pb-2 flex">
                        <div className="flex md:p-3 items-center">
                            <IoRainy className="text-[#83b4cf] w-6 h-6" />
                        </div>
                        <div className="flex justify-between flex-grow  ssm:flex-col pl-[10px]">
                            <h4 className="mb-1 text-ellipsis max-w-full whitespace-nowrap dark:text-[#AFAFAF] text-[#6c7b7b]">
                                Chance of rain
                            </h4>
                            <h3 className="font-bold md:text-xl text">
                                {
                                    data?.forecast.forecastday[0]?.day
                                        ?.daily_chance_of_rain
                                }
                                <span>%</span>
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Wind */}
                <div className="currentDay mb-[2px] mr-0 ssm:mr-1 ssm:mb-4 md:mr-8">
                    <div className="md:pt-4 md:pb-4 pt-2 pb-2 flex">
                        <div className="flex md:p-3 items-center">
                            <LuWind className="text-[#ADD8E6] w-6 h-6" />
                        </div>
                        <div className="flex justify-between flex-grow ssm:flex-col pl-[10px]">
                            <h4 className="mb-1 text-ellipsis max-w-full whitespace-nowrap dark:text-[#AFAFAF] text-[#6c7b7b]">
                                Wind
                            </h4>
                            <h3 className="font-bold md:text-xl text">
                                {data?.current.wind_kph}
                                <span> km/h</span>
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Sunrise */}
                <div className="currentDay mb-[2px] mr-0 ssm:mr-1 ssm:mb-4 md:mr-8">
                    <div className="md:pt-4 md:pb-4 pt-2 pb-2 flex">
                        <div className="flex md:p-3 items-center">
                            <WiSunrise className="text-[#FFA500] w-6 h-6" />
                        </div>
                        <div className="flex justify-between flex-grow ssm:flex-col pl-[10px]">
                            <h4 className="mb-1 text-ellipsis max-w-full whitespace-nowrap dark:text-[#AFAFAF] text-[#6c7b7b]">
                                Sunrise
                            </h4>
                            <h3 className="font-bold md:text-xl text">
                                {data?.forecast.forecastday[0].astro.sunrise}
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Sunset */}
                <div className="currentDay mb-[2px] ssm:mb-4">
                    <div className="md:pt-4 md:pb-4 pt-2 pb-2 flex">
                        <div className="flex md:p-3 items-center">
                            <TbSunset2 className="text-[#FF4500] w-6 h-6" />
                        </div>
                        <div className="flex justify-between flex-grow ssm:flex-col pl-[10px]">
                            <h4 className="mb-1 text-ellipsis max-w-full whitespace-nowrap dark:text-[#AFAFAF] text-[#6c7b7b]">
                                Sunset
                            </h4>
                            <h3 className="font-bold md:text-xl text">
                                {data?.forecast.forecastday[0].astro.sunset}
                            </h3>
                        </div>
                    </div>
                </div>

                {/* UV */}
                <div className="currentDay mb-[2px] mr-0 ssm:mr-1 ssm:mb-4 md:mr-8">
                    <div className="md:pt-4 md:pb-4 pt-2 pb-2 flex">
                        <div className="flex md:p-3 items-center">
                            <TbUvIndex
                                style={{ color: getUVColor(data?.current.uv) }}
                                className={`w-6 h-6`}
                            />
                        </div>
                        <div className="flex justify-between flex-grow ssm:flex-col pl-[10px]">
                            <h4 className="mb-1 text-ellipsis max-w-full whitespace-nowrap dark:text-[#AFAFAF] text-[#6c7b7b]">
                                UV Index
                            </h4>
                            <h3
                                style={{ color: getUVColor(data?.current.uv) }}
                                className="font-bold md:text-xl text"
                            >
                                {data?.current.uv}
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Pressure */}
                <div className="currentDay mb-[2px] mr-0 ssm:mr-1 ssm:mb-4 md:mr-8">
                    <div className="md:pt-4 md:pb-4 pt-2 pb-2 flex">
                        <div className="flex md:p-3 items-center">
                            <FaArrowTrendUp
                                style={{
                                    color: getPressureColor(
                                        data?.current.pressure_mb
                                    ),
                                }}
                                className="text-[#83b4cf] w-6 h-6"
                            />
                        </div>
                        <div className="flex justify-between flex-grow ssm:flex-col pl-[10px]">
                            <h4 className="mb-1 text-ellipsis max-w-full whitespace-nowrap dark:text-[#AFAFAF] text-[#6c7b7b]">
                                Pressure
                            </h4>
                            <h3
                                style={{
                                    color: getPressureColor(
                                        data?.current.pressure_mb
                                    ),
                                }}
                                className="font-bold md:text-xl text"
                            >
                                {data?.current.pressure_mb}
                                <span> hPa</span>
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Humidity */}
                <div className="currentDay mb-[2px] mr-0 ssm:mr-1 ssm:mb-4 md:mr-8">
                    <div className="md:pt-4 md:pb-4 pt-2 pb-2 flex">
                        <div className="flex md:p-3 items-center">
                            <GiWaterDrop
                                style={{
                                    color: getHumidityColor(
                                        data?.current.humidity
                                    ),
                                }}
                                className=" w-6 h-6"
                            />
                        </div>
                        <div className="flex justify-between flex-grow ssm:flex-col pl-[10px]">
                            <h4 className="mb-1 text-ellipsis max-w-full whitespace-nowrap dark:text-[#AFAFAF] text-[#6c7b7b]">
                                Humidity
                            </h4>
                            <h3
                                style={{
                                    color: getHumidityColor(
                                        data?.current.humidity
                                    ),
                                }}
                                className="font-bold md:text-xl text"
                            >
                                {data?.current.humidity}
                                <span>%</span>
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Gusts */}
                <div className="currentDay mb-[2px] mr-0  ssm:mb-4">
                    <div className="md:pt-4 md:pb-4 pt-2 pb-2 flex">
                        <div className="flex md:p-3 items-center">
                            <WiCloudyGusts
                                style={{
                                    color: getGustsColor(
                                        data?.current.gust_kph
                                    ),
                                }}
                                className=" w-6 h-6"
                            />
                        </div>
                        <div
                            style={{
                                color: getGustsColor(data?.current.gust_kph),
                            }}
                            className="flex justify-between flex-grow ssm:flex-col pl-[10px]"
                        >
                            <h4 className="mb-1 text-ellipsis max-w-full whitespace-nowrap dark:text-[#AFAFAF] text-[#6c7b7b]">
                                Gusts
                            </h4>
                            <h3 className="font-bold md:text-xl text">
                                {data?.current.gust_kph}
                                <span> km/h</span>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Main;
