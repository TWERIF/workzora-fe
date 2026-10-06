import { useMutation } from "@tanstack/react-query";
import { confirmEmail, requestPasswordReset, resetPassword, verifyEmailCode } from "./api";

export const useEmailVerification = () => {
  const sendCodeMutation = useMutation({ mutationFn: confirmEmail });
  const verifyCodeMutation = useMutation({ mutationFn: verifyEmailCode });

  return {
    sendCode: sendCodeMutation.mutateAsync,
    verifyCode: verifyCodeMutation.mutateAsync,
    isSending: sendCodeMutation.isPending,
    isVerifying: verifyCodeMutation.isPending,
  };
};

export const usePasswordReset = () => {
  const requestMutation = useMutation({ mutationFn: requestPasswordReset });
  const resetMutation = useMutation({ mutationFn: resetPassword });

  return {
    requestCode: requestMutation.mutateAsync,
    resetPassword: resetMutation.mutateAsync,
    isPending: requestMutation.isPending || resetMutation.isPending,
  };
};
