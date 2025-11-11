# Observable

A simple Observer pattern implementation for reactive programming.

## Overview

This module provides a lightweight Observable class that implements the Observer pattern, allowing objects to subscribe to value changes and react accordingly. It's designed for state management and reactive programming scenarios.

## Usage

```ts
import { Observable } from 'observable'

// Create an observable with initial value
const state = new Observable({ count: 0, name: 'John' })

// Subscribe to changes
state.subscribe((newValue) => {
  console.log('State changed:', newValue)
})

// Update the value (triggers all subscribers)
state.value = { count: 1, name: 'Jane' }
```

## API

### Constructor
```ts
new Observable<T>(initialValue: T)
```

### Properties
- `value: T` - Get or set the current value. Setting triggers notification to all subscribers.

### Methods
- `subscribe(callback: (value: T) => void)` - Register a callback to be called when value changes
- `notify()` - Manually trigger notification to all subscribers

## Important Notes

**Reference vs Value Changes**: The Observable only detects when the entire value is replaced, not when properties of objects are mutated:

```ts
const obs = new Observable({ foo: 'bar' })

// This triggers subscribers
obs.value = { foo: 'baz' }

// This does NOT trigger subscribers L
obs.value.foo = 'baz'
```

For object property changes, you need to replace the entire object or call `notify()` manually.
