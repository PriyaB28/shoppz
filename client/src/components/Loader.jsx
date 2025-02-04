import React from 'react'

const Loader = () => {
    return (
        <div className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
            <div className="flex justify-center items-center mt-[50vh]">
                <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
                    <div className="p-4 bg-gradient-to-tr animate-spin from-orange-400 to-indigo-950 via-violet-600 rounded-full">
                        <div className="bg-white rounded-full">
                            <div className="w-24 h-24 rounded-full"></div>
                        </div>
                    </div>
                </div>
                <p className='text-black absolute'>Loading...</p>
            </div>
        </div>
    )
}

export default Loader