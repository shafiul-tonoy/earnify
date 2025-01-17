import { Helmet } from "react-helmet-async";

export default function CustomTitle({ title }) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}
