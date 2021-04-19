export default function Card(props) {
    const { children, title } = props;

    return (
        <div className="card">
            <h1>{title}</h1>
            <div className="divider-line" />
            {children}
        </div>
    )
}