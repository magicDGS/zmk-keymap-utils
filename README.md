# zmk-keymap-utils

This is a collection of helper utilities to simplify the configuration of ZMK keymaps supporting different OS.

They are partly based on the amazing work by [Sunaku](https://github.com/sunaku) and his [glove80-keymap](https://github.com/sunaku/glove80-keymap) project.

## Installation

The recommended way to use the `zmk-keymap-utils` is to add as a module to your west configuration (`config/west.yml`):

```yaml
manifests:
  remotes:
    # zmk and other remotes might be configured
    - name: magicDGS
      url-base: https://github.com/magicDGS
  projects:
    # zmk and other projects might be configured
    - name: zmk-keymap-utils
      remote-name: magicDGS
      revision: main
```

To build locally, check the [ZMK documentation to build with external modules](https://zmk.dev/docs/development/local-toolchain/build-flash#building-with-external-modules).

## Getting Started

> [!NOTE]
> The full documentation can be found on the [documentation page](https://magicdgs.github.io/zmk-keymap-utils/docs/README.md).

Define the `OPERATING_SYSTEM` variable with the operating system you intend to use with this keymap: `L` for Linux (default if not provided), `W` for Windows, `M` for MacOS.

- `#define OPERATING_SYSTEM "L"` for Linux (default if none provided)
- `#define OPERATING_SYSTEM "W"` for Windows
- `#define OPERATING_SYSTEM "M"` for MacOS

Source the `init.h` header before using any of the features of the `zmk-keymap-utils` module on your `.keymap` file to provide the initial keycodes and shortcuts for the specified OS.

```c
#include "zmk-keymap-utils/init.h"
```

# License

This project is released under the [ISC License](LICENSE).

It also contains copied or modified code from other Open Sourcethird-party projects, which can be found in the [NOTICE.md](NOTICE.md) file.
