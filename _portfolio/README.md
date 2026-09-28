# Portfolio 文件说明

## 目录结构

```
_portfolio/                      # 4 个条目文件
├── 2024-09-01-chem-society-outreach.md   # 化学社科普与桌游
├── 2025-08-01-surf-2024-25.md            # SURF 2024–25
├── 2026-06-01-gaussian-log-parser.md     # Gaussian 日志批量处理工具
└── 2026-08-01-surf-2025-26.md            # SURF 2025–26（含海报占位）

_pages/
└── portfolio.html               # portfolio 汇总页（含样式）

files/                           # 你需要自己创建这个目录
├── poster_SURF2025.png          # ← 放你的海报原图（建议 ≤2MB）
└── poster_SURF2025_thumb.png    # ← 放缩略图（宽 600–800px 即可）
```

## 部署步骤

1. 把 `_portfolio/` 里的 4 个 `.md` 文件放进你仓库的 `_portfolio/` 目录。
   如果没有这个目录就新建一个。
2. 把 `_pages/portfolio.html` 放进 `_pages/` 目录，覆盖原有文件（建议先备份原文件）。
3. 确认 `_config.yml` 里有如下声明，没有就加上：
   ```yaml
   collections:
     portfolio:
       output: true
       permalink: /:collection/:path/
   ```
4. 创建 `files/` 目录，放入你的海报图片，命名为 `poster_SURF2025.png`。
   如果文件名不同，需要同步修改 `2026-08-01-surf-2025-26.md` 里的两处路径。

## 顺序说明

排序由文件名里的日期决定（YYYY-MM-DD 前缀）：

| 日期 | 条目 |
|---|---|
| 2024-09-01 | 化学社科普与桌游 |
| 2025-08-01 | SURF 2024–25 |
| 2026-06-01 | Gaussian 日志批量处理工具 |
| 2026-08-01 | SURF 2025–26 |

汇总页里通过 `sort: 'date' | reverse` 做了倒序，所以实际展示是新的在前。

## 需要你补充的内容

- `files/poster_SURF2025.png`：SURF 2025–26 的海报原图
- `files/poster_SURF2025_thumb.png`：海报缩略图
- Gaussian 日志工具的 GitHub 仓库链接（目前写的是"待补充"）
- 化学社活动的照片与活动记录（目前写的是"待补充"）
- 各条目的 GitHub/代码链接，有就加上，没有留空即可

## 注意

- 所有条目都用了 `author_profile: false`，这样条目详情页不会在右侧显示作者信息卡片。
- 如果改了 `_config.yml` 或 `_pages/portfolio.html`，需要重启 jekyll 才能看到效果；
  只改 `_portfolio/` 下的 `.md` 文件支持热重载。
- 建议本地跑一遍再推到 GitHub：
  ```bash
  bundle exec jekyll serve -l -H localhost
  ```
  访问 http://localhost:4000/portfolio/ 检查效果。
