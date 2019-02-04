import * as debug from './debug';
import * as errors from './errors';

const LOCAL_STORAGE_KEY = 'testing-tool';

export default class Testing {
    constructor(options) {
        this.setupOptions(options);
        this.setupEnvironment();
        this.setup();
    }

    get options() {
        return this._options;
    }

    set options(options) {
        this._options = Object.assign({}, this._options, options);
    }

    get config() {
        return this._options.config;
    }

    set config(config) {
        this._options.config = config;
    }

    /**
     * Get status of the testing tool
     * @returns {*|boolean}
     */
    get isReady() {
        return this._isReady;
    }

    /**
     * Set status of the testing tool
     * @returns {*|boolean}
     */
    set isReady(value) {
        if (typeof value !== 'boolean') {
            throw new TypeError(errors.IS_READY_TYPE_ERROR);
        }
        this._isReady = value;
    }

    get env() {
        return this._env;
    }

    set env(value) {
        this._env = Object.assign({}, this._env, value);
    }

    get buckets() {
        return this._env.visitor.buckets;
    }

    set buckets(buckets) {
        this._env.visitor.buckets = Object.assign({}, this._env.visitor.buckets, buckets);
    }

    /**
     * Initialize options
     */
    setupOptions(options) {
        this.options = options;
        this.options.debug && console.debug(debug.OPTIONS_SETUP);
    }

    /**
     * Initialize browser environment
     */
    setupEnvironment() {
        const url = window && window.location || '';

        this.options.debug && console.debug(debug.ENVIRONMENT_SETUP);

        this.env = {
            // Current URL
            url: url,
            // Viewport information
            viewport: {
                width: window && window.innerWidth || null,
                height: window && window.innerHeight || null,
                cookies: document && document.cookie || null,
                userAgent: navigator && navigator.userAgent || null
            },
            visitor: {
                // Buckets the user was placed in, per component
                buckets: this.getTrafficBucket,

                // If the user visit the page with forced query params
                forcedQueryParams: this.extractQueryParams(url),

                // Do not track setting
                doNotTrack: window && this.checkDoNotTrackSetting() || false,
            }
        };

        this.options.debug && console.debug(this._env);
    }

    setup() {
        this.options.debug && console.debug(debug.SETUP);
        this.isReady = false;
    }

    getTrafficBucket(componentName) {
        // @TODO Read local storage for pre-existing key
        this.load();

        // @TODO Only return and store this in local storage if local storage empty
        return Math.floor((Math.random() * 100));
    }

    /**
     * Check the DoNotTrack settings in user's browser
     * @returns {*}
     */
    checkDoNotTrackSetting() {
        // Firefox override
        if (window.navigator.doNotTrack == 'unspecified') {
            return false;
        }

        return window.navigator.doNotTrack || 0;
    }

    /**
     * Get query parameters
     * @param url
     * @returns {*}
     */
    extractQueryParams(url) {
        const queryParams = Object(url.search.substr(1).split('&'));
        let params = {};

        for (var i = 0; i < queryParams.length; i++) {
            let [key, value] = queryParams[i].split('=');

            params[key] = value;
            // if (params[i].split('=')[0] === paramName) {
            //     var result = params[i].split('=')[1];
            //     if (!isNaN(result)) {
            //         return Number(result);
            //     }
            //     return result;
            // }
        }

        return params;
    }
}
