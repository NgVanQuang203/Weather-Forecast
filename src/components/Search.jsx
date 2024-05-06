import React, { useEffect, useRef, useState } from 'react';
import {
    IoSearchOutline,
    IoSettingsSharp,
    IoSunnyOutline,
} from 'react-icons/io5';
import { FaCircleXmark } from 'react-icons/fa6';
import { CiTempHigh } from 'react-icons/ci';
const Search = ({ data, onSearchChange }) => {
    const [inputSearch, setInputSearch] = useState(data?.location.name+','+ data?.location.country);
    const inputRef = useRef();
    const [inputCheck, setInputCheck] = useState();
    const [isCheck, setIsCheck] = useState(false);
    const menuRef = useRef();

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

    return (
        <div className="pb-1">
            <div className="flex justify-center items-center">
                {/* Search */}
                <div
                    className={`rounded-3xl bg-gray-200 h-12 text-base border-2 w-full transition-all duration-200  ${inputCheck} `}
                >
                    <div className="flex px-4 justify-center items-center">
                        <div className="w-10 px-2 h-11 flex justify-center items-center">
                            <IoSearchOutline className="w-5 h-5 " />
                        </div>
                        <input
                            className="bg-gray-200 w-full outline-0 h-11 py-2 px-3 outline-none rounded-3xl"
                            type="text"
                            ref={inputRef}
                            onKeyDown={handleKeyDown}
                            value={inputSearch}
                            onChange={(e) => setInputSearch(e.target.value)}
                            onFocus={() => {
                                setInputCheck('border-[#077187]');
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
                        className={`outline-none h-12 w-12 flex justify-center items-center bg-gray-200 rounded-full ml-4 border-2 hover:border-[#077187]
                        transition-all duration-300
                         ${isCheck ? 'border-[#077187]' : ''}`}
                    >
                        <IoSettingsSharp />
                    </button>
                    {isCheck ? (
                        <div
                            ref={menuRef}
                            className={` bg-white mt-2 right-0 w-64 absolute rounded-md shadow-xl transition-all ease-in duration-500`}
                        >
                            {/* Theme */}
                            <div className="px-3 py-2 hover:rounded-md hover:bg-gray-200 cursor-pointer ">
                                <button className="flex w-full h-full items-center justify-between outline-none">
                                    <IoSunnyOutline className="h-6 w-6 mr-3" />
                                    <p className="mr-auto ">Light</p>
                                    <p className="ml-2 w-20">(Ctrl + K)</p>
                                </button>
                            </div>
                            <div className="px-3 py-2 hover:bg-gray-200 cursor-pointer">
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
