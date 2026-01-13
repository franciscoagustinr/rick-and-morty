import CopyIcon from "@/assets/icons/copy";

const CopyButton = ({ isCopied, handleCopy, quantityEpisodes }: { isCopied: boolean, handleCopy: () => void, quantityEpisodes: number }) => {
    const isDisabled = quantityEpisodes === 0;
    return (
        <>
            <button
                disabled={isDisabled}
                onClick={handleCopy}
                className={`cursor-pointer absolute top-8 right-0 p-1 border rounded-sm transition-colors duration-200 
                    ${isCopied
                        ? "text-green-500 border-green-500 text-[10px]"
                        : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 border-gray-400 hover:border-gray-600 dark:hover:border-gray-200"
                    }
                    ${isDisabled && 'cursor-not-allowed! opacity-50 hover:border-gray-400! hover:text-gray-400! '}
                    `}
                title={isDisabled ? "No episodes to copy" : isCopied ? "Copied!" : "Copy list"}            >
                {isCopied ? (
                    <span>Copied! ✅</span>
                ) : (
                    <CopyIcon />
                )}
            </button>
        </>
    )
}
export default CopyButton; 