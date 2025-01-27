# zmk-keymap-utils

This is a collection of helper utilities to simplify the configuration of ZMK keymaps supporting different OS.

They are partly based on the amazing work by [Sunaku](https://github.com/sunaku) and his [glove80-keymap](https://github.com/sunaku/glove80-keymap) project and uses the [Urob's zmk-helpers](https://github.com/urob/zmk-helpers) module to make the implementation and maintenance easier.

## Getting started

### Dependencies

- West-based build supporting modules
- [zmk-helpers](https://github.com/urob/zmk-helpers) (Version 2)

### Installation

To use `zmk-keymap-utils`, you need to add it as a module to your west configuration with its required modules:

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
      revision: main
    - name: zmk-keymap-utils
      remote-name: magicDGS
      revision: main
```

To build locally, check the [ZMK documentation to build with external modules](https://zmk.dev/docs/development/local-toolchain/build-flash#building-with-external-modules).

### Basic usage

> [!NOTE]
> The full documentation can be found on the [documentation page](https://github.com/magicDGS/zmk-keymap-utils/blob/main/docs/README.md).

Define the `OPERATING_SYSTEM` variable with the operating system you intend to use with this keymap: `L` for Linux (default if not provided), `W` for Windows, `M` for MacOS.

- `#define OPERATING_SYSTEM "L"` for Linux (default if none provided)
- `#define OPERATING_SYSTEM "W"` for Windows
- `#define OPERATING_SYSTEM "M"` for MacOS

Source the `init.h` header before using any of the features of the `zmk-keymap-utils` module on your `.keymap` file to provide the initial keycodes and shortcuts for the specified OS.

```c
#include <zmk-keymap-utils/init.h>
```

Then include any extra functionality you need:

```c
// select-word macros based on the Sunaku's implementation of Pascal Getreuer's Select Word macro from QMK
#include <zmk-keymap-utils/select_word.h>
```

# License

This project is released under the [ISC License](LICENSE).

It also contains copied or modified code from other Open Sourcethird-party projects, which can be found in the [NOTICE.md](NOTICE.md) file:

- [sunaku/glove80-keymap](https://github.com/sunaku/glove80-keymap) for initial implementation
- [urob/zmk-helpers](https://github.com/urob/zmk-helpers) is required as a module to use this project.
