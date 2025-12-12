"use client";

import { Field, FieldError, FieldGroup, FieldSet } from "@/components/ui/field";
import { useAppForm } from "@/hooks/form";
import { useState } from "react";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export function FormContent() {
  const [errors, setErrors] = useState<{ message: string }[]>([
    { message: "Invalid" },
  ]);

  const form = useAppForm({
    defaultValues: {
      name: "",
    } as FormValues,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setErrors([]);

      console.log("submitted", value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              <form.AppField
                name="name"
                children={(field) => <field.TextField label="Name" required />}
              />
            </div>
          </FieldGroup>
        </FieldSet>

        <Field orientation="horizontal">
          <form.AppForm>
            <form.SubscribeButton label="Create" />
          </form.AppForm>
        </Field>
      </FieldGroup>
    </form>
  );
}
