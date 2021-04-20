export default function Links(props) {
    // Contoh penerapan "object destructuring" di JavaScript
    const { changeScreenFunc } = props;

    const links = [
        {
            name: "About me",
            targetIndex: 1
        },
        {
            name: "Connect with me",
            targetIndex: 2
        }
    ];

    return links.map((item, i) => (
        <a
            href="#0"
            className="card link"
            onClick={function (event) {
                changeScreenFunc(event, item.targetIndex)
            }}
            style={{
                animationDelay: (i * 100) + "ms"
            }}
            key={item.name}
        >
            <span>{item.name}</span>
            <span>&rarr;</span>
        </a>
    ));
}