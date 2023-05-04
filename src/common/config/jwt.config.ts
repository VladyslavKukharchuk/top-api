export const getJwtConfig = async () => {
  return {
    secret: process.env.JWT_SECRET,
  };
};
