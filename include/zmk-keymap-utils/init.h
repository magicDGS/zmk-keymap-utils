/* Original file copied from Sunaku's Keymap - https://github.com/sunaku/glove80-keymaps */

// OPERATING_SYSTEM defines which operating system you intend to use
// with this keymap, because shortcuts vary across operating systems.
//
// - https://zmk.dev/docs/codes
// - https://en.wikipedia.org/wiki/Table_of_keyboard_shortcuts
//
#ifndef OPERATING_SYSTEM
#define OPERATING_SYSTEM 'L' // linux
//#define OPERATING_SYSTEM 'M' // macos
//#define OPERATING_SYSTEM 'W' // windows
#endif
#if OPERATING_SYSTEM == 'M'
  #define _C      LG
  #define _A_TAB  LGUI
  #define _G_TAB  LALT
  #define _REDO   _C(LS(Z))
  #define _POWER  K_POWER
  #define _W      LA
  #define _HOME   _C(LEFT)
  #define _END    _C(RIGHT)
  #define _EMOJI  LG(LC(SPACE))
#else
  #define _C      LC
  #define _A_TAB  LALT
  #define _G_TAB  LGUI
  #define _REDO   _C(Y)
  #define _POWER  C_POWER
  #define _W      _C
  #define _HOME   HOME
  #define _END    END
  #define _EMOJI  LG(DOT)
#endif
#define _SLEEP      C_SLEEP
#if OPERATING_SYSTEM == 'W'
  #define _LOCK   LG(L)
#elif OPERATING_SYSTEM == 'M'
  #define _LOCK   _C(LC(Q))
#elif OPERATING_SYSTEM == 'L'
  #define _LOCK   K_LOCK
#endif
#define _UNDO       _C(Z)
#define _CUT        _C(X)
#define _COPY       _C(C)
#define _PASTE      _C(V)
#define _FIND       _C(F)
#define _FIND_NEXT  _C(G)
#define _FIND_PREV  _C(LS(G))

/* Include helpers here
   NOTE: all usages of ZMK_ functions are overriden from this point on,
   so only include modules/functions working with them
*/
#include <zmk-helpers/helper.h>