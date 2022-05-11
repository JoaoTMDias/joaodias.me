import { SkipLinks } from "@feedzai/react-a11y-tools";
import "@feedzai/react-a11y-tools/dist/index.css";
import "./index.module.scss";

interface ISkipLink {
  target: string;
  text: string;
  as?: "link" | "button";
}

const items: ISkipLink[] = [
  {
    target: "#content",
    text: "Skip to main content",
    as: "link",
  },
  {
    target: "#work",
    text: "Go to projects",
    as: "link",
  },
  {
    target: "#contact",
    text: "Go to social links",
    as: "link",
  },
];

function SkipLink() {
  return <SkipLinks items={items} />;
}

export default SkipLink;
