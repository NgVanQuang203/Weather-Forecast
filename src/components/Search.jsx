import React, { useEffect, useRef, useState } from 'react';
import {
    IoSearchOutline,
    IoSettingsSharp,
    IoSunnyOutline,
    IoMoonOutline,
} from 'react-icons/io5';
import { FaCircleXmark } from 'react-icons/fa6';
import { CiTempHigh } from 'react-icons/ci';
const Search = ({ data, onSearchChange, onToggleDarkMode }) => {
    const [inputSearch, setInputSearch] = useState(
        data?.location.name + ',' + data?.location.country
    );
    const inputRef = useRef();
    const [inputCheck, setInputCheck] = useState();
    const [isCheck, setIsCheck] = useState(false);
    const menuRef = useRef();

    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        onToggleDarkMode(!darkMode);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Ngăn chặn form submit mặc định (nếu bạn đặt input trong form)
            onSearchChange(inputSearch); // Gọi hàm onSearchChange với giá trị input hiện tại
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsCheck(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isCheck]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 'k') {
                setDarkMode(!darkMode);
                onToggleDarkMode(!darkMode)
                // Thực hiện hành động của bạn tại đây
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Dọn dẹp khi component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [darkMode, onToggleDarkMode]);

    return (
        <div className="pb-1">
            <div className="flex justify-center items-center">
                {/* Search */}
                <div
                    className={`rounded-3xl dark:bg-[#1C489C] dark:border-[#1C489C]
                     bg-gray-200 h-12 text-base border-2 w-full transition-all duration-200  ${inputCheck}`}
                >
                    <div className="flex px-4 justify-center items-center ">
                        <div className="w-10 px-2 h-11 flex justify-center items-center">
                            <IoSearchOutline className="w-5 h-5 " />
                        </div>
                        <input
                            className={`bg-gray-200 dark:bg-[#1C489C] w-full outline-0 h-11 py-2 px-3 outline-none rounded-3xl ${inputCheck} `}
                            type="text"
                            ref={inputRef}
                            onKeyDown={handleKeyDown}
                            value={inputSearch}
                            onChange={(e) => setInputSearch(e.target.value)}
                            onFocus={() => {
                                setInputCheck(
                                    'border-[#077187] dark:border-[#077187] dark:bg-[#021E3E]'
                                );
                            }}
                            onBlur={() => {
                                setInputCheck('');
                            }}
                            name="search"
                            placeholder="Search for a location"
                            id=""
                        />
                        {inputSearch ? (
                            <div
                                onClick={() => setInputSearch('')}
                                className="flex justify-center items-center cursor-pointer"
                            >
                                <FaCircleXmark />
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
                <div className="relative">
                    <button
                        ref={menuRef}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsCheck(!isCheck);
                        }}
                        className={`outline-none h-12 w-12 flex justify-center items-center dark:bg-[#1C489C]
                        bg-gray-200 rounded-full ml-4 border-2  dark:border-[#1C489C] dark:hover:border-[#077187]
                        transition-all duration-300 dark:hover:bg-[#021E3E]
                         ${
                             isCheck
                                 ? 'border-[#077187] dark:border-[#077187]'
                                 : ''
                         }`}
                    >
                        <IoSettingsSharp className="w-6 h-6" />
                    </button>
                    {isCheck ? (
                        <div
                            ref={menuRef}
                            className={` bg-white dark:bg-[#021E3E] mt-2 right-0 w-64 absolute rounded-md shadow-xl transition-all ease-in duration-500`}
                        >
                            {/* Theme */}
                            <div className="px-3 py-2 hover:rounded-md hover:bg-gray-200 cursor-pointer dark:hover:bg-[#18448F]">
                                <button
                                    onClick={toggleDarkMode}
                                    className="flex w-full h-full items-center justify-between outline-none"
                                >
                                    {darkMode ? (
                                        <IoSunnyOutline className="h-6 w-6 mr-3" />
                                    ) : (
                                        <IoMoonOutline className="h-6 w-6 mr-3" />
                                    )}
                                    <p className="mr-auto ">
                                        {darkMode ? 'Light' : 'Dark'}
                                    </p>
                                    <p className="ml-2 w-20">(Ctrl + K)</p>
                                </button>
                            </div>
                            <div className="px-3 py-2 hover:bg-gray-200 dark:hover:bg-[#18448F] cursor-pointer">
                                <button className="flex w-full h-full items-center justify-between outline-none">
                                    <CiTempHigh className="h-6 w-6 mr-3" />
                                    <p className="mr-auto ">Fahrenheit</p>
                                    <p className="ml-2 w-20">(Ctrl + I)</p>
                                </button>
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
