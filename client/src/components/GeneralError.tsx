interface GeneralErrorProps {
    error: string;
}

export default function GeneralError({error}: GeneralErrorProps) {

    return <div className='text-red-400 text-sm mb-4'>
        {error}
    </div>;
}
