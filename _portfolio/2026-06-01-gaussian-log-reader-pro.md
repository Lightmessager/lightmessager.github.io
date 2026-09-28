---
title: "Gaussian LogReader Pro"
collection: portfolio
type: "portfolio"
permalink: /portfolio/gaussian-log-reader-pro/
excerpt: "A desktop tool for batch-extracting thermodynamic data from Gaussian .log files, with relative-energy calculation, an expression builder and reaction-profile plotting."
date: 2026-06-01
venue: "Self-initiated · available on GitHub"
location: "Suzhou, China"
---

**Gaussian LogReader Pro** is a desktop application I designed for
batch-extracting thermodynamic data from Gaussian `.log` files. The code
was written by Tencent Hy4preview.

Gaussian output files contain far more text than a user typically needs.
The three values that matter for most post-processing — the SCF energy,
the thermal correction to Gibbs free energy, and the sum of electronic
and thermal free energies — sit at different positions in the file and
have to be copied by hand. This tool scans a batch of `.log` files in
one pass, pulls out those three values for every file, and then lets the
user compute relative energies, build arithmetic expressions between
species, plot a reaction-coordinate energy profile and export the
results. Everything runs locally in a Tkinter window: no server, no
account, no network.

## Features

**Extraction**

- Add individual files or an entire folder (recursive, picks up every
  `.log` file beneath it).
- Batch extraction with a progress bar and per-file status reporting.
- Three values per file:
  - SCF energy (`SCF Done: E(...) = ...`)
  - Thermal correction to Gibbs free energy
  - Sum of electronic and thermal free energies (total free energy)
- Unit conversion between Hartree and kcal/mol using the factor
  `627.509474063`.
- A progress log showing exactly which files were processed and which
  were skipped, with the reason for any skip.

**Relative energy**

- Any species can be chosen as the zero point; all others are displayed
  relative to it.
- Expressions can be typed directly, for example
  `TS1 - R`, `A - 0.5*B + 2*C`.
- A drag-and-drop expression builder provides a separate window with a
  species palette on the left and a build area on the right. Species
  blocks behave like building bricks: each has a `+` / `−` toggle, a
  coefficient control (1, 0.5, 2, 3 or 0.25) and a delete button. Drag
  an existing block back to the left panel to remove it; drag blocks
  among themselves to reorder.
- The generated expression and its live result are shown at the bottom
  of the builder window.
- Every file can store its own expression, so each `.log` file ends up
  with its own final relative energy. Files without a custom expression
  fall back to the standard "energy minus zero point" behaviour. Saved
  expressions are restored back into blocks when the builder is reopened,
  so editing can continue where it left off.

**Reaction profile**

- Rendered in the main window, or opened in a larger standalone window.
- The x-axis label density is thinned automatically: long species names
  are truncated and excess tick marks are reduced to numbers, so a
  40-species profile remains readable.
- Species order can be set by dragging table rows, and that order also
  determines the reaction-coordinate sequence used by the plot.

**Export**

- The raw extraction table to CSV.
- Relative-energy results to CSV, including a custom-expression column.
- The profile chart as PNG, PDF or SVG.

## Why I built it

I needed to compare free energies across roughly thirty Gaussian jobs and
found myself copying numbers by hand, then re-copying them when I
realised I had misread a column. Every feature in the tool corresponds
to a specific point where that workflow went wrong: the drag-and-drop
builder exists because typing `A - 0.5*B + 2*C` repeatedly is where
sign errors enter, and the per-file expressions exist because different
reactant complexes need different stoichiometry. The interface is
plain on purpose — Tkinter rather than a web framework — because the
target user is a single person running calculations on a local machine.

## Technical details

- Python 3.9–3.13 recommended; Tkinter is normally bundled with the
  standard Windows installer.
- A separate `launcher.py` scans every Python interpreter on the machine,
  reports the dependency status of each one, and can install missing
  packages with one click. Numpy and matplotlib are handled
  automatically.
- The program is robust against an incomplete Python installation. An
  older fallback path using `winfo_children()` was retained so the
  interface still builds on Tcl/Tk 8.5, and font selection probes real
  fonts through `actual("family")` rather than guessing from a list of
  names.
- Chinese species names are handled correctly in plots: the CJK font list
  is queried at runtime and YaHei or SimHei is placed first, so axis
  labels do not render as boxes.

## Development credit

This program was designed by me, and the code was written by Tencent
Hy4preview. I specified the feature set, the data layout and the
interaction model from my own post-processing workflow; the
implementation was carried out by Hy4preview. An English-language
standalone `.exe` release is planned, together with additional features.

## Links

- [GitHub repository](https://github.com/Lightmessager/Gaussian09d-log-reader-Pro)
