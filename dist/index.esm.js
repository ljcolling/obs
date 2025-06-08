let wasm;

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); }
let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

/**
 * Process an array of numbers with WASM
 * Example: Apply some mathematical transformation
 * @param {Float64Array} input
 * @returns {Float64Array}
 */
function process_array(input) {
    const ret = wasm.process_array(input);
    return ret;
}

/**
 * Fast mathematical operation
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function fast_math_operation(a, b) {
    const ret = wasm.fast_math_operation(a, b);
    return ret;
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}
/**
 * Process a string (example: simple transformation)
 * @param {string} input
 * @returns {string}
 */
function process_string(input) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.process_string(ptr0, len0);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

(typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_arraystats_free(ptr >>> 0, 1));

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_buffer_609cc3eee51ed158 = function(arg0) {
        const ret = arg0.buffer;
        return ret;
    };
    imports.wbg.__wbg_length_c67d5e5c3b83737f = function(arg0) {
        const ret = arg0.length;
        return ret;
    };
    imports.wbg.__wbg_log_045782741ad232bd = function(arg0, arg1) {
        console.log(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbg_new_78c8a92080461d08 = function(arg0) {
        const ret = new Float64Array(arg0);
        return ret;
    };
    imports.wbg.__wbg_newwithlength_5ebc38e611488614 = function(arg0) {
        const ret = new Float64Array(arg0 >>> 0);
        return ret;
    };
    imports.wbg.__wbg_set_29b6f95e6adb667e = function(arg0, arg1, arg2) {
        arg0.set(arg1, arg2 >>> 0);
    };
    imports.wbg.__wbg_setindex_1ee8d4cff9651c00 = function(arg0, arg1, arg2) {
        arg0[arg1 >>> 0] = arg2;
    };
    imports.wbg.__wbindgen_init_externref_table = function() {
        const table = wasm.__wbindgen_export_0;
        const offset = table.grow(4);
        table.set(0, undefined);
        table.set(offset + 0, undefined);
        table.set(offset + 1, null);
        table.set(offset + 2, true);
        table.set(offset + 3, false);
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return ret;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedUint8ArrayMemory0 = null;


    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (typeof module_or_path !== 'undefined') {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path);
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead');
        }
    }

    if (typeof module_or_path === 'undefined') {
        module_or_path = new URL('my_wasm_module_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

// src/index.ts
// Main module file for Observable with WASM integration
// WASM module will be generated by wasm-pack
// Import the WASM bindings (these will be generated)
/**
 * WASM Module wrapper with Observable-friendly API
 */
class WasmProcessor {
    /**
     * Initialize the WASM module
     * This needs to be called before using any WASM functions
     */
    static async init(wasmUrl) {
        if (this.initialized)
            return;
        try {
            // For Observable, we need to provide the WASM file URL
            if (wasmUrl) {
                this.wasmModule = await __wbg_init(wasmUrl);
            }
            else {
                // Try to load from the same origin
                this.wasmModule = await __wbg_init();
            }
            this.initialized = true;
        }
        catch (error) {
            console.error('Failed to initialize WASM module:', error);
            throw new Error('WASM initialization failed');
        }
    }
    /**
     * Check if WASM module is initialized
     */
    static isInitialized() {
        return this.initialized;
    }
    /**
     * Example: Process array data with WASM
     */
    static processArray(data) {
        if (!this.initialized) {
            throw new Error('WASM module not initialized. Call WasmProcessor.init() first.');
        }
        // Example WASM function call
        // Replace with your actual WASM functions
        return process_array(data);
    }
    /**
     * Example: Fast mathematical operations
     */
    static fastMath(a, b) {
        if (!this.initialized) {
            throw new Error('WASM module not initialized. Call WasmProcessor.init() first.');
        }
        return fast_math_operation(a, b);
    }
    /**
     * Example: String processing with WASM
     */
    static processString(input) {
        if (!this.initialized) {
            throw new Error('WASM module not initialized. Call WasmProcessor.init() first.');
        }
        return process_string(input);
    }
}
WasmProcessor.initialized = false;
WasmProcessor.wasmModule = null;
/**
 * High-level data processing utilities that use WASM under the hood
 */
class FastDataProcessor {
    constructor(data) {
        this.data = data instanceof Float64Array ? data : new Float64Array(data);
    }
    /**
     * Apply WASM-accelerated processing
     */
    async process() {
        if (!WasmProcessor.isInitialized()) {
            throw new Error('WASM module not initialized. Call WasmProcessor.init() first.');
        }
        return WasmProcessor.processArray(this.data);
    }
    /**
     * Get original data
     */
    getData() {
        return this.data;
    }
    /**
     * Convert to regular array for Observable compatibility
     */
    toArray() {
        return Array.from(this.data);
    }
}
/**
 * Observable-friendly utilities that don't require WASM
 */
const ObservableUtils = {
    /**
     * Create a WASM-compatible data loader
     */
    async loadWasmModule(wasmUrl) {
        await WasmProcessor.init(wasmUrl);
    },
    /**
     * Check WASM support in current environment
     */
    supportsWasm() {
        return typeof WebAssembly === 'object' && typeof WebAssembly.instantiate === 'function';
    },
    /**
     * Generate test data for WASM processing
     */
    generateTestData(size) {
        const data = new Float64Array(size);
        for (let i = 0; i < size; i++) {
            data[i] = Math.random() * 100;
        }
        return data;
    },
    /**
     * Format large numbers for display
     */
    formatLargeNumber(num) {
        if (num >= 1e9)
            return (num / 1e9).toFixed(1) + 'B';
        if (num >= 1e6)
            return (num / 1e6).toFixed(1) + 'M';
        if (num >= 1e3)
            return (num / 1e3).toFixed(1) + 'K';
        return num.toString();
    }
};
/**
 * Performance monitoring utilities
 */
class PerformanceMonitor {
    constructor() {
        this.startTime = 0;
        this.measurements = new Map();
    }
    start() {
        this.startTime = performance.now();
    }
    end(label) {
        const duration = performance.now() - this.startTime;
        if (!this.measurements.has(label)) {
            this.measurements.set(label, []);
        }
        this.measurements.get(label).push(duration);
        return duration;
    }
    getStats(label) {
        const measurements = this.measurements.get(label);
        if (!measurements || measurements.length === 0)
            return null;
        const avg = measurements.reduce((a, b) => a + b) / measurements.length;
        const min = Math.min(...measurements);
        const max = Math.max(...measurements);
        return { avg, min, max, count: measurements.length };
    }
    clear() {
        this.measurements.clear();
    }
}
// Default export for convenience
var index = {
    WasmProcessor,
    FastDataProcessor,
    ObservableUtils,
    PerformanceMonitor
};

export { FastDataProcessor, ObservableUtils, PerformanceMonitor, WasmProcessor, index as default };
