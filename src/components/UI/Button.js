const Button = props => {
    return (
        <button
            type={props.type}
            id={props.id}
            className={`
            shadow-md
            py-2 px-6
            rounded-xl
            bg-gradient-to-tr from-lime-800 via-violet-500 to-blue-500
            ${props.className}`}
            onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export default Button;
