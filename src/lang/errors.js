import { name, styles } from '../config/console';

export const REQUIRED_OBJECT = `mapAttributes(object) requires an object parameter;`;

// Utilities
export const log = (message, ...params) => {
    console.error(
        `%c ${name} %c ERROR %c ${message}`,
        styles.error,
        styles.type,
        styles.message,
        ...params
    );
};
