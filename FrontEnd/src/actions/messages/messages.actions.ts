import { messagesTypes } from "./messages.types";
// import * as awsCognito from 'amazon-cognito-identity-js';

// const cognitoData = {
//   ClientId: '12345du353sm7khjj1q',
//   UserPoolId: 'us-east-1_Iqc12345'
// };
// // const userPool = new awsCognito.CognitoUserPool(cognitoData);
// // const cognitoUser = userPool.getCurrentUser();
// // // let username = '';
// // // if (cognitoUser !== null) {
// // //   username = cognitoUser.getUsername();
// // // }

export const submitNewPost = (location: string, tag: string, user:string, newPost: string) => (dispatch: any) => {
  console.log(newPost);
  console.log(user)

  const dt = new Date(new Date().toUTCString());
  const currentTime = dt.toString();

  fetch("https://dwbbn4f58g.execute-api.us-east-2.amazonaws.com/dev/messages", {
    body: JSON.stringify({
      "Location": location,
      "Tag": tag,
      "messages": {
        "box": newPost,
        "time": "Posted on: " + currentTime, 
        "user": "From: " + user
      }
    }),
    headers: {
      'content-type': 'application/json'
    },
    method: 'PUT'
  })
    .then(resp => {
      console.log(resp.status);
      if (resp.status === 401) {
        console.log('Nothing in your area.')
        return;
      }
      if (resp.status === 200) {
        return resp;
      }
      return;
    })
    .then(data => {
      dispatch({
        payload: {
          newPost: data
          // .Items.messages.values
        },
        type: messagesTypes.SUBMIT_NEW_POST
      });
  })
  .catch(err => {
    console.log('Unable to log in at this time, please try again later');
  })
}

export const updateMsgBoard = (msgBoard: object) => {
  // console.log(msgBoard)
  return {
    payload: {
      msgBoard
    },
    type: messagesTypes.UPDATE_MSG_BOARD
  }
}

export const updateGroupsDisplay = (displayGroups: object) => {
  return {
    payload: {
      displayGroups
    },
    type: messagesTypes.UPDATE_DISPLAY
  }
}

export const updateNewPost = (newPost: string) => {
  return {
    payload: {
      newPost
    },
    type: messagesTypes.UPDATE_DISPLAY
  }
}

// SEARCHES BY USER
export const  updateGroups = (user: string) => (dispatch: any) => {
  console.log("here in updateGroupsDisplay action");
  console.log(user);
  fetch(' https://dwbbn4f58g.execute-api.us-east-2.amazonaws.com/dev/groups/user/' + user, {
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(resp => {
      console.log(resp.status)
      if (resp.status === 401) {
        console.log('Nothing in your area.')
        return;
      }
      if (resp.status === 200) {
        return resp.json();
      }
      return;
    })
    .then(data => {
      console.log(data);
      console.log("searching: " + user);
      dispatch({
        payload: {
          displayGroups: data.Items
        },
        type: messagesTypes.UPDATE_DISPLAY
      })
    })
    .catch(err => {
      console.log('Unable to log in at this time, please try again later');
    })
}