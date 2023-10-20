async function signupForm (event) {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if(username && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
      if(response.ok) {
        console.log('success');
        alert('welcome!')
        document.location.replace('/login');
      } else {
        alert(response.statusText);
      }
    }
};

document.queryElector('.login-form').addEventListener('submit', signupForm );
