import DeleteIcon from "@/assets/icons/delete";
import { Character } from "@/types";

interface SelectedCharacterIndicatorProps {
    selectedCharacter: Character | null;
    deleteSelected: () => void;
}


const SelectedCharacterIndicator = ({ selectedCharacter, deleteSelected }: SelectedCharacterIndicatorProps) => {

    return (
        <>
            {selectedCharacter && (
                <div className='relative'>
                    <div className="px-2 lg:px-3 py-1 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-xs lg:text-sm text-blue-600">
                            <span className="font-semibold">Selected:</span> {selectedCharacter.name}
                        </p>
                    </div>
                    <div onClick={deleteSelected} className='absolute -top-2 -right-2.5 cursor-pointer'>
                        <DeleteIcon />
                    </div>
                </div>
            )}
        </>
    )
}

export default SelectedCharacterIndicator;