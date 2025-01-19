document.addEventListener('DOMContentLoaded', function() {
    // 密码显示切换
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('#password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }
    
    // 表单提交处理
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.querySelector('.login-button');
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // 添加加载状态
        loginButton.disabled = true;
        loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 登录中...';
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // 登录成功
                localStorage.setItem('token', data.token);
                
                // 显示成功动画
                loginButton.innerHTML = '<i class="fas fa-check"></i> 登录成功';
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 1000);
            } else {
                throw new Error(data.message || '登录失败');
            }
        } catch (error) {
            console.error('登录错误:', error);
            
            // 显示错误信息
            loginButton.innerHTML = '<i class="fas fa-exclamation-circle"></i> 登录失败';
            setTimeout(() => {
                loginButton.disabled = false;
                loginButton.innerHTML = '<span>登录</span><i class="fas fa-arrow-right"></i>';
            }, 2000);
            
            alert(error.message || '登录失败，请检查邮箱和密码');
        }
    });
}); 