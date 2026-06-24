---
title: "keyboard layout vs bluetooth keyboard issues"
category: "linux"
updatedDate: 2026-06-24
tags: ["Keyboard", "Locale", "Shell", "Bash", "Openbox", "Layout"]
pinned: false
---

### Context

When integrating a compact Artek Bluetooth keyboard into a Lubuntu environment, a significant rift emerged between the physical hardware legends and standard software input mappings. The compact keyboard depicts the backslash (`\`) and pipe (`|`) characters as secondary legends directly onto the physical `Z` and `X` keys. However, applying standard UK Mac or Windows layouts via the LXQt graphical interface failed to register these mappings correctly—instead outputting layout anomalies like guillemets (`«»`) or angle brackets (`<>`), while scrambling standard punctuation like the double-quote (`"`) and at-symbol (`@`). Furthermore, the physical positions of the Left-Alt and Left-Win keys were swapped (akin to a proprietory Mac layout) relative to a standard layout, breaking my core `Alt + Tab` muscle memory.

Compounding the issue, the graphical LXQt Keyboard State Indicator repeatedly overrode manual dual-layout changes, wiping out custom configurations and resetting the system back to a default UK Extended profile. To resolve this without desktop environment interference, the GUI configuration tools were bypassed entirely in favor of a low-level, software-driven translation layer handled via X11 utilities and custom window manager keybinds.

### Implementation

A custom Bash toggle script was developed to intercept the hardware mapping, utilizing `xmodmap` to dynamically audit keycode 52 (`Z`). When the compact keyboard profile is active, the script forces keycodes 52 and 53 to output backslash and pipe, while transparently remapping the Left-Alt and Left-Win modifiers to preserve physical muscle memory. To counter the fact that flipping these modifiers turned standard Openbox window-snapping commands (`Meta + Win + Left`) into an illogical duplicate sequence (`Win + Win + Left`), a dual-binding strategy was implemented within `~/.config/openbox/rc.xml`. By registering mirrored bindings for both layout states, seamless workspace window snapping was achieved regardless of which hardware profile is actively toggled.

#### Snippets

1. THE TOGGLE SCRIPT

```bash
#!/bin/bash

# A resilient regex pattern that looks for keycode 52 followed anywhere by 'backslash'
if xmodmap -pke | grep -E -q '^keycode[[:space:]]+52[[:space:]]=.*backslash'; then
    # LAPTOP NATIVE MODE: Clear all custom overrides and restore native UK Extended
    setxkbmap -layout gb -variant extd -option ""
    if command -v notify-send >/dev/null; then
        # If notify-send is available, send a message to task tray
        notify-send "Keyboard Profile" "Switched to Laptop Native Layout" --icon=input-keyboard
    fi
else
    # ARTECK DESKTOP MODE: Swap Left Alt and Left Win, then apply custom Z and X layers
    setxkbmap -layout gb -variant extd -option altwin:swap_lalt_lwin
    xmodmap -e "keycode 52 = z Z z Z backslash guillemotleft"
    xmodmap -e "keycode 53 = x X x X bar guillemotright"
    if command -v notify-send >/dev/null; then
        notify-send "Keyboard Profile" "Switched to Arteck Desk Layout (Alt/Win Swapped)" --icon=input-keyboard
    fi
fi
```

2. THE OPENBOX SNAPPING CONFIG

```xml
<!-- WINDOW SNAPPING: LEFT HALF -->

<keybind key="A-W-Left">
  <action name="UnmaximizeFull"/>
  <action name="MaximizeVert"/>
  <action name="MoveResizeTo">
    <width>50%</width>
    <x>0</x>
  </action>
  <action name="MoveToEdgeWest"/>
</keybind>
<keybind key="M-A-Left">
  <action name="UnmaximizeFull"/>
  <action name="MaximizeVert"/>
  <action name="MoveResizeTo">
    <width>50%</width>
    <x>0</x>
  </action>
  <action name="MoveToEdgeWest"/>
</keybind>

<!-- WINDOW SNAPPING: RIGHT HALF -->
<keybind key="A-W-Right">
  <action name="UnmaximizeFull"/>
  <action name="MaximizeVert"/>
  <action name="MoveResizeTo">
    <width>50%</width>
    <x>50%</x>
  </action>
  <action name="MoveToEdgeEast"/>
</keybind>
<keybind key="M-A-Right">
  <action name="UnmaximizeFull"/>
  <action name="MaximizeVert"/>
  <action name="MoveResizeTo">
    <width>50%</width>
    <x>50%</x>
  </action>
  <action name="MoveToEdgeEast"/>
</keybind>
```

All that remains is to configure a hotkey to bind our new command `toggle_keys.sh` shell script, after making it executable and available in the $PATH.
