import { useLayoutEffect, useRef, useState } from "react";

import AboutMe from "./cards/AboutMe";

function Link(props) {
    // Contoh penerapan "object destructuring" di JavaScript
    const { children, onClick } = props;

    return (
        <a href="#0" className="card link" onClick={onClick}>
            {children} &rarr;
        </a>
    );
}

export default function HomePage() {
    const [currentScreen, setCurrentScreen] = useState(0);

    function changeScreenTo(event, destination) {
        event.preventDefault();
        setCurrentScreen(destination);
    }

    // function renderCurrentScreen() {
    //     switch (currentScreen) {
    //         case 0:
    //     }
    // }

    function goBackToHome(event) {
        changeScreenTo(event, 0);
    }

    // const currentScreenRef = useRef();
    const profileWrapperRef = useRef();
    const lastProfileWrapperPosition = useRef();

    useLayoutEffect(function () {
        const currentPosition = profileWrapperRef.current.getBoundingClientRect();

        if (lastProfileWrapperPosition.current) {
            const lastXPosition = lastProfileWrapperPosition.current.left;
            const lastYPosition = lastProfileWrapperPosition.current.top;

            const currentXPosition = currentPosition.left;
            const currentYPosition = currentPosition.top;

            const deltaXPosition = lastXPosition - currentXPosition;
            const deltaYPosition = lastYPosition - currentYPosition;

            profileWrapperRef.current.animate([
                { transform: `translateX(${deltaXPosition}px) translateY(${deltaYPosition}px)` },
                { transform: `translate(0, 0)` }
            ], {
                duration: 500,
                easing: "ease"
            })
        }

        lastProfileWrapperPosition.current = currentPosition;
    }, [currentScreen]);

    let renderedCard;
    switch (currentScreen) {
        case 0:
            renderedCard = (
                <>
                    <Link onClick={function(event) { changeScreenTo(event, 1); }}>About me</Link>
                </>
            );
            break;

        case 1:
            renderedCard = <AboutMe />;
            break;

        default:
            renderedCard = null;
            break;
    }

    return (
        <div className="page">
            <div className="container">
                <section>
                    {currentScreen !== 0 && (
                        <a href="#0" onClick={goBackToHome}>&larr; Kembali</a>
                    )}
                    <div className="profile-wrapper" ref={profileWrapperRef}>
                        <img src="https://source.unsplash.com/random" alt="Avatar" className="avatar-img" />
                        <h1>Nama Kamu</h1>
                        <p>Deskripsi apa pun di sini</p>
                    </div>
                </section>
                <div className="divider-line" />
                <section>
                    {renderedCard}
                </section>
            </div>
        </div>
    );
}