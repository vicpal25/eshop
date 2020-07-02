import definitions from './definitions';

export default logger => error => {
  let definition = definitions[error.message];

  if (!definition) {
    logger.error(error);
    definition = definitions['LITHIUM-500'];
  }

  const { path } = error;
  const { name, external, internal, status } = definition;
  logger.error({ error: { name, message: internal, status } });

  return { message: external, status, path };
};
