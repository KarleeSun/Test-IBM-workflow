import { useEffect, useState } from "react";

interface FormFillProps<T> {
  storeLocation: string;
  defaultValues: T;
}

export default function useFormFill<T>({
  storeLocation,
  defaultValues,
}: FormFillProps<T>) {
  const overwriteSaved = (details: string) => {
    localStorage.setItem(storeLocation, details);
  };

  function useFormFillEffect() {
    const [values, setValues] = useState<T>(defaultValues);
    useEffect(() => {
      const basicDetailsSaved = localStorage.getItem(storeLocation);
      if (!basicDetailsSaved) return;
      const values = JSON.parse(basicDetailsSaved);
      setValues(values);
    }, []);
    return values;
  }
  return { overwriteSaved, useFormFillEffect };
}
