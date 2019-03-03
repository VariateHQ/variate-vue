const brandName = 'Variate Vue';

const brandStyle = `background: rgba(143, 127, 224, 1); color: white; font-weight: 500; border-radius: 3px 0 0 3px; padding: 1px 2px;`;
const typeStyle = 'background: #424242; color: white; font-weight: 400; padding: 1px 2px; border-radius: 0 3px 3px 0;';
const messageStyle = 'background: transparent; color: #424242; font-weight: 400;';

// Components
export const LOAD_COMPONENT= `[COMPONENT] %s`;
export const LOAD_COMPONENT_EXPERIMENT = `Experiment %s`;
export const LOAD_COMPONENT_VARIATION = `Variation %s`;
export const LOAD_COMPONENT_BUCKET = `Bucket: %s`;

// Utilities
export const log = (message, ...params) => {
    console.debug(
        `%c ${brandName} %c DEBUG %c %s`,
        brandStyle,
        typeStyle,
        messageStyle,
        message,
        ...params
    );
};

export function group(message = '', ...params) {
    console.groupCollapsed(
        `%c ${brandName} %c DEBUG %c ${message}`,
        brandStyle,
        typeStyle,
        messageStyle,
        ...params
    );
}
