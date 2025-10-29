import { createFormHook } from "@tanstack/react-form";
import { lazy } from "react";
import { fieldContext, formContext } from "./form-context";

const TextField = lazy(() => import("../components/form/text-field"));
const PasswordField = lazy(() => import("../components/form/password-field"));
const EmailField = lazy(() => import("../components/form/email-field"));
const SubscribeButton = lazy(
  () => import("../components/form/subscribe-button"),
);

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    TextField,
    EmailField,
    PasswordField,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});
