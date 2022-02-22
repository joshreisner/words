import type { ActionFunction } from "remix";
import { useActionData, Form } from "remix";

import { words } from "../words";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  //todo loop
  const letter0is = String(formData.get("letter0is")).toLowerCase();
  const letter1is = String(formData.get("letter1is")).toLowerCase();
  const letter2is = String(formData.get("letter2is")).toLowerCase();
  const letter3is = String(formData.get("letter3is")).toLowerCase();
  const letter4is = String(formData.get("letter4is")).toLowerCase();

  const letter0isnt = String(formData.get("letter0isnt"))
    .toLowerCase()
    .split("");
  const letter1isnt = String(formData.get("letter1isnt"))
    .toLowerCase()
    .split("");
  const letter2isnt = String(formData.get("letter2isnt"))
    .toLowerCase()
    .split("");
  const letter3isnt = String(formData.get("letter3isnt"))
    .toLowerCase()
    .split("");
  const letter4isnt = String(formData.get("letter4isnt"))
    .toLowerCase()
    .split("");

  const includes = [
    ...letter0isnt,
    ...letter1isnt,
    ...letter2isnt,
    ...letter3isnt,
    ...letter4isnt,
  ];

  const excludes = String(formData.get("excludes")).split("");

  return words
    .filter((word) => includes.every((include) => word.includes(include)))
    .filter((word) => !excludes.some((exclude) => word.includes(exclude)))
    .filter((word) => !letter0is || word.charAt(0) === letter0is)
    .filter((word) => !letter1is || word.charAt(1) === letter1is)
    .filter((word) => !letter2is || word.charAt(2) === letter2is)
    .filter((word) => !letter3is || word.charAt(3) === letter3is)
    .filter((word) => !letter4is || word.charAt(4) === letter4is)

    .filter(
      (word) => !letter0isnt.length || !letter0isnt.includes(word.charAt(0))
    )
    .filter(
      (word) => !letter1isnt.length || !letter1isnt.includes(word.charAt(1))
    )
    .filter(
      (word) => !letter2isnt.length || !letter2isnt.includes(word.charAt(2))
    )
    .filter(
      (word) => !letter3isnt.length || !letter3isnt.includes(word.charAt(3))
    )
    .filter(
      (word) => !letter4isnt.length || !letter4isnt.includes(word.charAt(4))
    );
};

export default function Filter() {
  let words = useActionData();
  return (
    <div className="mx-auto max-w-4xl text-white p-3">
      <Form method="post" action="/filter" className="grid gap-3">
        {[...Array(5).keys()].map((_, index) => (
          <div key={index} className="flex gap-2">
            <input
              autoComplete="off"
              className="bg-green-700 font-bold uppercase w-12 "
              id={`letter${index}is`}
              maxLength={1}
              name={`letter${index}is`}
              type="text"
            />
            <input
              autoComplete="off"
              className="bg-yellow-700 font-bold uppercase"
              id={`letter${index}isnt`}
              name={`letter${index}isnt`}
              type="text"
            />
          </div>
        ))}
        <div>
          <label htmlFor="excludes" className="block">
            excludes
          </label>
          <input
            autoComplete="off"
            className="bg-gray-700 uppercase"
            id="excludes"
            name="excludes"
            type="text"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-white rounded text-black font-bold p-3"
          >
            submit
          </button>
        </div>
      </Form>
      {words && (
        <ol className="font-mono">
          {words.map((word: string, index: number) => (
            <li key={index}>{word}</li>
          ))}
        </ol>
      )}
    </div>
  );
}
