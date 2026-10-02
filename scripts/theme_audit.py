#!/usr/bin/env python3
"""Audit a CSS file for core Material color roles and contrast pairings.

Usage:
  python scripts/theme_audit.py path/to/theme.css

The script has no third-party dependencies. It is intentionally conservative:
it reads literal hex values assigned to CSS custom properties and reports missing
roles and contrast ratios for common foreground/background pairs.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROLE_PAIRS = [
    ("--md-sys-color-primary", "--md-sys-color-on-primary"),
    ("--md-sys-color-primary-container", "--md-sys-color-on-primary-container"),
    ("--md-sys-color-secondary", "--md-sys-color-on-secondary"),
    ("--md-sys-color-secondary-container", "--md-sys-color-on-secondary-container"),
    ("--md-sys-color-tertiary", "--md-sys-color-on-tertiary"),
    ("--md-sys-color-tertiary-container", "--md-sys-color-on-tertiary-container"),
    ("--md-sys-color-error", "--md-sys-color-on-error"),
    ("--md-sys-color-error-container", "--md-sys-color-on-error-container"),
    ("--md-sys-color-surface", "--md-sys-color-on-surface"),
    ("--md-sys-color-surface-container", "--md-sys-color-on-surface-variant"),
]

REQUIRED_ROLES = {
    item for pair in ROLE_PAIRS for item in pair
} | {
    "--md-sys-color-surface-container-low",
    "--md-sys-color-surface-container-high",
    "--md-sys-color-outline",
    "--md-sys-color-outline-variant",
}

VAR_RE = re.compile(r"(--[a-zA-Z0-9-]+)\s*:\s*(#[0-9a-fA-F]{6})\s*;")


def relative_luminance(hex_color: str) -> float:
    rgb = [int(hex_color[i : i + 2], 16) / 255 for i in (1, 3, 5)]

    def linearize(c: float) -> float:
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

    r, g, b = map(linearize, rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(a: str, b: str) -> float:
    l1, l2 = sorted((relative_luminance(a), relative_luminance(b)), reverse=True)
    return (l1 + 0.05) / (l2 + 0.05)


def parse_first_theme(text: str) -> dict[str, str]:
    # The first declaration of each variable is treated as the default theme.
    result: dict[str, str] = {}
    for name, value in VAR_RE.findall(text):
        result.setdefault(name, value.upper())
    return result


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: python theme_audit.py path/to/theme.css")
        return 2

    path = Path(sys.argv[1])
    if not path.exists():
        print(f"ERROR: file not found: {path}")
        return 2

    text = path.read_text(encoding="utf-8-sig")
    theme = parse_first_theme(text)

    missing = sorted(REQUIRED_ROLES - theme.keys())
    if missing:
        print("Missing recommended roles:")
        for role in missing:
            print(f"  - {role}")
        print()

    failed = False
    print("Contrast audit (default theme):")
    for bg_role, fg_role in ROLE_PAIRS:
        if bg_role not in theme or fg_role not in theme:
            continue
        ratio = contrast(theme[bg_role], theme[fg_role])
        status = "PASS" if ratio >= 4.5 else "CHECK"
        if ratio < 4.5:
            failed = True
        print(
            f"  {status:5} {bg_role} {theme[bg_role]} / "
            f"{fg_role} {theme[fg_role]} = {ratio:.2f}:1"
        )

    print("\nNote: 4.5:1 is used as a conservative text threshold. Large text and")
    print("non-text UI can have different WCAG requirements; verify the actual use.")

    if missing or failed:
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
