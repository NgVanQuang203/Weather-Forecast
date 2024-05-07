import React from 'react';
import { PiWarningFill } from 'react-icons/pi';
import { AiFillSafetyCertificate } from 'react-icons/ai';
const Alerts = ({ data }) => {
    return (
        <div className='mb-20'>
            <h2 className="text-2xl mt-2 mb-5 font-semibold">Alerts</h2>
            {data.alerts.alert.length !== 0 ? (
                data.alerts.alert.map((item, index) => (
                    <div
                        key={index}
                        className="w-full "
                    >
                        <div className="mt-4 mb-4 grid gap-4 grid-rows-1 grid-cols-min-auto-min bg-[#ffefed] rounded-lg">
                            <div className="pl-4 flex  items-center">
                                <PiWarningFill className="w-7 h-7 text-[#fe6464]" />
                            </div>
                            <div className="pt-4 pb-4 flex justify-center flex-col dark:text-[#000000]">
                                <div className="text-lg font-medium">
                                    {item.headline}
                                </div>
                                <div className="font-normal">
                                    {item.instruction}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="w-full ">
                    <div className="mt-4 mb-4 grid gap-4 grid-rows-1 grid-cols-min-auto-min bg-[#CCFFCC] rounded-lg">
                        <div className="pl-4 flex  items-center">
                            <AiFillSafetyCertificate className="w-7 h-7 text-[#00FF00]" />
                        </div>
                        <div className="pt-4 pb-4 flex justify-center flex-col dark:text-[#333333]">
                            <div className="text-lg font-medium">
                                Weather Update: Stable Conditions with No
                                Natural Disasters Expected
                            </div>
                            <div className="font-normal">
                                The current weather is safe and there is no
                                danger. Enjoy a wonderful day!
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Alerts;
