import { Key, useEffect, useMemo, useState } from "react";
import { CSS, Dropdown as NUDropdown } from "@nextui-org/react";
import useIsFirstRender from "@hooks/useIsFirstRender";
import { UseFormSetFocus, UseFormSetValue } from "react-hook-form";

type DropdownProps<
  T extends Record<string, unknown>,
  TN extends string = string,
> = {
  setValue?: UseFormSetValue<any>;
  setFocus?: UseFormSetFocus<any>;
  disabled?: boolean;
  name?: TN;
  placeholder?: string;
  data: T[];
  dataItemKey: keyof T;
  textField: keyof T;
  css?: CSS;
  resetFrom?: string;
  onChange?: (id: string) => void;
};

const Dropdown = <T extends Record<string, unknown>>({
  disabled,
  name,
  placeholder = "Ninguno",
  data,
  dataItemKey,
  textField,
  css,
  resetFrom,
  setValue,
  setFocus,
  onChange,
}: DropdownProps<T>) => {
  const isFirst = useIsFirstRender();
  const [selected, setSelected] = useState<Set<Key>>(new Set([]));

  const selectedValue = useMemo(() => {
    const itemId = Array.from(selected).join(", ");
    const itemMatch = data.find((item) => item[dataItemKey] === itemId);

    return itemMatch;
  }, [selected]);

  useEffect(() => {
    if (isFirst) return;

    setSelected(new Set([]));
    onChange?.("");
  }, [resetFrom]);

  return (
    <>
      <NUDropdown
        isDisabled={disabled}
        onOpenChange={(value) => {
          if (name) setFocus?.(name, { shouldSelect: value });
        }}
      >
        <NUDropdown.Button
          css={{
            bg: "$colors$accents0",
            color: selectedValue?.[dataItemKey] ? "$text" : "$colors$accents6",
            ...(css ?? {}),
          }}
          flat
        >
          {(selectedValue?.[textField] as string) ?? placeholder}
        </NUDropdown.Button>

        <NUDropdown.Menu
          aria-label="menu"
          selectionMode="single"
          items={data}
          selectedKeys={selected}
          onSelectionChange={(event) => {
            const itemId = Array.from(event).join(", ");

            if (name) setValue?.(name, itemId);

            onChange?.(itemId);
            setSelected(event as Set<Key>);
          }}
        >
          {(item) => (
            <NUDropdown.Item key={(item as T)[dataItemKey] as string}>
              {(item as T)[textField] as string}
            </NUDropdown.Item>
          )}
        </NUDropdown.Menu>
      </NUDropdown>

      <input
        type="text"
        name={name}
        defaultValue={(selectedValue?.[dataItemKey] as string) ?? ""}
        hidden
      />
    </>
  );
};

export default Dropdown;
