import React from 'react';
import { getHours } from '../Share/timeHelpers';
import { getImgDayCode, getImgNightCode } from '../Share/imgHelpers';

const Hourly = ({ data }) => {
    const filteredForecast = getHours(data, 7, 8);

    let weatherImageDay;
    let weatherImageNight;

    return (
        <section>
            <h2 className="mt-5 mb-5 text-2xl font-semibold">Hourly</h2>
            <div className="mb-4">
                <div className="flex flex-wrap">
                    {filteredForecast?.map((item, index) => {
                        // Perform the calculation before the return statement
                        const entryTime = new Date(item.time_epoch * 1000); // Make sure to multiply by 1000 to convert to milliseconds
                        const options = {
                            hour: 'numeric',
                            hour12: true,
                        };
                        
                        const is_Day = item?.is_day;
                        const itemPerRow = 4;
                        const conditionCode = item?.condition?.code;
                        if (conditionCode) {
                            weatherImageDay = getImgDayCode(conditionCode);
                            weatherImageNight = getImgNightCode(conditionCode);
                        }

                        return (
                            <div style={{marginRight: (index + 1) % 8 === 0 ? '0px' : ''}}
                                key={index}
                                className={`hourly bg-gray-200 dark:bg-[#3362AB3D] rounded-xl   ${
                                    (index + 1) % itemPerRow !== 0
                                        ? 'mr-[6px] md:mr-3'
                                        : 'mr-0 ssm:mr-[6px] md:mr-3'
                                } mb-[6px] ssm:mb-0 `}
                            >
                                <section className='text-center' >
                                    <div className="mt-4">
                                        <div className="mb-4">
                                            <div className="text-center">
                                                <p className="text-[16px] mb-1 text-[#445353] dark:text-[#CBCBCB]">
                                                    {entryTime.toLocaleTimeString(
                                                        'en-US',
                                                        options
                                                    )}
                                                    {/* You can format the date as needed */}
                                                </p>
                                                <span className='flex items-center justify-center'>
                                                    <img className='w-16 h-16 text-center'
                                                        src={
                                                            is_Day === 1
                                                                ? weatherImageDay
                                                                : weatherImageNight
                                                        }
                                                        alt=""
                                                    />
                                                </span>
                                                <p className="text-lg mt-1">
                                                    {Math.floor(item.temp_c)}
                                                    <span>°</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Hourly;
