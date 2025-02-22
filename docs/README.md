# ZMK Keymap Utils

This is a collection of helper utilities to simplify the configuration of ZMK keymaps supporting different OS.

## Requirements

To use `zmk-keymap-utils`, you need to add it as a module to your west configuration importing the required modules from west:

````yaml
manifests:
  remotes:
    # zmk and other remotes might be configured
    - name: magicDGS
      url-base: https://github.com/magicDGS
   projects:
    # zmk and other projects might be configured
    - name: zmk-keymap-utils
      remote: magicDGS
      # pin version of the module
      revision: v0.3
      # import required modules (i.e., urob/zmk-helpers)
      import: west.yml

You can also import it with a different version, remote or path for the required modules.
For example, a west configuration with the main version of the module and its [zmk-helpers](https://github.com/urob/zmk-helpers) (Version 2) requirement
that is located on the `modules` path:

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
      remote: urob
      path: modules/zmk-helpers
    - name: zmk-keymap-utils
      remote: magicDGS
      path: modules/zmk-keymap-utils
````

> [!TIP]
> We recommend to pin the version of the modules as shown in the example above.
> Nevertheless, you can also use directly `main`.

## Initial setup

Define the `OPERATING_SYSTEM` variable with the operating system you intend to use with this keymap:

- `#define OPERATING_SYSTEM "L"` for Linux (default if none provided)
- `#define OPERATING_SYSTEM "W"` for Windows
- `#define OPERATING_SYSTEM "M"` for MacOS

It is important to define the `OPERATING_SYSTEM` before including any of the features from the `zmk-keymap-utils` module to have the proper configuration for your operating system.

## Definitions and behaviors

The `zmk-keymap-utils` module provides definitions and behaviors that can be used on an OS-agnostic way to configure the keymap, by adding aliases for the keycodes or using shortcuts/macros if they are not possible.

To use this definitions, source the `shortcuts.h` header before to provide the keycodes and shortcuts for the specified OS.

```c
#include "zmk-keymap-utils/init.h"
```

### Shortcuts and modifiers

The shortcuts and modifieres are provided with the `shortcuts.h` header, which can be used with `&kp` or any other behavior.

To use this definitions, source the `shortcuts.h` header:

```c
#include <zmk-keymap-utils/shortcuts.h>
```

> [!TIP]
> We recommend to import the shortcuts before any other behavior, as some of them would use them.
> They would be imported by default if not provided.

Those shortcuts and modifiers work for the specified OS;
nevertheless, not all are available on all and migth not be available (marked in the tables below with `❌`) or its behavior is unknown (marked with `❓`).

Provided shortcuts include:

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

Also some modifier functions are provided:

| Modifier  | Description                                            |
| --------- | ------------------------------------------------------ |
| `_C(key)` | OS-specific modifier for shortcuts (Cntrl/Command+key) |
| `_M(key)` | Meh modifier (Meh+key)                                 |
| `_H(key)` | Hyper modifier (Hyper+key)                             |

> [!IMPORTANT]
> The Meh/Hyper related functionality might be available eventually in the zmk project `keys.h`/`modifiers.h` defaults (see [PR#2341](https://github.com/zmkfirmware/zmk/pull/2341)).
> Future versions of this module would most likely remove these aliases to encourage its use.

Other definitons might be used on different behaviors and are not intended to be consumed by the user.

## Select Word

The `select_word.dtsi` include file provides support for extend/select behaviors for for the specified OS.
They are based on the [Pascal Getreuer's Select Word macro from QMK](https://getreuer.info/posts/keyboards/select-word/index.html) implementation for ZMK by [Sunaku](https://github.com/sunaku/glove80-keymaps).

To use the default configuration, import with:

```c
// select-word macros based on the Sunaku's implementation of Pascal Getreuer's Select Word macro from QMK
#include <behaviors/select_word.h>
```

> [!CAUTION]
> Including the `select_word.h` behavior includes also `zmk-helpers` module.
> Please, check the [README](https://github.com/urob/zmk-helpers/blob/main/README.md) of the `zmk-helpers` module for more information.

> [!CAUTION]
> The `select_word.h` behavior requires includes, if not already sourced, the `shortcuts.h` header.
> We recommend to import it beforehand to ensure that the they are always included.

To use a different delay, the `SELECT_WORD_DELAY` property can be used before import (default is `1`).
This configuration defines how long the macro waits (in ms) after moving the cursor before it selects a word.
A larger delay may allow th"macro to move to the next word upon each invocation.
For example:

```c
#define SELECT_WORD_DELAY 50
#include <behaviors/select_word.h>
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
#include "zmk-keymap-utils/hrm/timeless.h"
```

> [!CAUTION]
> Including the `select_word.h` behavior includes also the `zmk-helpers` module.
> Please, check the [README](https://github.com/urob/zmk-helpers/blob/main/README.md) of the `zmk-helpers` module for more information.

To use a different `tapping-term-ms`, the `TIMELESS_HRM_QUICK_TAP_MS` property can be used before import (default is `175`).
This configuration can be tweak to support mod+alpha combinations in the same hand, and modifier press without other keys.
For example:

```c
#define TIMELESS_HRM_QUICK_TAP_MS 280
#include <zmk-keymap-utils/hrm/timeless.h>
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
