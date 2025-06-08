/**
 * WASM Module wrapper with Observable-friendly API
 */
export declare class WasmProcessor {
    private static initialized;
    private static wasmModule;
    /**
     * Initialize the WASM module
     * This needs to be called before using any WASM functions
     */
    static init(wasmUrl?: string): Promise<void>;
    /**
     * Check if WASM module is initialized
     */
    static isInitialized(): boolean;
    /**
     * Example: Process array data with WASM
     */
    static processArray(data: Float64Array): Float64Array;
    /**
     * Example: Fast mathematical operations
     */
    static fastMath(a: number, b: number): number;
    /**
     * Example: String processing with WASM
     */
    static processString(input: string): string;
}
/**
 * High-level data processing utilities that use WASM under the hood
 */
export declare class FastDataProcessor {
    private data;
    constructor(data: number[] | Float64Array);
    /**
     * Apply WASM-accelerated processing
     */
    process(): Promise<Float64Array>;
    /**
     * Get original data
     */
    getData(): Float64Array;
    /**
     * Convert to regular array for Observable compatibility
     */
    toArray(): number[];
}
/**
 * Observable-friendly utilities that don't require WASM
 */
export declare const ObservableUtils: {
    /**
     * Create a WASM-compatible data loader
     */
    loadWasmModule(wasmUrl: string): Promise<void>;
    /**
     * Check WASM support in current environment
     */
    supportsWasm(): boolean;
    /**
     * Generate test data for WASM processing
     */
    generateTestData(size: number): Float64Array;
    /**
     * Format large numbers for display
     */
    formatLargeNumber(num: number): string;
};
/**
 * Performance monitoring utilities
 */
export declare class PerformanceMonitor {
    private startTime;
    private measurements;
    start(): void;
    end(label: string): number;
    getStats(label: string): {
        avg: number;
        min: number;
        max: number;
        count: number;
    } | null;
    clear(): void;
}
declare const _default: {
    WasmProcessor: typeof WasmProcessor;
    FastDataProcessor: typeof FastDataProcessor;
    ObservableUtils: {
        /**
         * Create a WASM-compatible data loader
         */
        loadWasmModule(wasmUrl: string): Promise<void>;
        /**
         * Check WASM support in current environment
         */
        supportsWasm(): boolean;
        /**
         * Generate test data for WASM processing
         */
        generateTestData(size: number): Float64Array;
        /**
         * Format large numbers for display
         */
        formatLargeNumber(num: number): string;
    };
    PerformanceMonitor: typeof PerformanceMonitor;
};
export default _default;
//# sourceMappingURL=index.d.ts.map