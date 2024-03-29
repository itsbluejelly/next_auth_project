import {cn} from "@nextui-org/react"

type Props = { passStrength: number }

function arrayGenerator(value: number): number[]{
    const numberArray: number[] = []

    for(let i: number = 0; i <= value; i++){
        numberArray.push(i)
    }

    return numberArray
}

export default function PasswordComponent({passStrength}: Props) {
    const passwordDivGenerator: JSX.Element[] = arrayGenerator(passStrength).map(
        (item, index) => <div 
            key={index}
            
            className={cn("h-2 w-32 rounded-md", {
                "bg-red-500": passStrength === 0,
                "bg-orange-500": passStrength === 1,
                "bg-yellow-500": passStrength === 2,
                "bg-green-500": passStrength === 3,
            })}
        ></div>
    )

    return (
        <div className={cn("flex gap-2 justify-around col-span-2", {
            "justify-around": passStrength === 3,
            "justify-start": passStrength < 3,
        })}>{passwordDivGenerator}</div>
    )
}