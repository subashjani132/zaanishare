import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} ZaaniShare.
        </div>
        <div className="flex gap-6 text-sm text-gray-600">
          <Link to="/legal" className="hover:text-indigo-600">Privacy Policy</Link>
          <Link to="/legal" className="hover:text-indigo-600">Terms</Link>
          <Link to="/legal" className="hover:text-indigo-600">Cookies</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;