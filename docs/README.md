# ZMK Keymap Utils

This is a collection of helper utilities to simplify the configuration of ZMK keymaps supporting different OS.

## Requirements

To use `zmk-keymap-utils`, you need to add it as a module to your west configuration with its required modules:

- This module itself or a compatible fork
- [zmk-helpers](https://github.com/urob/zmk-helpers) (Version 2) or a compatible fork

```yaml
manifests:
  remotes:
    # zmk and other remotes might be configured
    - name: magicDGS
      url-base: https://github.com/magicDGS
    - name: urob
      url-base: https://github.com/urob
   projects:
    # zmk and other projects might be configured
    - name: zmk-helpers
      remote-name: urob
      # pin version of the module
      revision: v0.1
    - name: zmk-keymap-utils
      remote-name: magicDGS
      # pin version of the module
      revision: v0.1
```

> [!TIP]
> We recommend to pin the version of the modules as shown in the example above.
> Nevertheless, you can also use directly `main`.

## Initial setup

Define the `OPERATING_SYSTEM` variable with the operating system you intend to use with this keymap:

- `#define OPERATING_SYSTEM "L"` for Linux (default if none provided)
- `#define OPERATING_SYSTEM "W"` for Windows
- `#define OPERATING_SYSTEM "M"` for MacOS

Source the `init.h` header before using any of the features of the `zmk-keymap-utils` module on your `.keymap` file to provide the initial keycodes and shortcuts for the specified OS.

```c
#include "zmk-keymap-utils/init.h"
```

> [!CAUTION]
> Including the `init.h` header includes also the `zmk-helpers` module.
> Please, check the [README](https://github.com/urob/zmk-helpers/blob/main/README.md) of the `zmk-helpers` module for more information.

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

## Select Word

The `select_word.dtsi` include file provides support for extend/select behaviors for for the specified OS.
They are based on the [Pascal Getreuer's Select Word macro from QMK](https://getreuer.info/posts/keyboards/select-word/index.html) implementation for ZMK by [Sunaku](https://github.com/sunaku/glove80-keymaps).

To use the default configuration, import with:

```c
// select-word macros based on the Sunaku's implementation of Pascal Getreuer's Select Word macro from QMK
#include "zmk-keymap-utils/select_word.h"
```

To use a different delay, the `SELECT_WORD_DELAY` property can be used before import (default is `1`).
This configuration defines how long the macro waits (in ms) after moving the cursor before it selects a word.
A larger delay may allow th"macro to move to the next word upon each invocation.
For example:

```c
#define SELECT_WORD_DELAY 50
#include "zmk-keymap-utils/select_word.h"
```

The behaviors provided after import are the following:

| Behavior       | Description                                                             |
| -------------- | ----------------------------------------------------------------------- |
| `&select_all`  | Select the whole text                                                   |
| `&select_none` | Remove current selection                                                |
| `&select_word` | Select current word (jump to next word upon each successive invocation) |
| `&extend_word` | Extend current selection by one word                                    |
| `&select_line` | Select current line                                                     |
| `&extend_line` | Extend current selection by one line                                    |

> [!TIP]
> The behaviors are implemented in such a way that using them with the shift modifier active selects/extends in the t
