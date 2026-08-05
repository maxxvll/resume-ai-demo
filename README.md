# 青语 GraduateChat 项目说明

[查看公开项目页](https://maxxvll.github.io/resume-ai-demo/)

这是 GraduateChat 的公开、脱敏项目说明仓库。它面向招聘方和技术面试官，用真实客户端截图、系统架构、关键工程链路、测试结果与安装包说明项目能力，同时不公开私有源代码、密钥、数据库数据或公司项目内容。

## 项目功能

GraduateChat 是一套跨平台即时通讯系统，覆盖：

- 好友申请与分组、单聊、群聊和群成员管理
- 文字、图片、文件、语音和视频消息
- 回复、转发、撤回、收藏、已读状态与消息搜索
- 云盘目录、上传、预览、下载、分享和聊天文件转存
- WebRTC 语音/视频通话与实时信令
- 会话内 AI、SSE 流式回复和多端消息同步
- Windows、macOS、Android 客户端构建

## 系统边界

```text
Vue 3 + Tauri 2 客户端
        |
REST / WebSocket / SSE
        |
Java 业务服务
        |
MySQL / Redis / Kafka / MinIO
```

- WebSocket 用于及时通知，断线恢复依赖持久事件、设备游标和幂等合并。
- MySQL 管理文件元数据、容量和引用关系，MinIO 保存对象内容，失败流程执行补偿清理。
- AI 上下文由客户端从本地消息、收藏和联系人中限量筛选，服务端校验会话并持久化最终回复。
- 音视频通话由服务端转发信令，媒体尽量由终端通过 WebRTC 直接传输。

## 公开内容

```text
.
├── index.html                    # GitHub Pages 单页项目说明
├── assets/
│   ├── app-logo.png
│   ├── desktop-chat.png
│   ├── desktop-cloud-drive.png
│   ├── desktop-video-call.png
│   ├── mobile-chat.png
│   └── mobile-cloud-drive.png
└── scripts/
    └── verify-page.mjs           # 静态结构、资源与安全边界检查
```

所有产品截图均来自真实客户端。公开页没有手工拼接的假界面，也没有虚构的并发量、准确率或性能提升。

## 验证记录

2026-08-05 使用当前私有工程执行：

- Vue / TypeScript 类型检查通过
- 82 个前端测试文件、349 项测试通过
- 156 个后端测试套件、677 项测试通过，0 失败、0 错误、1 项跳过
- Vite 生产构建通过，完成 1417 个模块转换
- Windows、macOS、Android 安装包 SHA-256 与私有 Release 元数据一致

公开页自身可使用捆绑 Node.js 或普通 Node.js 验证：

```bash
node scripts/verify-page.mjs
python3 -m http.server 4173
```

然后访问 `http://127.0.0.1:4173/`。

## 安装包说明

公开项目页链接到 `resume-ai-demo` 仓库的 GitHub Release：

- macOS: `Qingyu_0.1.0_macos.dmg`
- Windows: `Qingyu_0.1.0_windows_x64_setup.exe`
- Android: `Qingyu_0.1.0_android_arm64.apk`

安装包用于展示客户端构建成果。聊天、云盘、AI 和通话依赖配套 Java 后端、数据库、Redis、Kafka 与 MinIO，当前没有公共后端服务，因此不把安装包描述为可独立使用的在线 Demo。

## 隐私与脱敏

- 不公开 GraduateChat 当前私有源代码。
- 不公开公司项目源代码、内部接口或业务数据。
- 不提交密钥、Token、生产服务器地址和个人数据库内容。
- 示例联系人、消息和文件名称只用于界面展示。

## 部署

仓库使用 GitHub Pages，来源为 `main` 分支根目录。页面没有构建依赖，更新 `index.html` 和 `assets/` 后即可部署。
