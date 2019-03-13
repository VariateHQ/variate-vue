import { name, styles } from '../config/console';

// Components
export const LOAD_COMPONENT= `[COMPONENT] %s`;
export const LOAD_COMPONENT_EXPERIMENTS = `Running experiments:`;

// Utilities
export const log = (message, ...params) => {
    console.log(
        `%c ${name} %c DEBUG %c %s`,
        styles.brand,
        styles.type,
        styles.message,
        message,
        ...params
    );
};

export function group(message = '', ...params) {
    console.groupCollapsed(
        `%c ${name} %c DEBUG %c ${message}`,
        styles.brand,
        styles.type,
        styles.message,
        ...params
    );
}
