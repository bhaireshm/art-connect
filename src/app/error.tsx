/* eslint-disable jsx-a11y/html-has-lang */
/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

export default function ErrorBoundary({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h2>Something went wrong! {error.message}</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
