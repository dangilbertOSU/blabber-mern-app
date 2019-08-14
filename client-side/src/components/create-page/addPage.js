import { generatePageId } from '../generateId/index';
import { getDate } from '../generateDate/index';

export const addPage = async(information) => {

  const pageId = generatePageId();
  const date = getDate();

  const { user, title, description } = information;

  const pageObj = {
                    username: user,
                    page: {
                      page: {
                        page_id: pageId,
                        title: title,
                        description: description,
                        date_created: date,
                        contents: {},
                      },
                    },
                  };

  await fetch('/api/addPage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pageObj),
    })
    .then((res) => null)
    .catch((err)=> console.log(err));
};
