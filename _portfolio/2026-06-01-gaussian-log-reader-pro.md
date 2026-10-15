---
layout: single
title: "Gaussian LogReader Pro"
permalink: /portfolio/gaussian-log-reader-pro/
author_profile: true
collection: portfolio
type: portfolio
category: software
excerpt: "A tool I designed for Gaussian log-file extraction, relative-energy expressions and reaction-profile plotting; implementation by Tencent Hy4preview."
date: 2026-06-01
---

**A desktop tool for Gaussian output post-processing**

## Motivation

Comparing a set of Gaussian calculations requires extracting energies and thermal corrections from long output files. I designed this tool around the repetitive copying and expression-building steps in my own workflow.

## Workflow and Design

The application brings batch extraction, relative-energy expressions and reaction-profile plotting into a local Tkinter interface. I specified the feature set, data layout and interaction model.

## Features

- Extract SCF energies, thermal corrections to Gibbs free energy, and sums of electronic and thermal free energies from Gaussian log files.
- Choose a reference species and construct arithmetic expressions with stoichiometric coefficients.
- Convert energy units between Hartree and kcal/mol.
- Reorder species and plot reaction-energy profiles.
- Export tables as CSV and plots as PNG, PDF or SVG.

## Scientific Use and Validation

Extracted values and species assignments should be checked against the original Gaussian outputs. Comparisons require consistent calculation settings, thermal corrections and stoichiometry; extracting a number does not establish that the underlying calculation is suitable.

No quantified benchmark or extraction-accuracy claim is made here.

## Development Credit

**Yixuan Fan:** workflow problem identification, feature requirements, data layout and interface interaction design.

**Tencent Hy4preview:** code implementation.

This project demonstrates my workflow and tool-design contribution. My programming background is described separately in my [CV]({{ '/cv/' | relative_url }}).

## Source

[GitHub repository](https://github.com/Lightmessager/Gaussian09d-log-reader-Pro)
