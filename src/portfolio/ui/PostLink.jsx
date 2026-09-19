import { Link } from 'react-router-dom';

/** Internal posts route in-app; external ones (Medium) open in a new tab. */
export default function PostLink({ post, className, children, ...rest }) {
  if (post.type === 'external') {
    return <a href={post.link} target="_blank" rel="noopener noreferrer" className={className} {...rest}>{children}</a>;
  }
  return <Link to={post.link} className={className} {...rest}>{children}</Link>;
}
