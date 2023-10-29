async function deleteForm (event) {

  event.preventDefault();

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length -1];
  
  const repsonse = await fetch(`/api/posts/${id}`, {
    method: 'DELETE'
  });
    if(repsonse.ok) {
      document.location.replace('/profile')
    } else {
      alert(response.statusText);
    }
}

document.querySelector('.delete-post-btn').addEventListener('click', deleteForm);
