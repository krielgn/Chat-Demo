
interface ErrorPanelProps {
    action: string,
    message: string
}

export default function ErrorPanel({action, message}: ErrorPanelProps) {
    if (!message){
        return <></>;
    }
    return (
        <div>
            <b>{action} Error:</b> {message}
        </div>
    )
}
