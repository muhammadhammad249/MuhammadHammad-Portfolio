import Link from 'next/link';
import Button from '@/components/ui/Button';
import { FiAlertCircle, FiArrowLeft } from 'react-icons/fi';

export const metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-secondary flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-divider">
        <div className="mx-auto w-24 h-24 bg-error/10 text-error rounded-full flex items-center justify-center mb-6">
          <FiAlertCircle className="w-12 h-12" />
        </div>

        <h1 className="text-6xl md:text-7xl font-accent font-bold text-primary">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold text-primary">
          Page Not Found
        </h2>

        <p className="text-text text-lg leading-relaxed">
          Oops! The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
        </p>

        <div className="pt-8">
          <Link href="/">
            <Button
              variant="accent"
              size="lg"
              fullWidth
              className="gap-2 group"
              leftIcon={<FiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />}
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
