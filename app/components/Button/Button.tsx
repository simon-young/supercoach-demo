type ButtonProps = {
    className: string,
    onClick: () => void,
    children: React.ReactNode,
}

const Button = (props: ButtonProps) => {
    return (
        <button 
            className={`${props.className} p-2 px-4 border bg-slate-900 rounded-full text-white hover:bg-slate-700`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

export default Button;