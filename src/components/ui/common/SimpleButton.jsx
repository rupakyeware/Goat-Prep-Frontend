export default function SimpleButton({
    text = "Click me",
    onClick,
    className
}) {
    return (
        <button
        className={className}
        onClick={onClick}
        >{text}</button>
    )
}