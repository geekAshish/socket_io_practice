import { ChangeEvent } from "react";

interface InputProps {
  placeholder?: string;
  name?: string;
  id?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ placeholder, id, name, onChange }: InputProps) => {
  return (
    <label htmlFor={id}>
      <input
        id={id}
        name={name}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
  );
};

export default Input;
