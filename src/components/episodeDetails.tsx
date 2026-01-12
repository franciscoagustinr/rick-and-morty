import { Episode } from "@/types";

const EpisodeDetails = ({ episode }: { episode: Episode }) => {
    return (
        <>
            <div key={episode.id}
                className="p-3 mr-2 border-b border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow">
                <div className="flex flex-row gap-2 items-center">
                    <span className="text-xs p-0.5 bg-gray-300 text-white dark:text-gray-900 rounded-sm">{episode.episode}</span>
                    <p className="font-medium text-sm">{episode.name}</p>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{episode.air_date}</span>
                </div>
            </div>
        </>
    )
}
export default EpisodeDetails; 