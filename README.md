# 青语 | 跨平台即时通讯系统

[查看项目页](https://maxxvll.github.io/resume-ai-demo/)

青语是一套跨平台即时通讯系统，项目页集中呈现客户端界面、核心功能、系统架构、关键工程设计、测试结果与多平台构建产物。

## 项目功能

核心功能包括：

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

## 仓库结构

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

## 验证记录

2026-08-05 执行项目测试与构建：

- Vue / TypeScript 类型检查通过
- 82 个前端测试文件、349 项测试通过
- 156 个后端测试套件、677 项测试通过，0 失败、0 错误、1 项跳过
- Vite 生产构建通过，完成 1417 个模块转换
- Windows、macOS、Android 安装包 SHA-256 与发布元数据一致

项目页可使用 Node.js 验证：

```bash
node scripts/verify-page.mjs
python3 -m http.server 4173
```

然后访问 `http://127.0.0.1:4173/`。

## 安装包说明

项目页链接到 `resume-ai-demo` 仓库的 GitHub Release：

- macOS: `Qingyu_0.1.0_macos.dmg`
- Windows: `Qingyu_0.1.0_windows_x64_setup.exe`
- Android: `Qingyu_0.1.0_android_arm64.apk`

客户端与 Java 服务、MySQL、Redis、Kafka 和 MinIO 配套运行；安装包不包含服务端环境。

## 部署

仓库使用 GitHub Pages，来源为 `main` 分支根目录。页面没有构建依赖，更新 `index.html` 和 `assets/` 后即可部署。
