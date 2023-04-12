# ts-store

ts-store is a simple key-value store interface for TypeScript. The main use case
is for library authors to allow users to provide their own store implementation.

The goals of this project are:

- Provide a simple, reusable interface for store implementations
- Provide modern JS/TS experience (e.g. async/await, promises, etc.)
- Stores can be implemented for a wide range platforms (e.g. browser, node, etc.)
- Stores can be implemented for a wide range of storage types (e.g. memory, disk, mongo, localstorage, etc.)

## Creating a Store Implementation

To create a store implementation, implement the `Store` interface.

### Class Example

```typescript
import { Store } from "ts-store";

class MyStore implements Store {
  get(key: string): Promise<any> {
    // ...
  }

  set(key: string, value: any): Promise<void> {
    // ...
  }

  delete(key: string): Promise<void> {
    // ...
  }
}
```

### Object Example

```typescript
import { Store } from "ts-store";

const myStore: Store = {
  get(key: string): Promise<any> {
    // ...
  },

  set(key: string, value: any): Promise<void> {
    // ...
  },

  delete(key: string): Promise<void> {
    // ...
  },
};
```

See [memory store](src/memory-store.ts) for a more complete example.

## Using a Store Implementation

### Example Library

```typescript
// Library code
import { Store } from "ts-store";

function helloWorldLibrary(store: Store<string>) {
  const saveHello = (value: string) => store.set("hello", value);
  const getHello = () => store.get("hello");

  return {
    saveHello,
    getHello,
  };
}

// Use the library
import { MemoryStore } from "ts-store"; // or your own store implementation

async function main() {
  const lib = helloWorldLibrary(new MemoryStore());

  // save and read example
  await lib.saveHello("world");
  const hello = await lib.getHello();
  console.log(hello); // { key: 'hello', value: 'world', createdAt: 1681318294496, updatedAt: 1681318294496 }

  // wait a second
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // update and read example
  await lib.saveHello("gamer");
  const hello2 = await lib.getHello();
  console.log(hello2); // { key: 'hello', value: 'gamer', createdAt: 1681318294496, updatedAt: 1681318295500 }
}
main();
```
