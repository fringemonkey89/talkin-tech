async function newForm (event) {
  const title = document.querySelector('').value;
  const content = document.querySelector('').value;

if (title && content){
  const response = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({
      title,
      content
    }), 
    headers: {
      'Content-Type': 'application'
    }
  });
   if(response.ok) {
     document.location.replace('/profile')
   } else {
     alert(response.statusText);
   }
}else {
  alert('please fill out the form')
}
}

document.querySelector('.new-post-form').addEventListener('submit', newForm);
