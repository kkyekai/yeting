const chokidar = require('chokidar');
const { exec } = require('child_process');

// 监控的文件
const watcher = chokidar.watch([
    '*.html',
    'css/**/*.css',
    'js/**/*.js',
    '*.md'
], {
    ignored: /(^|[\/\\])\../, // 忽略隐藏文件
    persistent: true
});

// 执行 Git 命令的函数
function gitCommitAndPush() {
    const commands = [
        'git add .',
        'git commit -m "自动更新"',
        'git push origin main'
    ];

    exec(commands.join(' && '), (error, stdout, stderr) => {
        if (error) {
            console.error(`执行错误: ${error}`);
            return;
        }
        console.log(`更新成功:\n${stdout}`);
    });
}

// 防抖函数，避免频繁提交
let timeout;
function debounce(func, wait) {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
}

// 监听文件变化
console.log('开始监控文件变化...');
watcher
    .on('change', path => {
        console.log(`文件变化: ${path}`);
        debounce(gitCommitAndPush, 2000); // 2秒后执行提交
    }); 