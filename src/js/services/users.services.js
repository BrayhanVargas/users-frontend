const URL = "http://localhost:3000";

export const getUserService = (callback, userId) => {
  $.ajax({
    type: "GET",
    url: `${URL}/user?userId=${userId}`,
    contentType: "application/json",
    success: (result) => callback(result),
    dataType: "json",
  });
};

export const getUsersService = (callback) => {
  $.ajax({
    type: "GET",
    url: `${URL}/users`,
    contentType: "application/json",
    success: (result) => callback(result),
    dataType: "json",
  });
};

export const createUserService = (data) => {
  $.ajax({
    type: "POST",
    url: `${URL}/users`,
    contentType: "application/json",
    data: JSON.stringify(data),
    success: (datos) => {
      $("#success-alert")
        .fadeTo(2000, 500)
        .slideUp(500, function () {
          $("#success-alert").slideUp(500);
        });
    },
    dataType: "json",
  });
};

export const updateUserService = (data, userId) => {
  $.ajax({
    type: "PUT",
    url: `${URL}/users?userId=${userId}`,
    contentType: "application/json",
    data: JSON.stringify(data),
    success: (datos) => {
      $("#update-success-alert")
        .fadeTo(2000, 500)
        .slideUp(500, function () {
          $("#update-success-alert").slideUp(500);
        });
    },
    dataType: "json",
  });
};

export const deleteUserService = (userId) => {
  $.ajax({
    type: "DELETE",
    url: `${URL}/users?userId=${userId}`,
    contentType: "application/json",
    success: (datos) => {
      console.log("deleted");
      $("#delete-success-alert")
        .fadeTo(2000, 500)
        .slideUp(500, function () {
          $("#delete-success-alert").slideUp(500);
        });
    },
    dataType: "json",
  });
};
