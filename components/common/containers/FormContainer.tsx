import {Grid} from "@mui/material";
import React, {FunctionComponent} from "react";
import DynamicForm from "../elements/DynamicForm";
import AppearOnScroll from "../elements/AppearOnScroll";
import {DynamicForm as IContactFormSection} from "../../../store/types/home";
import SectionContainer from "../SectionContainer";

const FormContainer: FunctionComponent<IContactFormSection> = (
  {
    name,
    fields,
    title,
    subTitle
  }) => {
  return (

    <SectionContainer title={title} subTitle={subTitle} titleClassName={"text-center"} subtitleClassName={"text-center"}>
      <Grid container item alignItems={"center"} justifyContent={"space-evenly"} xs={12} sm={6}>
        <AppearOnScroll duration={2}>
          <DynamicForm name={name} fields={fields}/>
        </AppearOnScroll>
      </Grid>
    </SectionContainer>
  );
};

export default FormContainer;
