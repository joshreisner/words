import type { LoaderFunction } from "remix";
import { useLoaderData } from "remix";

export const loader: LoaderFunction = async () => {
  const data = await fetch(
    "https://gist.githubusercontent.com/h3xx/1976236/raw/bbabb412261386673eff521dddbe1dc815373b1d/wiki-100k.txt"
  );
  const text = await data.text();
  const words = text
    .split("\n")
    .filter((word) => word.charAt(0) !== "#")
    .filter((word) => word.length === 5)
    .filter((word) => !/[^a-zA-Z]/.test(word))
    .map((word) => word.toLowerCase());
  return [...new Set(words)];
};

export default function Index() {
  let words: string[] = useLoaderData();
  return (
    <pre>
      export const words = [ {words.map((word) => `"${word}"`).join(", ")} ];
    </pre>
  );
}
