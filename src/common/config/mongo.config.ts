export const getMongoConfig = async () => {
  return {
    uri: getMongoString(),
  };
};

const getMongoString = () =>
  `mongodb://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_AUTH_DB}`;
