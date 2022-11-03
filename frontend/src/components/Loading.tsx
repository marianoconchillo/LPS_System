import { Ring } from '@uiball/loaders'

export const Loading = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <Ring
                size={40}
                lineWeight={5}
                speed={2}
                color="black"
            />
        </div>
    )
}