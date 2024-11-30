interface ErrorMessageProps {
    error?: string | string[];
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
    if (!error) return null;

    const errorMessage = Array.isArray(error) ? error[0] : error;

    return <p className="text-sm text-red-500">{errorMessage}</p>;
};

export default ErrorMessage;
