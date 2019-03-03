import { name, styles } from '../config/console';

// Components
export const LOAD_COMPONENT= `[COMPONENT] %s`;
export const LOAD_COMPONENT_EXPERIMENT = `Experiment %s`;
export const LOAD_COMPONENT_VARIATION = `Variation %s`;
export const LOAD_COMPONENT_BUCKET = `Bucket: %s`;

// Utilities
export const log = (message, ...params) => {
    console.debug(
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
