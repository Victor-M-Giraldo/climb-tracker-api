interface FormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
}

export default function Form({ children, onSubmit }: FormProps) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            {children}
        </form>
    );

}
