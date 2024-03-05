import {
  createUserService,
  deleteUserService,
  getUserService,
  getUsersService,
  updateUserService,
} from "../services/users.services.js";

export const addNewUserBtn = () => {
  const form = document.getElementById("userForm");
  addNewInputField("phone");
  addNewInputField("email");

  document.getElementById("new-user-btn").addEventListener("click", (event) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      createUserService(getDataForm("create"));
      reloadPage();
    });
    $("#success-alert").hide();
  });
};

export const addUsersTable = () => getUsers();

//------------------------------------------------------------------------//
//                               Helpers                                  //
//------------------------------------------------------------------------//

const reloadPage = () => {
  setTimeout(() => {
    window.location.reload();
  }, 2000);
};

const addNewInputField = (inputType) => {
  let dataValues = {};
  if (inputType === "phone") {
    dataValues = {
      idElement: "addPhoneBtn",
      inputs: ".inputs-phone-new",
      input: ".input-phone-new",
    };
  } else {
    dataValues = {
      idElement: "addEmailBtn",
      inputs: ".inputs-email-new",
      input: ".input-email-new",
    };
  }

  document
    .getElementById(dataValues.idElement)
    .addEventListener("click", () => {
      const inputs = document.querySelector(dataValues.inputs);
      const inputForm = document.querySelectorAll(dataValues.input);
      const clonedInput = inputForm[0].cloneNode(true);
      inputs.querySelector(".form-label").textContent = `${inputType} 1`;

      const input = clonedInput.querySelector(".form-control");
      const label = clonedInput.querySelector(".form-label");
      input.value = "";
      label.textContent = `${inputType} ${inputForm.length + 1}`;

      console.log("holas click", clonedInput);
      console.log("holas click2", inputs);
      inputs.appendChild(clonedInput);
    });
};

const getDataForm = (modal) => {
  const inputs = document.querySelectorAll(".form-control");

  let stateForm = {
    firstName: "",
    lastName: "",
    emails: [],
    phones: [],
  };

  inputs.forEach((input) => {
    const { id, value } = input;
    switch (id) {
      case modal === "update" ? "firstNameInputUpdate" : "firstNameInput":
        stateForm = { ...stateForm, firstName: value };
        break;
      case modal === "update" ? "lastNameInputUpdate" : "lastNameInput":
        stateForm = { ...stateForm, lastName: value };
        break;
      case modal === "update" ? "emailInputUpdate" : "emailInput":
        if (modal === "update") {
          const emailId = input.dataset.emailId;
          stateForm = {
            ...stateForm,
            emails: [...stateForm.emails, { id: emailId, email: value }],
          };
          break;
        }

        stateForm = {
          ...stateForm,
          emails: [...stateForm.emails, value],
        };
        break;
      case modal === "update" ? "phoneInputUpdate" : "phoneInput":
        if (modal === "update") {
          const phoneId = input.dataset.phoneId;
          stateForm = {
            ...stateForm,
            phones: [...stateForm.phones, { id: phoneId, phone: value }],
          };
          break;
        }

        stateForm = { ...stateForm, phones: [...stateForm.phones, value] };
        break;
      default:
        break;
    }
  });

  return stateForm;
};

const createUsersTable = (users) => {
  const tbody = document.querySelector(".table-body");
  tbody.innerHTML = "";

  users.forEach((user) => {
    const row = document.createElement("tr");

    const idCell = document.createElement("th");
    idCell.setAttribute("scope", "row");
    idCell.textContent = user.id;

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = user.firstName;

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = user.lastName;

    const actionCell = document.createElement("td");
    actionCell.classList.add("d-flex");

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("id", "deleteUserBtn");
    deleteButton.classList.add(
      "btn",
      "btn-outline-danger",
      "m-1",
      "d-flex",
      "justify-content-center"
    );
    deleteButton.innerHTML = '<span class="material-icons">delete</span>';
    deleteButton.dataset.userId = user.id;
    deleteUser(deleteButton);

    const editButton = document.createElement("button");
    editButton.setAttribute("type", "button");
    editButton.classList.add(
      "btn",
      "btn-outline-primary",
      "m-1",
      "d-flex",
      "justify-content-center"
    );
    editButton.setAttribute("data-bs-toggle", "modal");
    editButton.setAttribute("data-bs-target", "#editModal");
    editButton.innerHTML = '<span class="material-icons">edit</span>';
    editButton.dataset.userId = user.id;
    updateUser(editButton);

    actionCell.appendChild(deleteButton);
    actionCell.appendChild(editButton);

    row.appendChild(idCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(actionCell);

    tbody.appendChild(row);

    $("#delete-success-alert").hide();
  });
};

const deleteUser = (deleteButton) => {
  deleteButton.addEventListener("click", (event) => {
    const userId = event.currentTarget.dataset.userId;
    deleteUserService(userId);
    reloadPage();
  });
};

const modalEditUser = (user) => {
  return `
  <div class="mb-3">
    <label for="firstNameInput" class="form-label">
      First Name
    </label>
    <input
      type="text"
      class="form-control"
      id="firstNameInputUpdate"
      placeholder="Enter your first name"
      value=${user.firstName}
      required
    />
  </div>
  <div class="mb-3">
    <label for="lastNameInput" class="form-label">
      Last Name
    </label>
    <input
      type="text"
      class="form-control"
      id="lastNameInputUpdate"
      placeholder="Enter your last name"
      value="${user.lastName}"
      required
    />
  </div>
  <div class="mb-3">
    <div class="inputs-email">
      ${user.emails
        .map(
          (data) => `<div class="input-email">
        <label for="emailInput" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="emailInputUpdate"
          placeholder="Enter your email"
          data-email-id="${data.id}"
          value="${data.email}"
          required
        />
      </div>`
        )
        .join("")}
    </div>
  </div>
  <div class="mb-3">
    <div class="inputs-phone">
      ${user.phones
        .map(
          (data) => `<div class="input-phone">
      <label for="phoneInput" class="form-label">
        Phone
      </label>
      <input
        type="tel"
        class="form-control"
        id="phoneInputUpdate"
        placeholder="Enter your phone number"
        data-phone-id="${data.id}"
        value="${data.phone}"
      />
    </div>`
        )
        .join("")}
    </div>
  </div>

  <div
    class="alert alert-success alert-dismissible fade show"
    role="alert"
    id="update-success-alert"
  >
    <strong>Success!</strong>Updated user
  </div>
  `;
};

const updateUser = (editButton) => {
  editButton.addEventListener("click", (event) => {
    const userId = event.currentTarget.dataset.userId;
    const form = document.getElementById("editUserForm");
    const body = form.querySelector(".modal-body");

    getUserService((user) => {
      body.innerHTML = modalEditUser(user);
      $("#update-success-alert").hide();
    }, userId);

    form.addEventListener("submit", (event) => {
      let data = getDataForm("update");
      data = { ...data, id: userId };
      updateUserService(data, userId);
      reloadPage();
    });
  });
};

const getUsers = () => {
  getUsersService((users) => createUsersTable(users));
};
