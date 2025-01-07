type LikeButtonProps = {
    liked: boolean;
};


export default function LikeButton({ liked }: LikeButtonProps) {
    return (
        <button>
            {liked ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.293l1.318-1.975a4.5 4.5 0 016.364 6.364l-7.07 7.07a.75.75 0 01-1.06 0l-7.07-7.07a4.5 4.5 0 010-6.364z"
                    />
                </svg>
            )}
        </button>
    );
}
