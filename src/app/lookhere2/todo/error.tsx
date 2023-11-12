'use client'

type Props = {
    error: Error;
}
export default function Error({error}:Props) {
    return (
        <main>
            {error.message}
        </main>
    )
}
