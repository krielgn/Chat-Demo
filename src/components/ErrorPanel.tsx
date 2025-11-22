
interface ErrorPanelProps {
    action: string,
    message: string
}

export default function ErrorPanel({action, message}: ErrorPanelProps) {
    if (message){
        return <></>;
    }
    return (
        <div>
            Error {action}: {message}
        </div>
    )
}
