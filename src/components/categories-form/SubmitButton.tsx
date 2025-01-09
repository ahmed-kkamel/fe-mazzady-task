const SubmitButton = ({ isSubmitDisabled }: { isSubmitDisabled: boolean }) => (
    <button
        type="submit"
        disabled={isSubmitDisabled}
        className={`w-full py-2 px-4 font-bold rounded-lg shadow-md focus:ring ${isSubmitDisabled
                ? "bg-indigo-300 text-indigo-800 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer focus:ring-indigo-500"
            }`}
    >
        Submit
    </button>
);

export default SubmitButton;
