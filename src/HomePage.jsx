import { useLayoutEffect, useRef, useState } from "react";

import AboutMe from "./cards/AboutMe";

function Link(props) {
    // Contoh penerapan "object destructuring" di JavaScript
    const { children, onClick, linkRef } = props;

    return (
        <a href="#0" className="card link" onClick={onClick} ref={linkRef}>
            {children} &rarr;
        </a>
    );
}

export default function HomePage() {
    const [currentScreen, setCurrentScreen] = useState(0);
    
    const triggerElementPos = useRef();

    function changeScreenTo(event, destination) {
        event.preventDefault();
        triggerElementPos.current = event.target.getBoundingClientRect();
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

    const cardRef = useRef();

    let renderedCard;
    switch (currentScreen) {
        case 0:
            renderedCard = (
                <>
                    <Link onClick={function(event) { changeScreenTo(event, 1); }} linkRef={cardRef}>About me</Link>
                </>
            );
            break;

        case 1:
            renderedCard = <AboutMe cardRef={cardRef} />;
            break;

        default:
            renderedCard = null;
            break;
    }

    useLayoutEffect(function () {
        if (currentScreen !== 0) {
            const {
                left: lastXPos,
                top: lastYPos,
                width: lastWidth,
                height: lastHeight
            } = triggerElementPos.current;

            const {
                left: currentXPos,
                top: currentYPos,
                width: currentWidth,
                height: currentHeight
            } = cardRef.current.getBoundingClientRect();

            const deltaX = lastXPos - currentXPos;
            const deltaY = lastYPos - currentYPos;
            const deltaWidth = lastWidth / currentWidth;
            const deltaHeight = lastHeight / currentHeight;

            // console.log(lastWidth, currentWidth, triggerElement.current);
            // console.log(triggerElement.current.getBoundingClientRect())

            cardRef.current.animate([
                { transform: `translate(${deltaX}px, ${deltaY}px) scale(${deltaWidth}, ${deltaHeight})`},
                { transform: "none" }
            ], {
                duration: 500,
                easing: "ease"
            })
        }
    }, [currentScreen]);

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