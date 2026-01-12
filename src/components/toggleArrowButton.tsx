const ToggleArrowButton = ({ isExpanded, onToggle }: { isExpanded: boolean | undefined, onToggle: () => void }) => {
    return (
        <>
            <button
                onClick={onToggle}
                className={`lg:hidden p-1 text-gray-400 focus:outline-none transition-transform duration-200 ${!isExpanded ? 'rotate-180' : ''}`}
                aria-label={isExpanded ? "Collapse section" : "Expand section"}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </button>
        </>
    )
}
export default ToggleArrowButton;