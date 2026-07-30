import { Input, type InputProps } from "../Input";
import { LoupeIcon } from "./LoupeIcon";

export type SearchInputProps = Omit<InputProps, "leftIcon">;

export function SearchInput(props: SearchInputProps) {

  return (
    <Input
    {...props}
    leftIcon={<LoupeIcon />}
    />
  )
}
