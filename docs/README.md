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
      revision: v0.3
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

| Shortcut         | Description                    | L   | W   | M   |
| ---------------- | ------------------------------ | --- | --- | --- |
| `_REDO`          | Redo shortcut                  | ⭐  | ⭐  | ⭐  |
| `_UNDO`          | Undo shortcut                  | ⭐  | ⭐  | ⭐  |
| `_COPY`          | Copy shortcut                  | ⭐  | ⭐  | ⭐  |
| `_PASTE`         | Paste shortcut                 | ⭐  | ⭐  | ⭐  |
| `_FIND`          | Find shortcut                  | ⭐  | ⭐  | ⭐  |
| `_FIND_NEXT`     | Find next shortcut             | ⭐  | ⭐  | ⭐  |
| `_FIND_PREV`     | Find previous shortcut         | ⭐  | ⭐  | ⭐  |
| `_FIND_REPLACE ` | Find and replace shortcut      | ⭐  | ⭐  | ⭐  |
| `_HOME`          | Home key (shortcut in mac)     | ⭐  | ⭐  | ⭐  |
| `_END`           | End key (shortcut in mac)      | ⭐  | ⭐  | ⭐  |
| `_POWER`         | Power shortcut                 | ⭐  | ❌  | ⭐  |
| `_SLEEP`         | Sleep shortcut                 | ⭐  | ❌  | ⭐  |
| `_LOCK`          | Lock shortcut                  | ⭐  | ⭐  | ⭐  |
| `_B_SEARCH_BAR`  | Browser search bar             | ⭐  | ⭐  | ⭐  |
| `_B_URL_BAR`     | Browser URL bar                | ⭐  | ⭐  | ⭐  |
| `_B_DOWNLOADS`   | Browser download shortcut      | ⭐  | ⭐  | ⭐  |
| `_MEH`           | Meh key (Shift+Ctrl+Alt)       | ⭐  | ⭐  | ⭐  |
| `_HYPER`         | Hyper key (Shift+Ctrl+Alt+Gui) | ⭐  | ⭐  | ⭐  |

> [!CAUTION]
> The shortcuts might not work as expected if the `&caps_word` behavior is active.

Also some modifier function smight be provided:

| Modifier  | Description                                            |
| --------- | ------------------------------------------------------ |
| `_C(key)` | OS-specific modifier for shortcuts (Cntrl/Command+key) |
| `_M(key)` | Meh modifier (Meh+key)                                 |
| `_H(key)` | Hyper modifier (Hyper+key)                             |

> [!IMPORTANT]
> The Meh/Hyper related functionality might be available eventually in the zmk project keys.h/modifiers.h defaults (see [PR#2341](https://github.com/zmkfirmware/zmk/pull/2341)).
> Future versions of this module would most likely remove these aliases to encourage its use.

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

## Home-Row Mods

There are different implementations of Home-Row Mods (HRM) that are tailored to different ways of typing.
A good resource to read about them is the [Precondition's Guide to Home Row Mods](https://precondition.github.io/home-row-mods).

Here we provide utilities for different implementations:

- Timeless HRM: based on [Urob's Personal zmk-config](https://github.com/urob/zmk-config/) implemenation.

### Timeless HRM

The "timeless" HRM is using basic ZMK behavior to implement HRMs that are tailored to users without not very consistent typing speeds.
Basically tries to minimize misfires by being independent of any timing configuration.
The `tapping-term-ms` is in practice not infinity but set by default to 175ms, which provides a way to:

- Combine mods with alpha-keys on the same hand
- Press a modifier without another key

More detailed information about this implementation can be found on the [urob/zmk-config README for timeless HRM](https://github.com/urob/zmk-config?tab=readme-ov-file#timeless-homerow-mods).

Here we provide a basic function to define your HRM behaviors with ease.
To use the default configuration, import with:

```c
// select-word macros based on the Sunaku's implementation of Pascal Getreuer's Select Word macro from QMK
#include "zmk-keymap-utils/hrm/timeless.dtsi.h"
```

To use a different `tapping-term-ms`, the `TIMELESS_HRM_QUICK_TAP_MS` property can be used before import (default is `175`).
This configuration can be tweak to support mod+alpha combinations in the same hand, and modifier press without other keys.
For example:

```c
#define TIMELESS_HRM_QUICK_TAP_MS 280
#include "zmk-keymap-utils/hrm/timeless.dtsi.h"
```

After import, you can define your HRMs using the `MAKE_TIMELESS_HRM` function.
This function takes the following parameters:

- `NAME`: the name of the HRM-behavior.
  The behavior will be used on the keymap with `&NAME <mod> <alpha>` (where name is the given parameter).
- `HOLD`: the behavior on hold.
  This is the behavior to trigger on hold, and can be a simple `&kp` (tipically) or any other complex behavior having a parameter.
- `TAP`: the behavior on tap.
  This is the behavior to trigger on tap, and can be a simple `&kp` (tipically) or any other complex behavior having a parameter.
- `TRIGGER_POS`: positions for hold-trigger-key-positions. Tipically the positions on the oposite hand from the HRM hand.

A clear example on how to use this function is a refactor of the [Urob's Personal zmk-config](https://github.com/urob/zmk-config/) HRM implementation using this module.

> [!NOTE]
> This snippet uses the standard key-labels from `urob/zmk-helpers` (see [its README](https://github.com/urob/zmk-helpers?tab=readme-ov-file#key-labels-collection) for more details).

```c
#include "zmk-helpers/key-labels/36.h"                                      // Source key-labels.
#define KEYS_L LT0 LT1 LT2 LT3 LT4 LM0 LM1 LM2 LM3 LM4 LB0 LB1 LB2 LB3 LB4  // Left-hand keys.
#define KEYS_R RT0 RT1 RT2 RT3 RT4 RM0 RM1 RM2 RM3 RM4 RB0 RB1 RB2 RB3 RB4  // Right-hand keys.
#define THUMBS LH2 LH1 LH0 RH0 RH1 RH2                                      // Thumb keys.

MAKE_TIMELESS_HRM(hml, &kp, &kp, KEYS_R THUMBS) // Left-hand HRMs - for example, &hml LGUI A
MAKE_TIMELESS_HRM(hmr, &kp, &kp, KEYS_L THUMBS) // Right-hand HRMs - for example, &hmr LGUI O
```
