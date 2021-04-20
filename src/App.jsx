import { useLayoutEffect, useRef, useState } from "react";

import Links from "./screens/Links";
import AboutMe from "./screens/AboutMe";
import { useFLIP } from "./FLIP-helper";

export default function HomePage() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const screens = [
        <Links changeScreenFunc={changeScreenIndex} />,
        <AboutMe />
    ];
    
    function changeScreenIndex(event, destination) {
        event.preventDefault();

        // Tangkap posisi-posisi elemen terakhir agar animasi FLIP dapat bekerja
        captureProfileWrapperPosition();
        captureDividerLinePosition();

        setCurrentIndex(destination);
    }

    function goBackToHome(event) {
        changeScreenIndex(event, 0);
    }

    const [captureProfileWrapperPosition, profileWrapperRef] = useFLIP([currentIndex]);
    const [captureDividerLinePosition, dividerLineRef] = useFLIP([currentIndex]);



    return (
        <div className="page">
            <div className="container">
                <section>
                    {currentIndex !== 0 && (
                        <a href="#0" onClick={goBackToHome} className="go-back">&larr; Kembali</a>
                    )}
                    <div className="profile-wrapper" ref={profileWrapperRef}>
                        <img src="https://source.unsplash.com/random" alt="Avatar" className="avatar-img" />
                        <h1>Nama Kamu</h1>
                        <p>Deskripsi apa pun di sini</p>
                    </div>
                </section>
                <div className="divider-line" ref={dividerLineRef} />
                <section>
                    {screens[currentIndex]}
                </section>
            </div>
        </div>
    );
}