import { Link } from "react-router";

interface AuthFooterProps {
    promptText: string;
    linkText: string;
    link: string;
}

export default function AuthFooter({promptText, linkText, link}: AuthFooterProps) {
    return (
      <div className='mt-6 text-center'>
        <p className='text-sm'>
          {promptText}
          <Link
            to={link}
            className='link text-blue-500 hover:text-blue-600'>
            {linkText}
          </Link>
        </p>
      </div>
    );
}
