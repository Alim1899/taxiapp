// utils/getWithdrawCooldown.js
export const getWithdrawCooldown = (transactions) => {
  const lastSuccess = [...transactions]
    .filter((t) => t.statusId === 5)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

  if (!lastSuccess) return { isOnCooldown: false, remainingTime: null };

  const elapsed = Date.now() - new Date(lastSuccess.createdAt).getTime();
  const oneHour = 1000 * 60 * 60;

  if (elapsed >= oneHour) return { isOnCooldown: false, remainingTime: null };

  const remaining = oneHour - elapsed;
  const minutes = Math.floor(remaining / 1000 / 60);

  return { isOnCooldown: true, remainingTime: { minutes } };
};