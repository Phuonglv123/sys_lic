import React from "react";

export default function Banner() {
    return (
        <div>
            <div className=" bg-green-800 bg-left-top bg-auto bg-repeat-x" style={{height: '400px'}}>
                <div className="w-full text-center">
                    <p className="text-sm tracking-widest text-white">Subtitle</p>
                    <h1 className="font-bold text-5xl text-white">
                        Title
                    </h1>
                </div>
            </div>
        </div>
    )
}
