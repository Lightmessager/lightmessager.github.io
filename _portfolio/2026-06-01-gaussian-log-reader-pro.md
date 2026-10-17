---
layout: single
title: "GaussianReadPro"
permalink: /portfolio/gaussian-log-reader-pro/
author_profile: true
collection: portfolio
type: portfolio
category: software
excerpt: "A local desktop workbench for Gaussian output analysis, explicit energy references and interactive reaction profiles."
date: 2026-06-01
---

**Gaussian output analysis and reaction energy profiles**

[Download Windows preview](https://github.com/Lightmessager/Gaussian09d-log-reader-Pro/releases/latest) · [Source code and documentation](https://github.com/Lightmessager/Gaussian09d-log-reader-Pro)

## Motivation

Comparing Gaussian calculations involves extracting energies and thermal corrections, choosing consistent references and keeping track of the original outputs. I designed the original tool around the repetitive copying and expression-building steps in my own workflow.

## Current Workbench

GaussianReadPro uses a Python and Qt interface to organise calculations by source file and job. It supports Chinese and English, with chart resources bundled for offline operation.

- Batch-import Gaussian log files and inspect parsed energies alongside their source evidence.
- Build relative-energy expressions for individual structures and define explicit reference systems.
- Explore interactive 2D and 3D reaction energy profiles, compare paths and inspect selected structures.
- Save and restore projects, workspaces and chart view state.
- Export chart images, standalone HTML, data tables and source-audit information.

## Download and Run

The current portable preview targets **Windows 11 x64**. Open the [latest release](https://github.com/Lightmessager/Gaussian09d-log-reader-Pro/releases/latest), download the Windows ZIP, and extract the complete package. Run `GaussianReadPro/GaussianReadPro.exe` while keeping the bundled `_internal` directory in place.

Source development currently targets **Python 3.12** and **PySide6**. Setup and build instructions are in the [repository README](https://github.com/Lightmessager/Gaussian09d-log-reader-Pro#readme).

## Scientific Use

Check extracted values and species assignments against the original Gaussian outputs. Energy comparisons require consistent calculation settings, thermal corrections and stoichiometry. Source-audit exports help retain the evidence behind a reaction profile.

## Project Origins

My contribution to the original tool included workflow problem identification, feature requirements, data layout and interface interaction design. The earlier Tkinter implementation was credited to **Tencent Hy4preview**. The linked repository now contains the Qt-based GaussianReadPro workbench.

An [earlier Gaussian09 extraction script](https://github.com/Lightmessager/Gaussian09D-Energy-Analysis-From-Log-Files-) is also available. My programming background is described in my [CV]({{ '/cv/' | relative_url }}).
