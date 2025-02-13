interface CustomButtonProps {
    text: string
    color: 'bg-primary' | 'bg-secondary' | 'bg-danger'
    typeButton?: 'button' | 'submit'
    onClickButton: () => void
}
  
export default function CustomButton({ text, color, onClickButton, typeButton }: CustomButtonProps) {
    return (
        <button 
            className={"bg-blue-500 p-2 rounded text-center my-2 text-white font-semibold w-full"}
            type={`${typeButton || 'button'}`}
        > 
            { text }
        </button>
    )
}