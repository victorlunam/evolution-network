import { FormEvent, ReactNode } from "react";
import { ObjectSchema } from "yup";

export type FormSubmitEvent<T extends Record<string, unknown>> = {
  values: T;
  error: string | undefined;
};

type FormProps<T extends Record<string, unknown>> = {
  schema?: ObjectSchema<T>;
  onSubmit?: (event: FormSubmitEvent<T>) => void;
  children: ReactNode;
};

const Form = <T extends Record<string, unknown>>({
  schema,
  onSubmit,
  children,
}: FormProps<T>) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const values = Object.fromEntries(formData) as T;

    try {
      const data = schema?.validateSync(values) ?? values;
      onSubmit?.({ values: data as T, error: undefined });
    } catch (error) {
      onSubmit?.({ values, error: (error as Error).message });
    }
  };

  return <form onSubmit={handleSubmit}>{children}</form>;
};

export default Form;
