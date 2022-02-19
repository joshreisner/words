import type { ActionFunction } from "remix";
import { useActionData, Form } from "remix";

import { words } from "../words";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const excludes = String(formData.get("excludes")).split("");
  const includes = String(formData.get("includes")).split("");

  //todo loop
  const letter0 = String(formData.get("letter0"));
  const letter1 = String(formData.get("letter1"));
  const letter2 = String(formData.get("letter2"));
  const letter3 = String(formData.get("letter3"));
  const letter4 = String(formData.get("letter4"));

  console.log("running" + letter0);

  return words
    .filter((word) => word.length === 5)
    .filter((word) => includes.every((include) => word.includes(include)))
    .filter((word) => !excludes.some((exclude) => word.includes(exclude)))
    .filter((word) => !letter0 || word.charAt(0) === letter0)
    .filter((word) => !letter1 || word.charAt(1) === letter1)
    .filter((word) => !letter2 || word.charAt(2) === letter2)
    .filter((word) => !letter3 || word.charAt(3) === letter3)
    .filter((word) => !letter4 || word.charAt(4) === letter4);
};

export default function Filter() {
  let words = useActionData();
  return (
    <>
      <Form method="post" action="/filter">
        <div>
          <label htmlFor="contains">includes</label>
          <input type="text" name="includes" id="includes" autoComplete="off" />
        </div>
        <div>
          <label htmlFor="excludes">excludes</label>
          <input type="text" name="excludes" id="excludes" autoComplete="off" />
        </div>
        {[...Array(5).keys()].map((_, index) => (
          <div key={index}>
            <label htmlFor={`letter${index}`}>letter {index + 1}</label>
            <input
              type="text"
              name={`letter${index}`}
              id={`letter${index}`}
              autoComplete="off"
            />
          </div>
        ))}
        <button type="submit">submit</button>
      </Form>
      <h1>It could be</h1>
      <ol>
        {words?.map((word: string, index: number) => (
          <li key={index}>{word}</li>
        ))}
      </ol>
    </>
  );
}
