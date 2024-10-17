document.addEventListener('DOMContentLoaded', () => {
    const newPostForm = document.getElementById('newPostForm');
    const editForm = document.getElementById('editForm');
  
    if (newPostForm) {
      newPostForm.addEventListener('submit', (event) => {
        event.preventDefault();
  
        const formData = new FormData(newPostForm);
  
        fetch(newPostForm.action, {
          method: 'POST',
          body: formData,
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          window.location.href = '/';
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      });
    }
  
    if (editForm) {
      editForm.addEventListener('submit', (event) => {
        event.preventDefault();
  
        const formData = new FormData(editForm);
  
        fetch(editForm.action, {
          method: 'POST',
          body: formData,
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          window.location.href = '/';
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      });
    }
  });
  