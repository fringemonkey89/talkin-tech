async function commentForm (event) {
  event.preventDefault();

  const comment_text = document.querySelector('').value.trim();


  if(comment_text) {
    const response = await fetch('api/comments', {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        comment_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if(response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('').addEventListener('submit', commentForm);
























  
}
