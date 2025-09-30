import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  IS_PRODUCTION: Joi.boolean().default(false),
  DB_SYNC: Joi.boolean().default(false),
  SALT_OR_ROUNDS: Joi.number().default(10),
  JWT_SECRET_KEY: Joi.string().required(),
});
