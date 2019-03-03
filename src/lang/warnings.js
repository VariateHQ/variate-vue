import { name, styles } from '../config/console';

export const COMPONENT_NOT_DEFINED = `Component name is not defined.`;

// Utilities
export const log = (message, ...params) => {
    console.warn(
        `%c ${name} %c WARNING %c ${message}`,
        styles.warning,
        styles.type,
        styles.message,
        ...params
    );
};
