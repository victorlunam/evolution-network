import { useCallback, useMemo, useRef } from "react";
import { ObjectSchema, SchemaDescription } from "yup";

const useValidation = <T extends Record<string, unknown>>(
  schema: ObjectSchema<T>,
) => {
  const fieldsRef = useRef<string[]>([]);
  const schemaDescription = useMemo(() => schema.describe(), []);

  const register = useCallback((field: Extract<keyof T, string>) => {
    fieldsRef.current.push(field);
    const typeDescriptionField: SchemaDescription["tests"] | undefined = (
      schemaDescription.fields?.[field] as SchemaDescription
    )?.tests;

    const isRequired =
      typeDescriptionField?.some((item) => item.name === "required") ?? false;

    return {
      name: field as string,
      required: isRequired,
    };
  }, []);

  return {
    register,
  };
};

export default useValidation;
