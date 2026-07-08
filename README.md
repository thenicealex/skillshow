# SkillShow - Codex Skills 浏览器

一个美观的本地 Skill 浏览器，用于扫描和预览 Codex / Agent / Claude 的 SKILL.md 文件。

![Platform Support](https://img.shields.io/badge/platform-Windows%2011%20%7C%20macOS%20%7C%20Linux-lightgrey) ![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ 功能特性

- **📂 多种扫描方式**: 文件夹选择、拖拽上传、默认目录快速扫描
- **🎨 精美UI设计**: 现代化卡片布局、流畅动画、暗色/亮色主题
- **🔍 智能搜索**: 实时搜索 skill 名称、描述和关键词
- **📱 响应式设计**: 完美适配桌面、平板和手机
- **💾 一键复制**: 快速复制 SKILL.md 内容到剪贴板
- **🌍 跨平台支持**: Windows 11、macOS、Linux 路径自动适配
- **⚡ 高性能**: 并行文件读取、骨架屏加载、文件数量限制

## 🚀 快速开始

### 方法 1: 直接打开（推荐）

1. 下载 `skills-shower.html`
2. 用浏览器打开（Chrome/Edge/Firefox）
3. 点击"选择文件夹"按钮
4. 选择包含 SKILL.md 的目录

### 方法 2: 本地服务器

```bash
# 使用 Python
python3 -m http.server 8000

# 或使用 Node.js
npx serve
```

然后访问 `http://localhost:8000/skills-shower.html`

## 📖 使用指南

### 基本操作

1. **扫描 Skills**
   - 点击"选择文件夹"选择目录
   - 或拖拽文件夹到页面
   - 或使用默认目录按钮（Unix/Windows）

2. **浏览 Skills**
   - 卡片视图显示所有 skills
   - 点击卡片查看详细信息
   - 使用搜索框过滤结果
   - 按大小或修改日期排序

3. **查看详情**
   - 点击卡片打开模态框
   - 查看完整 Markdown 内容
   - 一键复制到剪贴板

### 平台支持

| 平台 | 状态 | 默认路径 |
|------|------|----------|
| Windows 11 | ✅ 完全支持 | `%USERPROFILE%\.codex\skills\` 等 |
| macOS | ✅ 完全支持 | `~/.codex/skills/` 等 |
| Linux | ✅ 完全支持 | `~/.codex/skills/` 等 |

## 🎨 界面预览

TODO: 添加截图

- **卡片视图**: 简洁的网格布局
- **模态框**: 完整 Markdown 渲染
- **暗色主题**: 默认深色模式
- **亮色主题**: 点击右上角按钮切换

## 🛠️ 技术栈

- **纯前端**: HTML + CSS + JavaScript（无依赖）
- **单文件**: 所有代码在一个 HTML 文件中
- **现代 API**: File System Access API、Drag & Drop API
- **响应式**: CSS Grid + Flexbox + Media Queries

## 📁 项目结构

```
skillshow/
├── skills-shower.html    # 主应用（核心文件）
├── scan-skills.mjs      # 扫描脚本（可选）
├── README.md            # 项目文档
└── .gitignore          # Git 忽略规则
```

## ⚙️ 配置说明

### 默认扫描目录

应用会检测你的平台并建议相应的默认目录：

**Unix/macOS:**
- `~/.codex/skills/`
- `~/.agent/skills/`
- `~/.claude/skills/`

**Windows:**
- `%USERPROFILE%\.codex\skills\`
- `%USERPROFILE%\.agent\skills\`
- `%USERPROFILE%\.claude\skills\`

### 主题设置

主题偏好会自动保存到 `localStorage`，下次打开时自动应用。

## 🤝 贡献指南

欢迎贡献！请遵循以下步骤：

1. Fork 这个仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📝 开发计划

- [ ] 添加 GitHub Pages 部署
- [ ] 支持更多文件格式（.md、.txt）
- [ ] 导出功能（JSON、PDF）
- [ ] 收藏/星标功能
- [ ] 更多主题选项
- [ ] 国际化支持（i18n）

## ❓ 常见问题

**Q: 为什么选择单文件设计？**
A: 便于分发和使用，用户只需下载一个文件即可运行。

**Q: 支持哪些浏览器？**
A: Chrome 86+、Edge 86+、Firefox 90+（推荐使用 Chrome/Edge 以获得最佳体验）。

**Q: 我的数据会上传吗？**
A: 不会。所有处理都在本地进行，不会发送任何数据到服务器。

**Q: 如何报告问题？**
A: 请在 [Issues](https://github.com/thenicealex/skillshow/issues) 页面提交问题报告。

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- 灵感来自 [Codex](https://github.com/anthropics/codex) 和 [Claude](https://claude.ai)
- 图标使用 Unicode 字符
- 配色方案参考 GitHub Dark/Light 主题

## 📧 联系方式

- 作者: thenicealex
- GitHub: [@thenicealex](https://github.com/thenicealex)
- 项目地址: https://github.com/thenicealex/skillshow

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
