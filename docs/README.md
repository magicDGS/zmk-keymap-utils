# ZMK Keymap Utils

This is a collection of helper utilities to simplify the configuration of ZMK keymaps supporting different OS.

## Initial setup

Define the `OPERATING_SYSTEM` variable with the operating system you intend to use with this keymap:

- `#define OPERATING_SYSTEM "L"` for Linux (default if none provided)
- `#define OPERATING_SYSTEM "W"` for Windows
- `#define OPERATING_SYSTEM "M"` for MacOS

Source the `init.h` header before using any of the features of the `zmk-keymap-utils` module on your `.keymap` file to provide the initial keycodes and shortcuts for the specified OS.

```c
#include "zmk-keymap-utils/init.h"
```

## Definitions and behaviors

The `zmk-keymap-utils` module provides definitions and behaviors that can be used on an OS-agnostic way to configure the keymap, by adding aliases for the keycodes or using shortcuts/macros if they are not possible.

Nevertheless, some behaviors are not available on all OS, and will be marked in the tables below with `❌` or `❓` to indicate that they are not available or they are unknown.

### Core definitions

The core definitions are provided by default by the intial setup (including the `init.h` header on the `.keymap` file), which can be used with `&kp` or any other behavior:

| Shortcut     | Description                | L   | W   | M   |
| ------------ | -------------------------- | --- | --- | --- |
| `_REDO`      | Redo shortcut              | ⭐  | ⭐  | ⭐  |
| `_UNDO`      | Undo shortcut              | ⭐  | ⭐  | ⭐  |
| `_COPY`      | Copy shortcut              | ⭐  | ⭐  | ⭐  |
| `_PASTE`     | Paste shortcut             | ⭐  | ⭐  | ⭐  |
| `_FIND`      | Find shortcut              | ⭐  | ⭐  | ⭐  |
| `_FIND_NEXT` | Find next shortcut         | ⭐  | ⭐  | ⭐  |
| `_FIND_PREV` | Find previous shortcut     | ⭐  | ⭐  | ⭐  |
| `_HOME`      | Home key (shortcut in mac) | ⭐  | ⭐  | ⭐  |
| `_END`       | End key (shortcut in mac)  | ⭐  | ⭐  | ⭐  |
| `_POWER`     | Power shortcut             | ⭐  | ❌  | ⭐  |
| `_SLEEP`     | Sleep shortcut             | ⭐  | ❌  | ⭐  |
| `_LOCK`      | Lock shortcut              | ⭐  | ⭐  | ⭐  |

> [!CAUTION]
> The shortcuts might not work as expected if the `&caps_word` behavior is active.

Other definitons might be used on different behaviors and are not intended to be consumed by the user.
