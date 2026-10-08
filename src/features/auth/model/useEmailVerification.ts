import { useMutation } from "@tanstack/react-query";
import { checkResetCode, confirmEmail, requestPasswordReset, resetPassword, verifyEmailCode } from "./api";

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
  const checkMutation = useMutation({ mutationFn: checkResetCode });
  const resetMutation = useMutation({ mutationFn: resetPassword });

  return {
    requestCode: requestMutation.mutateAsync,
    checkCode: checkMutation.mutateAsync,
    resetPassword: resetMutation.mutateAsync,
    isRequesting: requestMutation.isPending,
    isChecking: checkMutation.isPending,
    isResetting: resetMutation.isPending,
  };
};
