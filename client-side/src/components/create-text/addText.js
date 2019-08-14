import { generatePageId } from '../generateId/index';

export const addText = async(information) => {

  const textId = generatePageId();

  const { user, textValue, pageId } = information;

  const textObj = {
                    username: user,
                    pageId: pageId,
                    component: {
                      text: {
                        value: textValue,
                        textId: textId,
                      },
                      position: {
                        x: 0,
                        y: 0,
                      },
                      size: {
                        width: 200,
                        height: 200,
                      }
                    }
                  };

  await fetch('/api/addText', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(textObj), // body data type must match "Content-Type" header
    })
    .then((res) => null)
    .catch((err)=> console.log(err));

  console.log(textObj);
};
