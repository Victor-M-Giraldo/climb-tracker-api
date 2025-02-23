import { Link } from 'react-router';

interface FeatureCardProps {
  title: string;
  description: string;
  link: string;
  linkText: string;
}

export default function FeatureCard({
  title,
  description,
  link,
  linkText,
}: FeatureCardProps) {
  return (
    <>
      <div className='card bg-base-100 w-full shadow-sm'>
        <div className='card-body'>
          <h2 className='card-title'>{title}</h2>
          <p>{description}</p>
          <div className='card-actions justify-end'>
            <button className='btn btn-primary'>
              <Link to={link}>{linkText}</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
