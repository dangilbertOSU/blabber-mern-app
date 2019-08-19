export const addComment = async(information, callback) => {

  await fetch('/api/addComment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(information),
    })
    .then((res) => callback())
    .catch((err)=> console.log(err));

};
