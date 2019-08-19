import { getDate } from '../generateDate/index';

export const addPage = async(information, callback) => {

  const date = getDate();

  const { user, title, description } = information;
  const emptyObject = {};

  const pageObj = {
                    username: user,
                    page: {
                      title: title,
                      description: description,
                      date_created: date,
                      contents: emptyObject,
                    },
                  };

  await fetch('/api/addPage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pageObj),
    })
    .then((res) => null)
    .catch((err)=> console.log(err));

  callback();
};
