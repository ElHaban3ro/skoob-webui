import { useState } from "react";

interface LoginInput {
  email: string;
  password: string;
}

interface InputError {
  fieldError: string;
  errorMsg: string;
}

export default function useLoginFormData() {
  const [credentials, setCredentials] = useState<LoginInput>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<InputError>({
    fieldError: "",
    errorMsg: "",
  });

  function handleChange(field: string, value: string) {
    setCredentials((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleError(field: string, errorMsg: string) {
    setError({ fieldError: field, errorMsg });
  }

  return {
    credentials,
    handleChange,
    handleError,
    error,
  };
}
