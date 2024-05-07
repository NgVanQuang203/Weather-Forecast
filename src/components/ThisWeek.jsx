import React, { useEffect, useState } from 'react';
import { getDay } from '../Share/timeHelpers';
import { getImgDayCode } from '../Share/imgHelpers';
import { IoInformationCircleOutline, IoRainy } from 'react-icons/io5';
import { GiWaterDrop } from 'react-icons/gi';
import { PiWindLight } from 'react-icons/pi';
import { TbUvIndex } from 'react-icons/tb';
import {
    getHumidityColor,
    getTempsColor,
    getUVColor,
} from '../Share/colorHelpers';

const ThisWeek = ({ data }) => {
    const [is_OpenMenu, setIsOpenMenu] = useState(false);
    const [visibleIndex, setvisibleIndex] = useState(null);
    const toggleVisibility = (index, event) => {
        event.stopPropagation();
        if (visibleIndex === index) {
            setvisibleIndex(null);
        } else {
            setvisibleIndex(index);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                visibleIndex !== null &&
                !event.target.closest('.detail-container')
            ) {
                setvisibleIndex(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [visibleIndex]);
    return (
        <section>
            <div className="flex flex-row flex-grow justify-between items-center">
                <h2 className="text-2xl font-semibold mt-5 mb-5">This Week</h2>
                <button
                    onClick={() => setIsOpenMenu(!is_OpenMenu)}
                    className={`outline-none w-9 h-9 bg-gray-200 rounded-full dark:bg-[#3362AB3D] dark:border-0
                    dark:hover:border-2
                    flex justify-center items-center border-2 hover:border-[#077187] dark:hover:border-[#077187]
                     ${is_OpenMenu ? 'border-[3px] border-[#077187]' : ''} `}
                >
                    <svg
                        className={`${
                            is_OpenMenu ? 'block' : 'hidden'
                        } dark:text-[#f6f6f6] transition-all duration-300  cq ___12fm75w f1w7gpdv fez10in fg4l7m0`}
                        color="#445353"
                        fill="currentColor"
                        aria-hidden="true"
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8.75 13C9.99 13 11 14 11 15.25v3.5C11 19.99 10 21 8.75 21h-3.5C4.01 21 3 20 3 18.75v-3.5C3 14.01 4 13 5.25 13h3.5zm10 0c1.24 0 2.25 1 2.25 2.25v3.5c0 1.24-1 2.25-2.25 2.25h-3.5C14.01 21 13 20 13 18.75v-3.5c0-1.24 1-2.25 2.25-2.25h3.5zm-10 1.5h-3.5a.75.75 0 00-.75.75v3.5c0 .41.34.75.75.75h3.5c.41 0 .75-.34.75-.75v-3.5a.75.75 0 00-.75-.75zm10 0h-3.5a.75.75 0 00-.75.75v3.5c0 .41.34.75.75.75h3.5c.41 0 .75-.34.75-.75v-3.5a.75.75 0 00-.75-.75zM8.75 3C9.99 3 11 4 11 5.25v3.5C11 9.99 10 11 8.75 11h-3.5C4.01 11 3 10 3 8.75v-3.5C3 4.01 4 3 5.25 3h3.5zm10 0C19.99 3 21 4 21 5.25v3.5C21 9.99 20 11 18.75 11h-3.5C14.01 11 13 10 13 8.75v-3.5C13 4.01 14 3 15.25 3h3.5zm-10 1.5h-3.5a.75.75 0 00-.75.75v3.5c0 .41.34.75.75.75h3.5c.41 0 .75-.34.75-.75v-3.5a.75.75 0 00-.75-.75zm10 0h-3.5a.75.75 0 00-.75.75v3.5c0 .41.34.75.75.75h3.5c.41 0 .75-.34.75-.75v-3.5a.75.75 0 00-.75-.75z"
                            fill="currentColor"
                        ></path>
                    </svg>
                    <svg
                        className={`${
                            is_OpenMenu ? 'hidden' : 'block'
                        } transition-all dark:text-[#f6f6f6] duration-300 cq ___12fm75w f1w7gpdv fez10in fg4l7m0`}
                        color="#445353"
                        fill="currentColor"
                        aria-hidden="true"
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3 6.25C3 4.45 4.46 3 6.25 3h11.5C19.55 3 21 4.46 21 6.25v11.5c0 1.8-1.46 3.25-3.25 3.25H6.25A3.25 3.25 0 013 17.75V6.25zM6.25 4.5c-.97 0-1.75.78-1.75 1.75v5h6.75V4.5h-5zm5 8.25H4.5v5c0 .97.78 1.75 1.75 1.75h5v-6.75zm1.5 0v6.75h5c.97 0 1.75-.78 1.75-1.75v-5h-6.75zm6.75-1.5v-5c0-.97-.78-1.75-1.75-1.75h-5v6.75h6.75z"
                            fill="currentColor"
                        ></path>
                    </svg>
                </button>
            </div>
            <div>
                <div
                    className={`${
                        is_OpenMenu ? 'hidden' : 'flex'
                    } mb-8 flex-wrap`}
                >
                    {data.forecast.forecastday.map((item, index) => {
                        const getDayofWeek = getDay(item);
                        const conditionCode = item?.day.condition?.code;
                        let weatherImageDay;
                        if (conditionCode) {
                            weatherImageDay = getImgDayCode(conditionCode);
                        }
                        return (
                            <div
                                key={index}
                                className={` ${
                                    is_OpenMenu ? 'hidden' : ''
                                }  card-tw   mb-[6px] lg:mb-3  ${
                                    (index + 1) % 2 === 0
                                        ? 'mr-0 md:mr-[6px]'
                                        : 'mr-[6px]'
                                } ${
                                    (index + 1) % 3 === 0
                                        ? 'lg:mr-0'
                                        : 'lg:mr-3'
                                } transition-all duration-700 ease-in-out relative `}
                            >
                                <div className="bg-gray-200 dark:dark:bg-[#3362AB3D] rounded-xl">
                                    <div className="flex ">
                                        <div className="flex-grow-0 flex-shrink basis-[40%]">
                                            <span className="max-w-full">
                                                <img
                                                    className="w-full h-full"
                                                    src={weatherImageDay}
                                                    alt=""
                                                />
                                            </span>
                                        </div>
                                        <div className="flex items-start flex-wrap relative flex-auto">
                                            <div
                                                className=" flex-grow ssm:flex-shrink-0 flex-shrink ssm:basis-full basis-[40%] 
                                                text-left text-[#445353] "
                                            >
                                                {/* Day */}
                                                <div className="text-left font-semibold mt-2 flex items-center justify-between dark:text-[#CBCBCB]">
                                                
                                                    {getDayofWeek.day}
                                                    <span className="top-2 right-2 absolute">
                                                        <button
                                                            onClick={(e) => {
                                                                toggleVisibility(
                                                                    index,
                                                                    e
                                                                );
                                                            }}
                                                            className={`${
                                                                visibleIndex ===
                                                                index
                                                                    ? 'border-[#077187]'
                                                                    : ''
                                                            } detail-container outline-none w-8 h-8 border-2
                                                                 flex justify-center items-center 
                                                                 rounded-full hover:border-[#077187]
                                                                dark:border-0 dark:hover:border-2  dark:hover:border-[#077187]`}
                                                        >
                                                            <IoInformationCircleOutline className="w-6 h-6" />
                                                        </button>
                                                    </span>
                                                </div>

                                                <span className="text-xs uppercase dark:text-[#AFAFAF]">
                                                    {getDayofWeek.date}{' '}
                                                    {getDayofWeek.month}
                                                </span>
                                            </div>
                                            <div className="flex ssm:ml-0 flex-grow flex-shrink basis-full">
                                                <p className="ssm:text-2xl text-[16px] font-extrabold flex-grow-0 flex-shrink-0 basis-1/2 text-left">
                                                    {Math.floor(
                                                        item.day.mintemp_c
                                                    )}
                                                    °
                                                    <span className="text-xs font-medium w-full flex dark:text-[#CBCBCB]">
                                                        min
                                                    </span>
                                                </p>
                                                <p className="ssm:text-2xl text-[16px] font-extrabold flex-grow-0 flex-shrink-0 basis-1/2 text-left">
                                                    {Math.floor(
                                                        item.day.maxtemp_c
                                                    )}
                                                    °
                                                    <span className="text-xs font-medium w-full flex dark:text-[#CBCBCB]">
                                                        max
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {visibleIndex === index && (
                                    <div
                                        className={`bg-white dark:bg-[#021e3e] detail-container transition-all duration-500 ease-in-out rounded-md z-50 shadow-lg w-52 absolute top-11 ${
                                            (index + 1) % 2 !== 0
                                                ? '-right-5'
                                                : 'right-3'
                                        }  md:right-3`}
                                    >
                                        <ul className="list-none flex flex-col flex-nowrap ">
                                            <li className="flex p-3 flex-row justify-between items-center">
                                                <span className="flex font-semibold items-center">
                                                    <PiWindLight className="w-5 h-5 mr-2" />
                                                    Wind
                                                </span>
                                                <span>
                                                    {item.day.maxwind_kph} km/h
                                                </span>
                                            </li>
                                            <li className="flex p-3 flex-row justify-between items-center">
                                                <span className="flex font-semibold items-center">
                                                    <IoRainy className="w-5 h-5 mr-2" />
                                                    Rain chance
                                                </span>
                                                <span>
                                                    {
                                                        item.day
                                                            .daily_chance_of_rain
                                                    }{' '}
                                                    %
                                                </span>
                                            </li>
                                            <li className="flex p-3 flex-row justify-between items-center">
                                                <span className="flex font-semibold items-center">
                                                    <GiWaterDrop
                                                        style={{
                                                            color: getHumidityColor(
                                                                Math.floor(
                                                                    item.day
                                                                        .avghumidity
                                                                )
                                                            ),
                                                        }}
                                                        className="w-5 h-5 mr-2"
                                                    />
                                                    Humidity
                                                </span>
                                                <span
                                                    style={{
                                                        color: getHumidityColor(
                                                            Math.floor(
                                                                item.day
                                                                    .avghumidity
                                                            )
                                                        ),
                                                    }}
                                                >
                                                    {item.day.avghumidity} %
                                                </span>
                                            </li>
                                            <li className="flex p-3 flex-row justify-between items-center">
                                                <span className="flex font-semibold items-center">
                                                    <TbUvIndex
                                                        style={{
                                                            color: getUVColor(
                                                                Math.floor(
                                                                    item.day.uv
                                                                )
                                                            ),
                                                        }}
                                                        className="w-5 h-5 mr-2"
                                                    />
                                                    UV Index
                                                </span>
                                                <span
                                                    style={{
                                                        color: getUVColor(
                                                            Math.floor(
                                                                item.day.uv
                                                            )
                                                        ),
                                                    }}
                                                >
                                                    {item.day.uv}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className="bg-slate-50 overflow-auto">
                    <table
                        className={`${
                            is_OpenMenu ? '' : 'hidden'
                        } border-spacing-0 min-w-full transition-all duration-700 ease-in`}
                    >
                        <thead className="bg-[#f6f6f7] z-[1] ">
                            <tr className="">
                                <th className="border-b  border-b-[#d8d8d9] align-top pt-4 pb-4 text-lg top-0 sticky pr-4 pl-4 whitespace-nowrap text-left font-medium">
                                    Day
                                </th>
                                <th className="border-b border-b-[#d8d8d9] align-top pt-4 pb-4 text-lg top-0 sticky pr-4 pl-4 whitespace-nowrap  text-right font-medium">
                                    Chance of rain
                                </th>
                                <th className="border-b border-b-[#d8d8d9] align-top pt-4 pb-4 text-lg top-0 sticky pr-4 pl-4 whitespace-nowrap  text-right font-medium">
                                    Humidity
                                </th>
                                <th className="border-b border-b-[#d8d8d9] align-top pt-4 pb-4 text-lg top-0 sticky pr-4 pl-4 whitespace-nowrap text-right  font-medium">
                                    UV Index
                                </th>
                                <th className="border-b border-b-[#d8d8d9] align-top pt-4 pb-4 text-lg top-0 sticky pr-4 pl-4 whitespace-nowrap  text-right font-medium">
                                    Min
                                </th>
                                <th className="border-b border-b-[#d8d8d9] align-top pt-4 pb-4 text-lg top-0 sticky pr-4 pl-4 whitespace-nowrap  text-right font-medium">
                                    Max
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.forecast.forecastday.map((item, index) => {
                                const getDayofWeek = getDay(item);
                                const conditionCode = item?.day.condition?.code;
                                let weatherImageDay;
                                if (conditionCode) {
                                    weatherImageDay =
                                        getImgDayCode(conditionCode);
                                }

                                return (
                                    <tr key={index}>
                                        <td
                                            key={index}
                                            className="border-b border-b-[#d8d8d9] align-top pt-4 pb-4 text-sm top-0 sticky pr-4 pl-4 whitespace-nowrap text-left font-medium"
                                        >
                                            <div className="flex items-center text-[#2e3535]">
                                                <span className="md:block hidden">
                                                    <img
                                                        className="w-10 h-10"
                                                        src={weatherImageDay}
                                                        alt=""
                                                    />
                                                </span>
                                                <span className="md:ml-2">
                                                    {getDayofWeek.day}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="border-b border-b-[#d8d8d9] align-top pt-4 pb-4 text-sm top-0 sticky pr-4 pl-4 whitespace-nowrap ssm:text-right text-center font-medium">
                                            <span>
                                                {item.day.daily_chance_of_rain}%
                                            </span>
                                        </td>
                                        <td className="border-b border-b-[#d8d8d9] align-top pt-4 pb-4 text-sm top-0 sticky pr-4 pl-4 whitespace-nowrap ssm:text-right text-center font-medium">
                                            <span
                                                style={{
                                                    color: getHumidityColor(
                                                        Math.floor(
                                                            item.day.avghumidity
                                                        )
                                                    ),
                                                }}
                                            >
                                                {item.day.avghumidity}%
                                            </span>
                                        </td>
                                        <td className="border-b border-b-[#d8d8d9] align-top pt-4 pb-4 text-sm top-0 sticky pr-4 pl-4 whitespace-nowrap ssm:text-right text-center font-medium">
                                            <span
                                                style={{
                                                    color: getUVColor(
                                                        Math.floor(item.day.uv)
                                                    ),
                                                }}
                                            >
                                                {item.day.uv}
                                            </span>
                                        </td>
                                        <td
                                            className={` border-b border-b-[#d8d8d9] align-top pt-4 pb-4 text-sm top-0 sticky pr-4 pl-4 whitespace-nowrap ssm:text-right font-medium`}
                                        >
                                            <span
                                                style={{
                                                    color: getTempsColor(
                                                        Math.floor(
                                                            item.day.mintemp_c
                                                        )
                                                    ),
                                                }}
                                            >
                                                {Math.floor(item.day.mintemp_c)}
                                                %
                                            </span>
                                        </td>
                                        <td
                                            className={` border-b border-b-[#d8d8d9] align-top pt-4 pb-4 text-sm top-0 sticky pr-4 pl-4 whitespace-nowrap ssm:text-right font-medium`}
                                        >
                                            <span
                                                style={{
                                                    color: getTempsColor(
                                                        Math.floor(
                                                            item.day.maxtemp_c
                                                        )
                                                    ),
                                                }}
                                            >
                                                {Math.floor(item.day.maxtemp_c)}
                                                %
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default ThisWeek;
