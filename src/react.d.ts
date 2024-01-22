import { experimental_useFormStatus } from "react-dom";
import { experimental_useOptimistic } from "react";

declare module "react" {
  const useOptimistic: typeof experimental_useOptimistic;
}

declare module "react-dom" {
  const useFormStatus: typeof experimental_useFormStatus;
}
