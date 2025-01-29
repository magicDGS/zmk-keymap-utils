/*
 * Adapted from urob's zmk-config repo: https://github.com/urob/zmk-config/
 */

// defines the quick-tap to be used on timeless-homerow-mods
#ifndef TIMELESS_HRM_QUICK_TAP_MS
    #define TIMELESS_HRM_QUICK_TAP_MS 175
#endif

/*
 * Make the timeless HRM
 *
 * - NAME: the name of the HRM-behavior
 * - HOLD: the behavior on hold (tipically &kp)
 * - TAP: the behavior on tap (tipically &kp)
 * - TRIGGER_POS: positions for hold-trigger-key-positions
 * 
 * Creates after calling a "&NAME <HOLD_KEY> <TAP_KEY>" behavior
 */
#define MAKE_TIMELESS_HRM(NAME, HOLD, TAP, TRIGGER_POS)    \
  ZMK_HOLD_TAP(NAME,                                       \
               bindings = <HOLD>, <TAP>;                   \
               flavor = "balanced";                        \
               tapping-term-ms = <280>;                    \
               quick-tap-ms = <TIMELESS_HRM_QUICK_TAP_MS>; \
               require-prior-idle-ms = <150>;              \
               hold-trigger-on-release;                    \
               hold-trigger-key-positions = <TRIGGER_POS>; \
)