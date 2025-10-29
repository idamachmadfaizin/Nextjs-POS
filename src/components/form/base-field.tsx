"use client";

import { useStore } from "@tanstack/react-form";
import { useId, useMemo } from "react";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFieldContext } from "@/hooks/form-context";

type InputValueProp = React.ComponentProps<typeof Input>["value"];

type Props<TData extends InputValueProp> = {
  field: ReturnType<typeof useFieldContext<TData>>;
  label?: string;
  description?: React.ReactElement<typeof FieldDescription>;
  fieldLabel?: React.ReactElement;
  fieldInput?: React.ReactElement;
} & React.ComponentProps<typeof Input>;

export function BaseField<TData extends InputValueProp>({
  label,
  description,
  field,
  fieldLabel,
  fieldInput,
  ...props
}: Props<TData>) {
  const id = useId();
  const errors = useStore(field.store, (state) => state.meta.errors);

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const fieldId = useMemo(() => `${id}-${field.name}`, []);

  return (
    <Field data-invalid={isInvalid}>
      {fieldLabel ? (
        fieldLabel
      ) : (
        <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
      )}
      {fieldInput ? (
        fieldInput
      ) : (
        <Input
          id={fieldId}
          name={field.name}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value as never)}
          aria-invalid={isInvalid}
          {...props}
        />
      )}
      {description}
      {isInvalid && <FieldError errors={errors} />}
    </Field>
  );
}
