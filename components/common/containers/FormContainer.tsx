import {Grid} from "@mui/material";
import React, {FunctionComponent} from "react";
import DynamicForm from "../elements/DynamicForm";
import AppearOnScroll from "../elements/AppearOnScroll";
import {DynamicForm as IContactFormSection} from "../../../store/types/home";

const FormContainer: FunctionComponent<IContactFormSection> = (
  {
    name,
    fields,
  }) => {
  return (

    <Grid container item alignItems={"center"} justifyContent={"space-evenly"} xs={12} sm={6}>
      <AppearOnScroll duration={2}>
        <DynamicForm name={name} fields={fields}/>
      </AppearOnScroll>
    </Grid>
  );
};

export default FormContainer;
