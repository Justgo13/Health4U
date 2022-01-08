import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../components/NavBar/navbar";

import { useFormValidation } from "../components/MaterialUI/Form/form-validation";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthCookies } from "../shared/cookies/auth-cookies";

import MuiDivider from "../components/MaterialUI/mui-divider";
import MuiBox from "../components/MaterialUI/mui-box";
import MuiForm from "../components/MaterialUI/mui-form";
import MuiTypography from "../components/MaterialUI/mui-typography";
import MuiTextField, {
  VALIDATE_REQUIRE,
  VALIDATE_FLOAT,
} from "../components/MaterialUI/Form/mui-textfield";
import CustomButton from "../components/custom-button";
import ErrorModal from "../components/Modal/error-modal";
import LoadingCircle from "../components/loading-circle";

const SellerEditItem = () => {
  const { formValidationState, updateFormValidationState, verifyForm } =
    useFormValidation(
      [
        {
          name: "name",
          value: "",
          isValid: true,
        },
        {
          name: "category",
          value: "",
          isValid: true,
        },
        {
          name: "description",
          value: "",
          isValid: true,
        },
        {
          name: "image",
          value: "",
          isValid: true,
        },
        {
          name: "price",
          value: "",
          isValid: true,
        }
      ],
      true
    );

  //this is used if the user clicks edit but doesn't edit anything and tries to save changes
  const originalFormState = [
    {
      name: "name",
      value: "",
      isValid: false,
    },
    {
      name: "category",
      value: "",
      isValid: false,
    },
    {
      name: "description",
      value: "",
      isValid: false,
    },
    {
      name: "image",
      value: "",
      isValid: false,
    },
    {
      name: "price",
      value: "",
      isValid: false,
    },
  ];
  const [editFields, setEditFields] = useState(false);

  const { getUserInfo } = useAuthCookies();
  const userInfo = getUserInfo();

  const editHandler = (e) => {
    setEditFields(true);
  };

  const { itemID } = useParams();
  const navigate = useNavigate();

  const saveEditHandler = async (e) => {
    e.preventDefault();

    const isOriginalUnchanged =
      formValidationState.inputs.slice().sort().join(",") ===
      originalFormState.slice().sort().join(",");
    if (isOriginalUnchanged || formValidationState.isValid) {
      // allow saving if original form input has not been changed or if edited form inputs is valid
      setEditFields(false);
    }

    console.log(formValidationState.isValid);
    if (formValidationState.isValid) {
      const name = formValidationState.inputs.find(
        (input) => input.name === "name"
      ).value;
      const category = formValidationState.inputs.find(
        (input) => input.name === "category"
      ).value;
      const description = formValidationState.inputs.find(
        (input) => input.name === "description"
      ).value;
      const image = formValidationState.inputs.find(
        (input) => input.name === "image"
      ).value;
      const price = formValidationState.inputs.find(
        (input) => input.name === "price"
      ).value;

      await sendRequest("http://localhost:5000/api/item/editItem", "PATCH", {
        itemID,
        name,
        category,
        description,
        image,
        price,
      });
      navigate(`/seller/items/${userInfo.id}`);
    }
  };

  const { error, sendRequest, isLoading, clearError } = useHttpClient();
  const [loadedItem, setLoadedItem] = useState([]);

  useEffect(() => {
    // pre-populate with existing item information
    const getItemDetails = async () => {
      const res = await sendRequest(
        `http://localhost:5000/api/item/getItem/${itemID}`
      );
      setLoadedItem(res.item);
    };

    getItemDetails();
  }, [sendRequest, itemID]);

  useEffect(() => {
    verifyForm();
  }, [formValidationState.inputs]);

  return (
    <Fragment>
      <Navbar />

      {!!error && (
        <ErrorModal
          isModalShown={true}
          errorMessage={error}
          onClose={clearError}
        />
      )}

      {isLoading && <LoadingCircle />}

      <MuiBox className="container top-bottom-padding">
        <MuiDivider headerText="Edit Item" />
      </MuiBox>

      {!isLoading && loadedItem.length !== 0 && (
        <MuiBox className="container">
          <MuiForm
            formHeader={
              <MuiTypography className="divider-header top-bottom-padding center">
                Item details
              </MuiTypography>
            }
          >
            <MuiBox className="grey-background container textfield-group">
              <MuiTextField
                label="Name"
                validators={[VALIDATE_REQUIRE]}
                formInput={formValidationState.inputs.find(
                  (input) => input.name === "name"
                )}
                updateFormValidationState={updateFormValidationState}
                disabled={!editFields}
                defaultValue={loadedItem.name}
                defaultValid
              />
              <MuiTextField
                label="Category"
                validators={[VALIDATE_REQUIRE]}
                formInput={formValidationState.inputs.find(
                  (input) => input.name === "category"
                )}
                updateFormValidationState={updateFormValidationState}
                disabled={!editFields}
                defaultValue={loadedItem.category}
                defaultValid
              />
              <MuiTextField
                label="Description"
                validators={[VALIDATE_REQUIRE]}
                formInput={formValidationState.inputs.find(
                  (input) => input.name === "description"
                )}
                updateFormValidationState={updateFormValidationState}
                disabled={!editFields}
                defaultValue={loadedItem.description}
                defaultValid
              />
              <MuiTextField
                label="Image URL"
                validators={[VALIDATE_REQUIRE]}
                formInput={formValidationState.inputs.find(
                  (input) => input.name === "image"
                )}
                updateFormValidationState={updateFormValidationState}
                disabled={!editFields}
                defaultValue={loadedItem.image}
                defaultValid
              />
              <MuiTextField
                label="Price ($)"
                validators={[VALIDATE_REQUIRE, VALIDATE_FLOAT]}
                formInput={formValidationState.inputs.find(
                  (input) => input.name === "price"
                )}
                updateFormValidationState={updateFormValidationState}
                disabled={!editFields}
                defaultValue={loadedItem.price}
                defaultValid
              />

              {!editFields && (
                <CustomButton
                  className="big-btn white-inverse top-bottom-margin"
                  onClick={editHandler}
                >
                  Edit Fields
                </CustomButton>
              )}
              {editFields && (
                <CustomButton
                  className="big-btn white-inverse top-bottom-margin"
                  onClick={saveEditHandler}
                >
                  Save Changes
                </CustomButton>
              )}
            </MuiBox>
          </MuiForm>
        </MuiBox>
      )}
    </Fragment>
  );
};

export default SellerEditItem;
