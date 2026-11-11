export default function StandaloneLayout({ children }) {
    return (
        <div className="min-h-screen bg-secondary text-text font-default antialiased">
            {children}
        </div>
    );
}
