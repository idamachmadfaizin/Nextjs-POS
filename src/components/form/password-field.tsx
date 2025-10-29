import { useStore } from "@tanstack/react-form";
import { LucideEye, LucideEyeOff } from "lucide-react";
import { useId, useMemo, useState } from "react";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useFieldContext } from "@/hooks/form-context";

type Props = {
  label?: string;
  description?: React.ReactElement<typeof FieldDescription>;
  fieldLabel?: React.ReactElement;
} & Omit<React.ComponentProps<typeof InputGroupInput>, "type">;

export default function PasswordField({
  label,
  description,
  fieldLabel,
  ...props
}: Props) {
  const field = useFieldContext<string>();

  const id = useId();
  const errors = useStore(field.store, (state) => state.meta.errors);

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const fieldId = useMemo(() => `${id}-${field.name}`, []);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const { type, iconTitle } = useMemo(
    () => ({
      type: passwordVisible ? "text" : "password",
      iconTitle: passwordVisible ? `Hide ${label}` : `Show ${label}`,
    }),
    [passwordVisible, label],
  );

  return (
    <Field data-invalid={isInvalid}>
      {fieldLabel ? (
        fieldLabel
      ) : (
        <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
      )}

      <InputGroup>
        <InputGroupInput
          id={fieldId}
          name={field.name}
          type={type}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value as never)}
          aria-invalid={isInvalid}
          {...props}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label={iconTitle}
            title={iconTitle}
            size="icon-xs"
            onClick={() => {
              setPasswordVisible((prev) => !prev);
            }}
          >
            {passwordVisible ? <LucideEyeOff /> : <LucideEye />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      {description}

      {isInvalid && <FieldError errors={errors} />}
    </Field>
  );
}
