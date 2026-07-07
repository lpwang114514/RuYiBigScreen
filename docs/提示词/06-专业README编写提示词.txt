你是一个资深开源项目维护者、技术文档工程师、前端工程师和教学型项目 README 写作专家。

你现在在一个 Vue 3 + TypeScript + ECharts 数据大屏项目中工作。

项目英文名：RuyiBigScreen
项目中文名：如意数据大屏

项目定位：
这是一个公开开源的教学型数据大屏项目，主要用于帮助学生和初学者从 0 到 1 学习如何自己动手制作一个完整的数据可视化大屏。

本次任务目标：
请为当前项目编写一份专业、清晰、适合开源展示和教学传播的 README.md。

请直接执行，不要只给我方案。

重要背景：

1. 当前项目是纯前端数据大屏教学项目。
2. 技术栈包括 Vue 3、Vite、TypeScript、ECharts、Pinia、Axios、MSW、Vitest、Playwright、ESLint、Prettier、Stylelint。
3. 当前项目已经支持 mock 数据。
4. 当前项目正在升级或已经升级为模拟实时数据变化效果。
5. 当前项目开发服务端口统一使用 10001。
6. 当前项目有或将有自动化截图能力，主图路径约定为：

```text
docs/screenshots/dashboard-1920x1080.png
```

7. README 应该面向学生、初学者、开源访问者和课程使用者。
8. README 要专业，但不要写成企业官网广告稿。
9. README 要有教学项目的亲和力，让初学者知道这个项目适合学习什么。

修改前请先阅读以下文件：

- README.md
- package.json
- src/views/DashboardView.vue
- src/types/dashboard.ts
- src/mocks/dashboardMock.ts
- src/mocks/realtimeDashboardSimulator.ts（如果存在）
- src/services/dashboardService.ts
- src/stores/dashboardStore.ts
- src/tests/e2e/dashboard.spec.ts
- playwright.config.ts
- scripts/capture-dashboard.mjs（如果存在）
- docs/提示词/01-纯前端数据大屏自动开发提示词.txt
- docs/提示词/03-如意国风科技蓝中心中枢改造提示词.txt
- docs/提示词/04-模拟实时数据变化效果提示词.txt
- docs/提示词/05-自动化截图到指定目录提示词.txt

核心要求：

1. 重写或完善根目录 README.md。
2. README 必须使用中文为主，可以保留必要英文技术名词。
3. README 风格要专业、清晰、面向开源项目。
4. 不要写空泛口号。
5. 不要夸大项目能力。
6. 不要说已经接入真实后端，除非代码确实已经接入。
7. 不要说已经部署上线，除非项目确实有部署地址。
8. 不要虚构功能、截图、徽章或链接。
9. 如果截图文件还不存在，不要强行引用不存在的图片；可以写“生成截图后可在此处展示”，或者在确认文件存在后再引用。
10. 如果截图文件存在，优先在 README 顶部或项目预览章节引用：

```md
![如意数据大屏](docs/screenshots/dashboard-1920x1080.png)
```

11. 不要破坏现有代码。
12. 不要使用 git reset --hard、git checkout -- . 等破坏性命令。
13. 如果发现已有未提交改动，请先阅读并理解，不要随意回滚用户已有改动。

README 推荐结构：

请按以下结构编写 README，可以根据实际项目情况微调。

```md
# RuyiBigScreen｜如意数据大屏

项目一句话介绍。

## 项目预览

截图或截图说明。

## 项目简介

说明这是一个什么项目，适合谁学习，用来解决什么教学问题。

## 核心特性

列出 6 到 10 个核心特性。

## 技术栈

用清晰列表说明前端框架、图表、状态管理、mock、测试、代码质量工具。

## 页面内容

说明页面包含哪些模块：
- 顶部标题与时间
- 核心指标卡片
- 访问趋势
- 分类占比
- 如意数据中枢
- 城市访问排名
- 能力雷达模型
- 实时动态与告警

## 实时数据模拟

如果项目已经实现实时模拟，请说明：
- 顶部指标会变化
- 趋势图会刷新
- 实时动态会滚动
- 如意数据中枢节点会变化
- 仍然是前端 mock，不是真实后端

如果还未实现，请写成规划或可扩展方向，不要假装已经完成。

## 项目结构

展示核心目录树，不要列出 node_modules、dist 或过多细节。

## 快速开始

包括：
- 环境要求
- 安装依赖
- 启动开发服务
- 浏览器访问地址

端口必须使用 10001：

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 10001
```

