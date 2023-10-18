async function editForm (event) {

  event.preventDefault();

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length -1];

  const title = document.querySelector('').value;
  const content = document.querySelector('').value;
  
  const repsonse = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      content
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
    if(repsonse.ok) {
      document.location.replace('/profile')
    } else {
      alert(response.statusText);
    }
}

document.querySelector('').addEventListener('click', editForm);
