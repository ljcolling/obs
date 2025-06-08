// src/lib.rs
use wasm_bindgen::prelude::*;
use js_sys::Float64Array;
use web_sys::console;

// Import the `console.log` function from the `web-sys` crate
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

// Define a macro to make console logging easier
macro_rules! console_log {
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

#[wasm_bindgen(start)]
pub fn main() {
    console_log!("WASM module loaded successfully!");
}

/// Process an array of numbers with WASM
/// Example: Apply some mathematical transformation
#[wasm_bindgen]
pub fn process_array(input: &Float64Array) -> Float64Array {
    let input_vec: Vec<f64> = input.to_vec();
    let mut result = Vec::with_capacity(input_vec.len());
    
    // Example processing: apply some mathematical function
    for &value in &input_vec {
        // Example: square root of absolute value + sine
        let processed = (value.abs().sqrt() + value.sin()).abs();
        result.push(processed);
    }
    
    // Convert back to Float64Array for JavaScript
    let js_array = Float64Array::new_with_length(result.len() as u32);
    for (i, &value) in result.iter().enumerate() {
        js_array.set_index(i as u32, value);
    }
    
    js_array
}

/// Fast mathematical operation
#[wasm_bindgen]
pub fn fast_math_operation(a: f64, b: f64) -> f64 {
    // Example: complex mathematical operation that benefits from WASM speed
    let mut result = 0.0;
    for i in 0..1000 {
        let x = a + (i as f64) * 0.001;
        let y = b + (i as f64) * 0.001;
        result += (x * y).sin().cos().abs();
    }
    result / 1000.0
}

/// Process a string (example: simple transformation)
#[wasm_bindgen]
pub fn process_string(input: &str) -> String {
    // Example: reverse words and convert to uppercase
    input
        .split_whitespace()
        .map(|word| word.chars().rev().collect::<String>().to_uppercase())
        .collect::<Vec<String>>()
        .join(" ")
}

/// Advanced array processing with multiple operations
#[wasm_bindgen]
pub fn advanced_array_processing(
    input: &Float64Array,
    operation: &str,
    parameter: f64
) -> Float64Array {
    let input_vec: Vec<f64> = input.to_vec();
    let mut result = Vec::with_capacity(input_vec.len());
    
    for &value in &input_vec {
        let processed = match operation {
            "scale" => value * parameter,
            "power" => value.powf(parameter),
            "log" => if value > 0.0 { (value * parameter).ln() } else { 0.0 },
            "sigmoid" => 1.0 / (1.0 + (-value * parameter).exp()),
            "normalize" => (value - parameter).abs(),
            _ => value, // default: no change
        };
        result.push(processed);
    }
    
    let js_array = Float64Array::new_with_length(result.len() as u32);
    for (i, &value) in result.iter().enumerate() {
        js_array.set_index(i as u32, value);
    }
    
    js_array
}

/// Calculate statistics for an array
#[wasm_bindgen]
pub struct ArrayStats {
    mean: f64,
    variance: f64,
    std_dev: f64,
    min: f64,
    max: f64,
    count: usize,
}

#[wasm_bindgen]
impl ArrayStats {
    #[wasm_bindgen(getter)]
    pub fn mean(&self) -> f64 { self.mean }
    
    #[wasm_bindgen(getter)]
    pub fn variance(&self) -> f64 { self.variance }
    
    #[wasm_bindgen(getter)]
    pub fn std_dev(&self) -> f64 { self.std_dev }
    
    #[wasm_bindgen(getter)]
    pub fn min(&self) -> f64 { self.min }
    
    #[wasm_bindgen(getter)]
    pub fn max(&self) -> f64 { self.max }
    
    #[wasm_bindgen(getter)]
    pub fn count(&self) -> usize { self.count }
}

#[wasm_bindgen]
pub fn calculate_stats(input: &Float64Array) -> ArrayStats {
    let data: Vec<f64> = input.to_vec();
    let count = data.len();
    
    if count == 0 {
        return ArrayStats {
            mean: 0.0,
            variance: 0.0,
            std_dev: 0.0,
            min: 0.0,
            max: 0.0,
            count: 0,
        };
    }
    
    let sum: f64 = data.iter().sum();
    let mean = sum / count as f64;
    
    let variance = data.iter()
        .map(|&x| (x - mean).powi(2))
        .sum::<f64>() / count as f64;
    
    let std_dev = variance.sqrt();
    let min = data.iter().fold(f64::INFINITY, |a, &b| a.min(b));
    let max = data.iter().fold(f64::NEG_INFINITY, |a, &b| a.max(b));
    
    ArrayStats {
        mean,
        variance,
        std_dev,
        min,
        max,
        count,
    }
}