访问：

```text
http://127.0.0.1:10001/
```

## 常用命令

说明：
- npm run dev
- npm run build
- npm run preview
- npm run lint
- npm run format
- npm run test
- npm run test:e2e
- npm run screenshot（如果 package.json 中已经存在）

不要写不存在的命令。

## 数据源说明

说明当前默认 mock 模式，以及未来可以切换到 API 模式。

如果代码支持 `VITE_DATA_SOURCE=api`，请写清楚。

如果当前 mock 模式直接走 service 或 MSW，请按代码实际情况说明。

## 自动化截图

如果项目已经有截图脚本，请说明：

```bash
npm run screenshot
```

并说明输出路径：

```text
docs/screenshots/dashboard-1920x1080.png
```

如果脚本还不存在，请不要写成已完成命令；可以写到“后续计划”。

## 测试与质量保障

说明项目包含：
- TypeScript 类型检查
- ESLint
- Stylelint
- Vitest 单元测试
- Playwright E2E 测试
- 构建验证

## 适合学习什么

面向学生和初学者说明可以学习：
- Vue 3 项目结构
- 数据大屏布局
- ECharts 图表封装
- mock 数据和 service 分层
- Pinia 状态管理
- 自动化测试
- 自动化截图
- 工程化规范

## 后续计划

可以列出合理规划：
- 接入真实 API
- 增加更多图表组件
- 增加主题切换
- 增加视觉回归测试
- 增加部署示例

不要写已经完成的内容。

## License

如果项目中有 LICENSE 文件，请按实际 license 写。
```

内容风格要求：

1. 标题清晰，层级合理。
2. 每节内容不要太长。
3. 重要命令必须使用代码块。
4. 说明要准确，不要混淆 mock 和真实 API。
5. README 要像一个可以公开给学生看的项目说明。
6. 语言要自然，不要 AI 味太重。
7. 不要使用过多 emoji；可以完全不用 emoji。
8. 不要写“世界领先”“革命性”“企业级生产系统”等夸张表达。
9. 不要把提示词内容原样塞进 README。
10. 不要写“本项目由 AI 自动生成”作为卖点，除非用户明确要求。

品牌与表述要求：

1. 项目名称使用：

```text
RuyiBigScreen｜如意数据大屏
```

2. 项目可以描述为：

```text
教学型数据可视化大屏项目
```

3. 可以说明它适合：

- 前端初学者
- 数据可视化学习者
- 想了解数据大屏工程结构的学生
- AI 辅助编程课堂案例

4. 不要写成商业产品官网。
5. 不要写“10年 AI 应用开发经验”等不严谨内容。

截图引用规则：

1. 请先检查文件是否存在：

```text
docs/screenshots/dashboard-1920x1080.png
```

2. 如果存在，请在 README 的“项目预览”章节引用。
3. 如果不存在，请在“项目预览”章节写：

```md
项目截图可通过自动化截图命令生成，默认输出到 `docs/screenshots/dashboard-1920x1080.png`。
```

4. 不要引用不存在的图片，避免 GitHub README 显示破图。

命令准确性要求：

请读取 package.json 后再写命令。

1. 只写 package.json 中真实存在的 scripts。
2. 如果你新增了 README 中提到的命令，必须同时更新 package.json 并验证。
3. 如果没有新增命令，不要在 README 中写不存在的命令。
4. 端口统一写 10001。

验证要求：

完成 README 修改后，请运行：

```bash
npm run lint
npm run test
npm run build
```

如果 README 中涉及截图命令，且 package.json 已经有截图命令，也请运行：

```bash
npm run screenshot
```

如果 E2E 环境可用，也运行：

```bash
npm run test:e2e
```

如果验证失败：

1. 先阅读错误原因。
2. 只做必要修复。
3. 修复后重新运行失败的验证命令。
4. 不要绕过验证。

最终交付说明：
完成后请告诉我：

- README 修改了哪些主要内容。
- 是否引用了项目截图。
- 如果没有引用截图，原因是什么。
- README 中写了哪些可用命令。
- 是否确认端口为 10001。
- 已运行的验证命令和结果。
- 是否存在未完成事项。

请直接执行完整 README 编写、必要检查和验证，不要只给我建议。
