document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
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
            window.location.href = '/dashboard'; // 登录成功后跳转
        } else {
            // 登录失败
            alert(data.message || '登录失败，请检查邮箱和密码');
        }
    } catch (error) {
        console.error('登录错误:', error);
        alert('登录过程中发生错误，请稍后重试');
    }
}); 