# zmk-keymap-utils

This is a collection of helper utilities to simplify the configuration of ZMK keymaps supporting different OS.

They are partly based on the amazing work by [Sunaku](https://github.com/sunaku) and his [glove80-keymaps](https://github.com/sunaku/glove80-keymaps) project and uses the [Urob's zmk-helpers](https://github.com/urob/zmk-helpers) module to make the implementation and maintenance easier.

## Getting started

### Dependencies

- West-based build supporting modules
- [zmk-helpers](https://github.com/urob/zmk-helpers) (Version 2)

### Installation

To use `zmk-keymap-utils`, you need to add it as a module to your west configuration:

```yaml
manifests:
  remotes:
    # zmk and other remotes might be also configured
    - name: magicDGS
      url-base: https://github.com/magicDGS
   projects:
    - name: zmk-keymap-utils
      remote: magicDGS
      # pin version of the module
      revision: v0.3
      # import required modules (i.e., urob/zmk-helpers)
      import: west.yml
```

> [!TIP]
> We recommend to pin the version of the module as shown in the example above.
> Nevertheless, you can also use directly `main`.

To override the required modules, please check the [documentation page].

To build locally, check the [ZMK documentation to build with external modules](https://zmk.dev/docs/development/local-toolchain/build-flash#building-with-external-modules).

### Basic usage

> [!NOTE]
> The full documentation can be found on the [documentation page].

Define the `OPERATING_SYSTEM` variable with the operating system you intend to use with this keymap: `L` for Linux (default if not provided), `W` for Windows, `M` for MacOS.

- `#define OPERATING_SYSTEM "L"` for Linux (default if none provided)
- `#define OPERATING_SYSTEM "W"` for Windows
- `#define OPERATING_SYSTEM "M"` for MacOS

Source the `shortcuts.h` header before using any of the features of the `zmk-keymap-utils` module on your `.keymap` file to provide the initial keycodes and shortcuts for the specified OS.

```c
// #define OPERATING_SYSTEM "L"  // Linux (default) - uncomment to override with explicit values: L, W, M
#include <zmk-keymap-utils/shortcuts.h>
```

Then include any extra functionality you need:

```c
// select-word macros based on the Sunaku's implementation of Pascal Getreuer's Select Word macro from QMK
#include <behaviors/select_word.dtsi>
// timeless home-row mods based on urob's implementation
#include <zmk-keymap-utils/hrm/timeless.h>
```

# License

This project is released under the [ISC License](LICENSE).

It also contains copied or modified code from other Open Sourcethird-party projects, which can be found in the [NOTICE.md](NOTICE.md) file:

- [sunaku/glove80-keymaps](https://github.com/sunaku/glove80-keymaps) for initial implementation
- [urob/zmk-helpers](https://github.com/urob/zmk-helpers) is required as a module to use this project.

## Inspiration

In adition to the projects mentioned in the License, this project is inspired by other zmk-config projects and their configuration:

- [urob/zmk-config](https://github.com/urob/zmk-config), where it was firs described the configuration to implement [Timeless homerow mods](https://github.com/urob/zmk-config?tab=readme-ov-file#timeless-homerow-mods).

<!-- Links: -->

[documentation page]: https://github.com/magicDGS/zmk-keymap-utils/blob/main/docs/README.md
