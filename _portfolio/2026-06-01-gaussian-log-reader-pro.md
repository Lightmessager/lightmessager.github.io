---
title: "Gaussian LogReader Pro"
collection: portfolio
type: "portfolio"
permalink: /portfolio/gaussian-log-reader-pro/
excerpt: "批量从 Gaussian .log 文件中提取热力学数据、计算相对能量并绘制反应坐标能量剖面的桌面工具，支持表达式构建与 CSV 导出。"
date: 2026-06-01
venue: "个人项目 · 开源"
location: "Suzhou, China"
author_profile: false
---

## 为什么做这个

Gaussian 的 `.log` 文件里塞满了文本，但你真正需要的往往只有三个数：**SCF 能量**（SCF Done）、**Gibbs 自由能的热校正项**，以及**电子与热自由能之和**。一次 SURF 项目会产出几十上百个 log 文件，逐个手工抄录既慢又容易出错。于是我把这套提取流程做成了一个带界面的桌面工具。

## 功能

- **批量提取**：支持添加单个文件或整个文件夹，递归收集 `.log` 文件，带进度条和逐文件状态
- **三类数据**：SCF 能量、热校正 Gibbs 自由能、总自由能
- **单位换算**：Hartree ⇄ kcal/mol，换算因子 627.509474063
- **相对能量**：任意指定参考物种作为零点，其余结果相对它给出
- **表达式计算**：支持手写表达式（如 `TS1 - R`、`A - 0.5*B + 2*C`），也提供拖拽式积木构建器，每个积木带正负号切换、系数控制（1 / 0.5 / 2 / 3 / 0.25）和删除按钮
- **逐文件表达式**：每个文件可以存一份独立表达式，重开构建器时表达式会还原成积木继续编辑；未自定义的文件回退到"能量 − 零点"的默认行为
- **反应坐标能量剖面图**：主窗口内渲染，也可在独立大窗口打开；x 轴标签密集时自动疏化（长名称截断、多余刻度简化为数字），40 个物种的剖面依然可读
- **自定义顺序**：拖动行调整物种顺序，该顺序同时决定剖面图的 x 轴
- **导出**：提取表导出 CSV、相对能量结果导出 CSV（含自定义表达式列）、剖面图存为 PNG / PDF / SVG

## 技术要点

- 纯本地运行，Tkinter 界面，无服务器、无账号、无网络请求
- 物种名取自文件名，含空格或连字符的名称（如 `TS 1`、`int-2`）自动转成合法标识符（`TS_1`、`int_2`），映射与表达式一同保存，不需要手动改名
- 表达式支持 `+ - * /`、括号与系数；只有扁平的 `A ± coef*B ± ...` 形式能还原成积木，更复杂的（除法、嵌套括号）保留为手工编辑
- 已处理 Tcl/Tk 8.5 的兼容性问题，用 `winfo_children()` 遍历控件；中文字体通过 `actual("family")` 探测后自动回退
- Python 3.9 – 3.13 推荐，launcher 自动扫描本机所有 Python 解释器并报告依赖状态，缺失的 numpy / matplotlib 一键安装

## 使用方式

下载 `app.py` 与 `launcher.py` 放在同一目录，运行：

```bash
python launcher.py
```

依赖已就绪时也可以直接 `python app.py`。

## 开发分工说明

这个工具的**方案与功能设计由我完成，代码由腾讯 Hy4preview 编写**。整个项目是我的计算化学工作中真实跑出来的需求，每一个功能点都对应一个实际遇到的痛点——批量提取、相对能量、表达式构建、能量剖面。英文独立 `.exe` 版本在计划中，项目仍在持续改进。

## 仓库

[GitHub · Lightmessager/Gaussian09d-log-reader-Pro](https://github.com/Lightmessager/Gaussian09d-log-reader-Pro){:target="_blank"}
