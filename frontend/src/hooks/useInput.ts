import { useState } from "react";

type InputReturnType = [
  string,
  (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void,
  () => void
];

export default function useInput(initialValue: string): InputReturnType {
  const [state, setState] = useState<string>(initialValue);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => setState(e.currentTarget.value);

  const clear = () => setState("");

  return [state, handleChange, clear];
}
