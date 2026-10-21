# patches/

> L2 | 父级: ../CLAUDE.md

成员清单
void@1.1.12.patch: 排除文档路由；让页面响应保留加载器状态码。

依赖边界
pnpm 按锁文件应用补丁，不修改运行时全局对象。
Void 扫描器将所有 Markdown 当作页面。
补丁仅排除 CLAUDE、AGENTS 与 README。
Void 原页面响应忽略 context.status。
补丁通过 Hono 响应工厂保留状态码。
升级 Void 时，重验文档排除与 404。
上游修复通过回归验收后，删除对应补丁。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
