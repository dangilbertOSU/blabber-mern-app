import Container from '../container/index';
import Header from '../header/index';
import React from 'react';
import Sidebar from '../side-bar/index';
import Button from '../button/index';

const Main = (props) => {

  const generatePageId = () => {
    return Math.random()
               .toString(36)
               .substring(2, 15) + Math.random()
               .toString(36)
               .substring(2, 15);
  };

  const getDate = () => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    return today;
  };

  const addPage = async(event) => {
    event.preventDefault();
    console.log('clicked');

    const pageId = generatePageId();
    const date = getDate();

    const pageObj = {
                      username: props.user,
                      page: {
                        page: {
                          id: pageId,
                          date_created: date,
                          contents: {},
                        },
                      },
                    };

    await fetch('/api/addPage', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageObj), // body data type must match "Content-Type" header
      })
      .then((res) => console.log(res))
      .then((data) =>  console.log(data))
      .catch((err)=> console.log(err));

    console.log(pageObj);
  };

  return (
      <React.Fragment>
        <Header/>
        <div>
          <Sidebar>
            <Button
              variant="transparent"
              onClick={(event) => addPage(event)}
            >
              add page
            </Button>
          </Sidebar>
          <Container>
            <p>{props.user}</p>
          </Container>
        </div>
      </React.Fragment>
  );
};

export default Main;
