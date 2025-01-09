import Image from 'next/image'

const AddReviewButton = () => {
    return (
        <button
            className="fixed lg:hidden bottom-48 right-4 bg-gradient-to-r from-[#D20653] to-[#FF951D] text-white px-2 py-3 rounded-xl flex items-center justify-center gap-2"
            aria-label="Add review"
        >
            <Image
                src="/assets/add-circle.svg"
                alt="Add review icon"
                width={18}
                height={18}
            />
            Add review
        </button>
    )
}

export default AddReviewButton