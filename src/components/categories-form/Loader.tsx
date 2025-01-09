const Loader = ({ text }: { text?: string }) => {
    return (
        <div className="text-indigo-600 flex gap-4 justify-center items-center">
            <span className="loader inline-block h-6 w-6 border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin"></span>
            {text && <span>{text}</span>}
        </div>
    );
};

export default Loader;
