import { useState } from "react";
import { useFLIP } from "./FLIP-helper";

// Gambar profil / avatar
import avatarSrc from "./avatar.jpg";

// Screens
import Links from "./screens/Links";
import AboutMe from "./screens/AboutMe";
import Socials from "./screens/Socials";

export default function App() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Definisikan tampilan-tampilan screen di sini
    const screens = [
        <Links changeScreenFunc={changeScreenIndex} />,
        <AboutMe />,
        <Socials />
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
                        <a href="#0" onClick={goBackToHome} className="go-back">
                            &larr; Back
                        </a>
                    )}
                    <div className="profile-wrapper" ref={profileWrapperRef}>
                        <img src={avatarSrc} alt="Avatar" className="avatar-img" />
                        
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