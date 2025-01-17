import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold">404</h1>
        <p className="text-lg mb-6">{error.statusText || error.message}</p>
        <Link to="/" className="btn">
          Go Back Home
        </Link>
      </div>
    </div>
  );
}