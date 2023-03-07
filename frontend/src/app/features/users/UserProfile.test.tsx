import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../Store";
import { UserProfile } from "./UserProfile";
import { useAuth } from "react-oidc-context";
import userEvent from "@testing-library/user-event";
import TestWrapper from "../../../utilities/test/TestUtils";

jest.mock("react-oidc-context", () => ({
  useAuth: jest.fn(),
}));

const defultSetting = () => {
  store.subscribe as jest.Mock
  (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: true });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <UserProfile />
      </MemoryRouter>
    </Provider>
  );
};

const mandatoryFieldTest = (placeHolder: string, requiredText: string) => {
  const saveBtn = screen.getByText(/Save Profile/i);
  fireEvent.click(saveBtn);
  let newRequiredTextValue = new RegExp(requiredText, "i");
  const requiredMessage = screen.getByText(newRequiredTextValue);
  let placeHolderText = new RegExp(placeHolder, "i");

  fireEvent.click(saveBtn);
  expect(requiredMessage).toBeInTheDocument();
};

const mandatoryCheckFieldTest = async (placeHolder: string, requiredText: string) =>  {
    const saveBtn = screen.getByText(/Save Profile/i);
    fireEvent.click(saveBtn);
    let newRequiredTextValue = new RegExp(requiredText, "i");
    const requiredMessage = screen.getByText(newRequiredTextValue);
    // let placeHolderText = new RegExp(placeHolder, "i");
    // const radioBoxes = screen.getAllByTitle(placeHolderText)
    // console.log("radioBoxes",radioBoxes)
    // radioBoxes[0].click()
    // //await user.click();
    // //fireEvent.click(radioBoxes[0].checked);
    // fireEvent.click(saveBtn);
    //fireEvent.change(radioBoxes[0], { target: { value: "false" } });
      fireEvent.click(saveBtn);
    expect(requiredMessage).toBeInTheDocument();
  };

test("Display Profile Information", () => {
  defultSetting();
  const userListLink = screen.getByText(/Section 1 - Profile Information/i);
  expect(userListLink).toBeInTheDocument();
});

test("Display Input Field Validations", () => {
  defultSetting();
  const saveBtn = screen.getByText(/Save Profile/i);
  fireEvent.click(saveBtn);
  const firstNameRequired = screen.getByText(/First name is required/i);
  expect(firstNameRequired).toBeInTheDocument();
});

test("Do not display first name field validations", () => {
  defultSetting();
  mandatoryFieldTest("First Name", "First name is required");
});

test("Do not display last name field validations", () => {
  defultSetting();
  mandatoryFieldTest("Add Family Name Here", "Last name is required");
});

test("Do not display Street Address field validations", () => {
  defultSetting();
  mandatoryFieldTest("Street Address", "Street Address is required");
});

test("Do not display City field validations", () => {
  defultSetting();
  mandatoryFieldTest("City", "City is required");
});

test("Do not display Province field validations", () => {
  defultSetting();
  mandatoryFieldTest("Province", "Province is required");
});

test("Do not display Country field validations", () => {
  defultSetting();
  mandatoryFieldTest("Country", "Country is required");
});

test("Do not display Industry field validations", () => {
  defultSetting();
  mandatoryFieldTest("Industry", "Industry is required");
});

test("Do not display Organization field validations", () => {
  defultSetting();
  mandatoryFieldTest("Organization", "Organization is required");
});

test("Do display GST Exempt field validations", () => {
    defultSetting();
    mandatoryCheckFieldTest("isGstExemptST", "Gst Exempt is required");
  });

  const testUser = {profile: {
    given_name: "Test Given Name",
    family_name: "Test Family Name",
    email: "test@email.test"
}}

const authMocked = (useAuth as jest.Mock)

const newExternalUserSetup =() =>{
    authMocked.mockReturnValue(
        {
            isAuthenticated:true,
            user: testUser
        })
    render(
        <TestWrapper>
            <UserProfile/>
        </TestWrapper>
        // <Provider store={store}>
        //     <MemoryRouter>
        //         <UserProfile/>
        //     </MemoryRouter>
        // </Provider>
    )
}  

test('Renders user profile page', async () =>{
    newExternalUserSetup()
    const profileInformationHeader = screen.getByText(/Profile Information/i)
    expect(profileInformationHeader).toBeInTheDocument()
})

test('Renders profile page for new user correctly', async () =>{
    newExternalUserSetup();
    expect(screen.getByRole('form', {name:"form"}))
    .toHaveFormValues({
        firstName: testUser.profile.given_name,
        lastName: testUser.profile.family_name,
        email: testUser.profile.email
    })
})

test('Prevents submission with incomplete entries',async () => {
    newExternalUserSetup()
    const saveButton = screen.getByText(/Save Profile/i)
    userEvent.click(saveButton)
    //console.log(screen.getByRole('paragraph',{name:''}))
    expect(screen.getByPlaceholderText(/City/i)).toBeInvalid()
})

