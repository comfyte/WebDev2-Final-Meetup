export default function Card(props) {
    const { children, title, divRef } = props;

    return (
        <div className="card" ref={divRef}>
            <h1>{title}</h1>
            <div className="divider-line" />
            {children}
        </div>
    )
}