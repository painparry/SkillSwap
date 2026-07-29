import { ChangeEvent, useState, useEffect } from 'react';
import { Input } from "../Input";
import { LoupeIcon } from "./LoupeIcon";
import { useDebounce } from '../../hooks/useDebounce';

export function SearchInput() {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 300);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    console.log(debouncedValue)
  }, [debouncedValue])

  return (
    <Input
    value={value}
    placeholder="Искать навык"
    onChange={handleChange}
    leftIcon={<LoupeIcon />}
    />
  )
}
