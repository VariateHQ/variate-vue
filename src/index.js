import * as debug from './debug';
import * as errors from './errors';
import bucketing from './utilities/bucketing';

const LOCAL_STORAGE_MAIN_TRAFFIC_BUCKET_KEY = 'testing-tool-main-bucket';
const LOCAL_STORAGE_TRAFFIC_BUCKETS_KEY = 'testing-tool-buckets';

export default class Testing {
    constructor(options) {
        this.setupOptions(options);
        this.setupEnvironment();
        this.setup();
        this.qualify();
    }

    /**
     * Get testing options
     * @returns {*}
     */
    get options() {
        return this._options;
    }

    /**
     * Set testing options
     * @param options
     */
    set options(options) {
        this._options = Object.assign({}, this._options, options);
    }

    /**
     * Get testing configuration
     * @returns {*}
     */
    get config() {
        return this._options.config;
    }

    /**
     * Set testing configuration
     * @param config
     */
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
     * @param value
     */
    set isReady(value) {
        if (typeof value !== 'boolean') {
            throw new TypeError(errors.IS_READY_TYPE_ERROR);
        }
        this._isReady = value;
    }

    /**
     * Get qualification status for visitor
     * @returns {*|boolean}
     */
    get isQualified() {
        return this._isQualified;
    }

    /**
     * Set qualification status for visitor
     * @param value
     */
    set isQualified(value) {
        if (typeof value !== 'boolean') {
            throw new TypeError(errors.IS_QUALIFIED_TYPE_ERROR);
        }
        this._isQualified = value;
    }

    /**
     * Get testing environment
     * @returns {*}
     */
    get env() {
        return this._env;
    }

    /**
     * Set testing environment
     * @param value
     */
    set env(value) {
        this._env = Object.assign({}, this._env, value);
    }

    /**
     * Initialize options
     */
    setupOptions(options) {
        this.options = options;
        this.options.debug && console.debug(debug.SETUP_OPTIONS);
    }

    /**
     * Initialize testing environment
     */
    setupEnvironment() {
        const url = window && window.location || '';

        this.options.debug && console.debug(debug.SETUP_ENVIRONMENT);

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

            // Visitor information
            visitor: {
                // Generate/retrieve main traffic bucket
                mainBucket: this.getMainTrafficBucket(),

                // If the user visit the page with forced query params
                forcedQueryParams: this.extractQueryParams(url),

                // Do not track setting
                doNotTrack: window && this.checkDoNotTrackSetting() || false,
            }
        };

        this.options.debug && console.debug(this._env);
    }

    /**
     * Setup testing
     */
    setup() {
        this.options.debug && console.debug(debug.SETUP);
        this.isReady = true;
    }

    /**
     * Qualify visitor for experiments
     */
    qualify() {
        this.loadExperiments();

        // Override with query params info if necessary
        this.loadQueryParamsOverrides();

        this.isQualified = true;
    }

    loadExperiments() {
        // 1. Check targeting
        // 2. Qualify user
        // 3. Generate/retrieve main traffic bucket for visitor
        // 4. Qualify user for experiments
        // 5. Generate/retrieve buckets if qualified
    }

    loadQueryParamsOverrides() {
        // Load experiments according to query params override
        if (Object.keys(this.env.visitor.forcedQueryParams).length && this.env.visitor.forcedQueryParams.force) {
            this.options.debug && console.debug(debug.QUALIFY_QUERY_PARAMS);
        }
    }

    /**
     * Bucket number generator from 0 to 100
     * @returns {number}
     */
    generateTrafficBucket() {
        return Math.floor((Math.random() * 100));
    }

    /**
     * Retrieve or generate main traffic bucket for visitor
     * @returns {number}
     */
    getMainTrafficBucket() {
        let bucket = parseInt(localStorage.getItem(LOCAL_STORAGE_MAIN_TRAFFIC_BUCKET_KEY), 10);

        if (!bucket) {
            bucket = this.generateTrafficBucket();
            localStorage.setItem(LOCAL_STORAGE_MAIN_TRAFFIC_BUCKET_KEY, bucket);
        }

        return bucket;
    }

    /**
     * Check the DoNotTrack settings in user's browser
     * @returns {boolean}
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
     * @returns {object}
     */
    extractQueryParams(url) {
        const queryParams = Object(url.search.substr(1).split('&').filter(item => item.length));
        let params = {};

        for (var i = 0; i < queryParams.length; i++) {
            let [key, value] = queryParams[i].split('=');

            if (!isNaN(value)) {
                params[key] = Number(value);
            } else if (value == 'true' || value == 'false') {
                params[key] = value == 'true' ? true : false;
            } else {
                params[key] = value;
            }
        }

        return params;
    }
}
