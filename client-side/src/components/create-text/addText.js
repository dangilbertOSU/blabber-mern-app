import { generatePageId } from '../generateId/index';

export const addText = async(information, callback) => {

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
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(textObj),
    })
    .then((res) => window.location.reload())
    .catch((err)=> console.log(err));

  callback();
};
