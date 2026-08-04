type InputProps = {
    label: string;
    required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
    label,
    required,
    ...props
}: InputProps) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-brand-green">
                {label}
                {required && <span className="text-red-500"> *</span>}
            </label>

            <input
                {...props}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-brand-green"
            />
        </div>
    );
}