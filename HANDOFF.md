# 主页维护

- `index.html`、`style.css`、`app.js` 是页面源码。`content.json` 存放姓名、介绍、研究兴趣、签名和邮箱。未定稿的字段按用户要求留空。
- `assets/cottage.png` 是首页插画。`scripts/build.mjs` 将页面复制到 `dist/`。运行 `npm run build`，不需要安装依赖。
- GitHub 目标仓库为 `zhiheng-wu/knight.github.io`。保留原仓库的 `README.md`。Pages 使用 `.github/workflows/pages.yml`，需要在仓库设置中选择 GitHub Actions 作为来源。
- 当前账户名称为 `zhiheng-wu`。仓库名 `knight.github.io` 对应项目站点，默认路径为 `/knight.github.io/`。页面资源使用相对路径。
- 项目介绍依据各仓库 README。不要把 `CapchaSolver` 中原作者的 PhishDecloaker 论文归为本人的成果。学历、任职、论文作者身份尚未确认。
- `.openai/hosting.json` 是私有 Sites 预览配置，不同步到 GitHub。不要为发布修改仓库可见性，除非用户明确授权。
