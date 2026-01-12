import CopyIcon from "@/assets/icons/copy";

const CopyButton = ({ isCopied, handleCopy }: { isCopied: boolean, handleCopy: () => void }) => {
    return (
        <>
            <button
                onClick={handleCopy}
                className={`cursor-pointer absolute top-8 right-0 p-1 border rounded-sm transition-colors duration-200 ${isCopied
                    ? "text-green-500 border-green-500 text-[10px]"
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 border-gray-400 hover:border-gray-600 dark:hover:border-gray-200"
                    }`}
                title={isCopied ? "Copied!" : "Copy list"}
            >
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